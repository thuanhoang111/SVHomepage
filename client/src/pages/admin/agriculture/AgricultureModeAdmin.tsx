import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import api from "apis/api";
import AgricultureItemForm from "components/admin/form/AgricultureItemForm";
import AutocompleteField from "components/admin/input/AutocompleteField";
import DropZoneField from "components/admin/input/DropZoneField";
import SimpleTextField from "components/admin/input/SimpleTextField";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup.object().shape({
  // Indicates whether the agriculture item is visible
  visible: yup.boolean().required(),
  // Represents the day associated with the agriculture item
  day: yup.string().required(),
  // Object containing Vietnamese language details
  vi: yup.object({
    // Title of the agriculture item in Vietnamese
    title: yup.string().required(),
    // Array of tags associated with the agriculture item in Vietnamese
    tag: yup.array().required(),
    // Author of the agriculture item in Vietnamese
    author: yup.string().required(),
    // Description of the agriculture item in Vietnamese
    description: yup.string().required(),
  }),
  // File or image representing the poster for the Vietnamese version
  viPoster: yup.mixed().required(),
  // Object containing Japanese language details
  jp: yup.object({
    // Title of the agriculture item in Japanese
    title: yup.string().required(),
    // Array of tags associated with the agriculture item in Japanese
    tag: yup.array().required(),
    // Author of the agriculture item in Japanese
    author: yup.string().required(),
    // Description of the agriculture item in Japanese
    description: yup.string().required(),
  }),
  // File or image representing the poster for the Japanese version
  jpPoster: yup.mixed().required(),
});

/**
 * AgricultureModeAdmin: A component for managing agriculture data in admin mode.
 *
 * This component provides functionality to create or edit agriculture data based on the provided mode.
 * It handles fetching agriculture details, tag lists, form submission, and error handling.
 *
 * @component
 * @returns {JSX.Element} The rendered component for managing agriculture data
 */
const AgricultureModeAdmin = (): JSX.Element => {
  // Extract mode and id from URL parameters
  const { mode, id } = useParams<{ mode?: string; id?: string }>();

  // Custom hook for making authenticated requests
  const axiosPrivate = useAxiosPrivate();

  // State to manage agriculture data, tags, and form refresh status
  const [agriculture, setAgriculture] = useState<any>({});
  const [viTag, setViTag] = useState<any>([]);
  const [jpTag, setJpTag] = useState<any>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [tags, setTags] = useState<any>([]);

  // Hook to programmatically navigate
  const navigate = useNavigate();

  // Form handler setup using react-hook-form and yup for validation
  const formHandler = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  // Destructure form methods and state
  const {
    setValue,
    formState: { errors },
    handleSubmit,
    control,
  } = formHandler;

  /**
   * Handles creating or updating agriculture data based on mode.
   *
   * @param {Object} values - The form values for agriculture data
   */
  const createOrEditAgriculture = async (values: any) => {
    try {
      let response: any;
      let viTag: any = [];
      let jpTag: any = [];

      // Process Vietnamese tags
      if (values.vi.tag.length > 0) {
        for (const tag of values.vi.tag) viTag.push(tag?.vi);
        values.vi.tag = viTag;
      }

      // Process Japanese tags
      if (values.jp.tag.length > 0) {
        for (const tag of values.jp.tag) jpTag.push(tag?.jp);
        values.jp.tag = jpTag;
      }

      // Determine API endpoint based on mode
      if (mode === "edit") {
        response = await axiosPrivate.post(
          `/agriculture/admin/agriculture/update/${id}`,
          { ...values }
        );
      } else {
        response = await axiosPrivate.post(
          "/agriculture/admin/agriculture/create",
          { ...values }
        );
      }

      // Check response status and handle success
      if (response.status === 200 || response.status === 201) {
        toast.success(
          `${mode === "edit" ? "Edit" : "Create"} poster successful.`
        );
        navigate(`/admin/agriculture/edit/${response.data.id}`);
      }
    } catch (error: any) {
      // Handle error
      toast.error(error.response.data.error.message);
    }
  };

  /**
   * Fetches the details of an agriculture item by ID.
   *
   * @param {string} id - The ID of the agriculture item
   */
  const getAgricultureDetail = async (id: string) => {
    await api
      .getAgricultureDetail(id)
      .then((response) => {
        setAgriculture(response.data.agriculture);
        setViTag(response.data.viTag);
        setJpTag(response.data.jpTag);
      })
      .catch((error: any) => {
        toast.error(error.response.data.error.message);
      });
  };

  /**
   * Fetches the list of tags based on provided parameters.
   *
   * @param {number | null} page - The page number for pagination
   * @param {number | null} limit - The number of items per page
   * @param {boolean | null} visible - Filter by visibility status
   * @param {string | null} vi - Filter by Vietnamese tag
   * @param {string | null} jp - Filter by Japanese tag
   */
  const getTagList = async (
    page: number | null,
    limit: number | null,
    visible: boolean | null,
    vi: string | null,
    jp: string | null
  ) => {
    await api
      .getTagList(page, limit, visible, vi, jp)
      .then((response) => {
        if (response.status === 200) setTags(response.data.tags);
      })
      .catch((error: any) => {
        toast.error(error.response.data.error.message);
      });
  };

  // Effect to update form values when agriculture data or mode changes
  useEffect(() => {
    if (mode === "edit") {
      setValue("visible", agriculture?.visible);
      setValue("day", agriculture?.day);
      setValue("viPoster", agriculture?.vi?.poster);
      setValue("jpPoster", agriculture?.jp?.poster);
      setValue("vi.tag", agriculture?.vi?.tag);
      setValue("jp.tag", agriculture?.jp?.tag);
    }
  }, [agriculture, mode, setValue]);

  // Effect to fetch agriculture details when in edit mode and ID is present
  useEffect(() => {
    if (mode === "edit" && id) getAgricultureDetail(id);
  }, [mode, id, refresh]);

  // Effect to fetch tag list on component mount
  useEffect(() => {
    getTagList(null, null, null, null, null);
  }, []);

  // Effect to handle and display form errors
  useEffect(() => {
    const arrErrorsInitial: any = Object.values(errors);
    const arrErrors: any = Object.values(arrErrorsInitial[0] || []);
    if (typeof arrErrors[0] === "object") {
      if (arrErrors.length > 0) {
        toast.error(String(arrErrors[0]?.message), {
          pauseOnHover: false,
          delay: 0,
        });
      }
    } else {
      if (arrErrorsInitial.length > 0) {
        toast.error(String(arrErrorsInitial[0]?.message), {
          pauseOnHover: false,
          delay: 0,
        });
      }
    }
  }, [errors]);

  return (
    <>
      {/* Sets the document title for the page */}
      <Helmet>
        <title>Agriculture | Admin</title>
      </Helmet>
      {/* FormProvider to manage form state and validation */}
      <FormProvider {...formHandler}>
        <form onSubmit={handleSubmit(createOrEditAgriculture)}>
          <Grid container spacing={2}>
            {/* Grid item for the main form header and controls */}
            <Grid item xs={12} display="flex" justifyContent="space-around">
              <Typography textAlign="center" variant="h4">
                {mode === "edit" ? "Edit" : "Create"} The Poster Agriculture
              </Typography>
              {/* LocalizationProvider for date picker */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="day"
                  control={control}
                  defaultValue={null}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      inputFormat="DD/MM/YYYY"
                      value={value}
                      onChange={(value) => {
                        onChange(value?.format("MM/DD/YYYY"));
                      }}
                      renderInput={(params) => (
                        <TextField id="date" size="small" {...params} />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>
              {/* Box for agriculture visibility switch */}
              <Box>
                <label>Agriculture visible</label>
                <Controller
                  name="visible"
                  defaultValue={false}
                  control={control}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <Switch
                        onChange={(e) => onChange(e.target.checked)}
                        checked={value}
                      />
                    );
                  }}
                />
              </Box>
              {/* Submit button */}
              <Button variant="contained" sx={{ padding: 1.5 }} type="submit">
                {mode === "edit" ? "Edit" : "Create"} Poster Agriculture
              </Button>
              {/* Review button for edit mode */}
              {mode === "edit" && (
                <Button
                  onClick={() => {
                    if (id) navigate(`/admin/agriculture/review/${id}`);
                  }}
                  variant="contained"
                  sx={{ padding: 1.5 }}
                >
                  Review Agriculture
                </Button>
              )}
            </Grid>
            {/* Grid item for Vietnamese language fields */}
            <Grid item xs={6}>
              <Grid
                sx={{ boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)" }}
                display="flex"
                flexDirection="column"
                gap={3}
                padding={3}
              >
                <Typography textAlign="center" variant="h6">
                  Vietnamese Language
                </Typography>
                <DropZoneField
                  accept={{ "image/*": [".jpeg", ".jpg", ".png"] }}
                  name="viPoster"
                  mode={mode}
                  label="Poster image"
                />
                <AutocompleteField
                  defaultValue={viTag}
                  data={tags}
                  name="vi.tag"
                  title="Tag"
                  mode={mode}
                  language="vi"
                  control={control}
                />
                <SimpleTextField
                  title="Author"
                  name="vi.author"
                  mode={mode}
                  defaultValue={agriculture?.vi?.author}
                  control={control}
                  {...{ setValue }}
                />
                <SimpleTextField
                  title="Title"
                  name="vi.title"
                  mode={mode}
                  line={3}
                  defaultValue={agriculture?.vi?.title}
                  control={control}
                  {...{ setValue }}
                />
                <SimpleTextField
                  title="Description"
                  name="vi.description"
                  mode={mode}
                  line={10}
                  defaultValue={agriculture?.vi?.description}
                  control={control}
                  {...{ setValue }}
                />
              </Grid>
            </Grid>
            {/* Grid item for Japanese language fields */}
            <Grid item xs={6}>
              <Grid
                sx={{ boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)" }}
                display="flex"
                flexDirection="column"
                gap={3}
                padding={3}
              >
                <Typography textAlign="center" variant="h6">
                  Japanese Language
                </Typography>
                <DropZoneField
                  accept={{ "image/*": [".jpeg", ".jpg", ".png"] }}
                  name="jpPoster"
                  mode={mode}
                  label="Poster image"
                />
                <AutocompleteField
                  defaultValue={jpTag}
                  data={tags}
                  name="jp.tag"
                  title="Tag"
                  mode={mode}
                  language="jp"
                  control={control}
                />
                <SimpleTextField
                  title="Author"
                  name="jp.author"
                  mode={mode}
                  defaultValue={agriculture?.jp?.author}
                  control={control}
                  {...{ setValue }}
                />
                <SimpleTextField
                  title="Title"
                  name="jp.title"
                  mode={mode}
                  line={3}
                  defaultValue={agriculture?.jp?.title}
                  control={control}
                  {...{ setValue }}
                />
                <SimpleTextField
                  title="Description"
                  name="jp.description"
                  mode={mode}
                  line={10}
                  defaultValue={agriculture?.jp?.description}
                  control={control}
                  {...{ setValue }}
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
      {/* Section for agriculture detail management in edit mode */}
      {mode === "edit" && (
        <Grid container mt={2} spacing={2}>
          <Grid item xs={12} display="flex" justifyContent="space-around">
            <Typography textAlign="center" variant="h4">
              {mode === "edit" ? "Edit" : "Create"} The Agriculture Detail
            </Typography>
          </Grid>
          {/* Grid for Vietnamese agriculture details */}
          <Grid item xs={6} display="flex" flexDirection="column" gap={2}>
            {agriculture?.vi?.agriculture.map((form) => (
              <AgricultureItemForm
                language="vi"
                itemId={form.id}
                mode="edit"
                key={form.id}
                setRefresh={setRefresh}
              />
            ))}
            <AgricultureItemForm
              setRefresh={setRefresh}
              language="vi"
              mode="create"
            />
          </Grid>
          {/* Grid for Japanese agriculture details */}
          <Grid item xs={6} display="flex" flexDirection="column" gap={2}>
            {agriculture?.jp?.agriculture.map((form) => (
              <AgricultureItemForm
                language="jp"
                itemId={form.id}
                mode="edit"
                key={form.id}
                setRefresh={setRefresh}
              />
            ))}
            <AgricultureItemForm
              setRefresh={setRefresh}
              language="jp"
              mode="create"
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default AgricultureModeAdmin;
