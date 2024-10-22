import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import api from "apis/api";
import NewsItemForm from "components/admin/form/NewsItemForm";
import DropZoneField from "components/admin/input/DropZoneField";
import SimpleTextField from "components/admin/input/SimpleTextField";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

// Validation schema for news form using yup
const schema = yup.object().shape({
  // Indicates whether the news item is visible
  visible: yup.boolean().required(),
  // Day associated with the news item
  day: yup.string().required(),
  // Object containing Vietnamese news details
  vi: yup.object({
    // Title of the news in Vietnamese
    title: yup.string().required(),
  }),
  // File attachment for Vietnamese news poster
  viPoster: yup.mixed().required(),
  // Object containing Japanese news details
  jp: yup.object({
    // Title of the news in Japanese
    title: yup.string().required(),
  }),
  // File attachment for Japanese news poster
  jpPoster: yup.mixed().required(),
});

/**
 * NewsModeAdmin: A component for creating or editing news data in admin mode.
 *
 * This component handles form submission, fetching news details for editing, and displaying validation errors.
 * It manages state and performs API requests based on the mode (create or edit).
 *
 * @component
 * @returns {JSX.Element} The rendered component for managing news data
 */
const NewsModeAdmin = (): JSX.Element => {
  // Extract mode and id from URL parameters
  const { mode, id } = useParams<{ mode?: string; id?: string }>();

  // Custom hook for making authenticated requests
  const axiosPrivate = useAxiosPrivate();

  // State to manage news data and refresh flag
  const [news, setNews] = useState<any>({});
  const [refresh, setRefresh] = useState<boolean>(false);

  // Hook to programmatically navigate
  const navigate = useNavigate();

  // Form handler setup using react-hook-form and yup for validation
  const formHandler = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const {
    setValue,
    formState: { errors },
    handleSubmit,
    control,
  } = formHandler;

  /**
   * Handles creating or updating news data based on mode.
   *
   * @param {Object} values - The form values for news data
   */
  const createOrEditNews = async (values: any) => {
    try {
      let response: any;

      // Determine API endpoint based on mode
      if (mode === "edit") {
        response = await axiosPrivate.post(`/news/admin/news/update/${id}`, {
          ...values,
        });
      } else {
        response = await axiosPrivate.post("/news/admin/news/create", {
          ...values,
        });
      }

      // Check response status and handle success
      if (response.status === 200 || response.status === 201) {
        toast.success(
          `${mode === "edit" ? "Edit" : "Create"} poster successful.`
        );
        navigate(`/admin/news/edit/${response.data.id}`); // Navigate to the edit page of the created/updated news
      }
    } catch (error: any) {
      // Handle error
      toast.error(error.response.data.error.message);
    }
  };

  /**
   * Fetches the details of a news item by ID for editing.
   *
   * @param {string} id - The ID of the news item
   */
  const getNewsDetail = async (id: string) => {
    try {
      const response = await api.getNewsDetail(id);
      setNews(response.data.news); // Set fetched news data to state
    } catch (error: any) {
      // Handle error
      toast.error(error.response.data.error.message);
    }
  };

  // Effect to fetch news details when in edit mode and ID is present
  useEffect(() => {
    if (mode === "edit" && id) getNewsDetail(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, id, refresh]);

  // Effect to update form values when news data or mode changes
  useEffect(() => {
    if (mode === "edit") {
      setValue("visible", news?.visible);
      setValue("day", news?.day);
      setValue("viPoster", news?.vi?.poster);
      setValue("jpPoster", news?.jp?.poster);
    }
  }, [news, mode, setValue]);

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
        <title>News | Admin</title>
      </Helmet>
      {/* FormProvider wraps the form to provide context for react-hook-form */}
      <FormProvider {...formHandler}>
        <form onSubmit={handleSubmit(createOrEditNews)}>
          <Grid container spacing={2}>
            {/* Header and control elements */}
            <Grid item xs={12} display="flex" justifyContent="space-around">
              <Typography textAlign="center" variant="h4">
                {/* Display text based on the mode */}
                {mode === "edit" ? "Edit" : "Create"} The Poster News
              </Typography>
              {/* Date Picker for selecting the day */}
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
                        <>
                          <TextField id="date" size="small" {...params} />
                        </>
                      )}
                    />
                  )}
                />
              </LocalizationProvider>
              {/* Switch for toggling the visibility of the news */}
              <Box>
                <label>News visible</label>
                <Controller
                  name="visible"
                  defaultValue={false}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Switch
                      onChange={(e) => onChange(e.target.checked)}
                      checked={value}
                    />
                  )}
                />
              </Box>
              {/* Submit button for the form */}
              <Button variant="contained" sx={{ padding: 1.5 }} type="submit">
                {/* Display text based on the mode */}
                {mode === "edit" ? "Edit" : "Create"} Poster News
              </Button>
              {/* Conditional button for review mode */}
              {mode === "edit" && (
                <Button
                  onClick={() => {
                    if (id) navigate(`/admin/news/review/${id}`);
                  }}
                  variant="contained"
                  sx={{ padding: 1.5 }}
                >
                  Review News
                </Button>
              )}
            </Grid>
            {/* Vietnamese language section */}
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
                <Grid container spacing={2}>
                  {/* DropZoneField for uploading Vietnamese poster image */}
                  <Grid item xs={6}>
                    <DropZoneField
                      accept={{
                        "image/*": [".jpeg", ".jpg", ".png"],
                      }}
                      name="viPoster"
                      mode={mode}
                      label="Poster image"
                    />
                  </Grid>
                  {/* SimpleTextField for Vietnamese title */}
                  <Grid item xs={6}>
                    <SimpleTextField
                      title="Title"
                      name="vi.title"
                      mode={mode}
                      line={5}
                      defaultValue={news?.vi?.title}
                      control={control}
                      {...{ setValue }}
                    />
                  </Grid>
                </Grid>
                {/* SimpleTextField for Vietnamese description */}
                <SimpleTextField
                  title="Description"
                  name="vi.description"
                  mode={mode}
                  line={5}
                  defaultValue={news?.vi?.description}
                  control={control}
                  {...{ setValue }}
                />
              </Grid>
            </Grid>
            {/* Japanese language section */}
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
                <Grid container spacing={2}>
                  {/* DropZoneField for uploading Japanese poster image */}
                  <Grid item xs={6}>
                    <DropZoneField
                      accept={{
                        "image/*": [".jpeg", ".jpg", ".png"],
                      }}
                      name="jpPoster"
                      mode={mode}
                      label="Poster image"
                    />
                  </Grid>
                  {/* SimpleTextField for Japanese title */}
                  <Grid item xs={6}>
                    <SimpleTextField
                      title="Title"
                      name="jp.title"
                      mode={mode}
                      line={5}
                      defaultValue={news?.jp?.title}
                      control={control}
                      {...{ setValue }}
                    />
                  </Grid>
                </Grid>
                {/* SimpleTextField for Japanese description */}
                <SimpleTextField
                  title="Description"
                  name="jp.description"
                  mode={mode}
                  line={5}
                  defaultValue={news?.jp?.description}
                  control={control}
                  {...{ setValue }}
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
      {/* Conditional rendering of news detail section for editing mode */}
      {mode === "edit" && (
        <Grid container mt={2} spacing={2}>
          <Grid item xs={12} display="flex" justifyContent="space-around">
            <Typography textAlign="center" variant="h4">
              {/* Display text based on the mode */}
              {mode === "edit" ? "Edit" : "Create"} The News Detail
            </Typography>
          </Grid>
          {/* Vietnamese news items */}
          <Grid item xs={6} display="flex" flexDirection="column" gap={2}>
            {news?.vi?.news.map((form, index) => (
              <NewsItemForm
                language="vi"
                itemId={form.id}
                mode="edit"
                key={form.id}
                setRefresh={setRefresh}
              />
            ))}
            {/* Form for creating new Vietnamese news item */}
            <NewsItemForm setRefresh={setRefresh} language="vi" mode="create" />
          </Grid>
          {/* Japanese news items */}
          <Grid item xs={6} display="flex" flexDirection="column" gap={2}>
            {news?.jp?.news.map((form, index) => (
              <NewsItemForm
                language="jp"
                itemId={form.id}
                mode="edit"
                key={form.id}
                setRefresh={setRefresh}
              />
            ))}
            {/* Form for creating new Japanese news item */}
            <NewsItemForm setRefresh={setRefresh} language="jp" mode="create" />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default NewsModeAdmin;
