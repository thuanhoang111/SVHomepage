import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, Switch, Typography } from "@mui/material";
import DropZoneField from "components/admin/input/DropZoneField";
import SimpleTextField from "components/admin/input/SimpleTextField";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

// Validation schema for personnel form using yup
const schema = yup.object().shape({
  // Indicates whether the personnel is visible
  visible: yup.boolean().required(),
  // Object containing Vietnamese personnel details
  vi: yup.object({
    // Department of the personnel in Vietnamese
    department: yup.string().required(),
    // Title of the personnel in Vietnamese
    title: yup.string().required(),
    // Content or description of the personnel in Vietnamese
    content: yup.string().required(),
    // Name of the personnel in Vietnamese
    name: yup.string().required(),
    // Position of the personnel in Vietnamese
    possition: yup.string().required(),
  }),
  // Object containing Japanese personnel details
  jp: yup.object({
    // Department of the personnel in Japanese
    department: yup.string().required(),
    // Title of the personnel in Japanese
    title: yup.string().required(),
    // Content or description of the personnel in Japanese
    content: yup.string().required(),
    // Name of the personnel in Japanese
    name: yup.string().required(),
    // Position of the personnel in Japanese
    possition: yup.string().required(),
  }),
  // File attachment for the personnel (e.g., avatar)
  file: yup.mixed().required(),
});

/**
 * PersonnelModeAdmin: A component for creating or editing personnel data in admin mode.
 *
 * This component manages form submission, fetching personnel details for editing,
 * and displaying validation errors. It handles state and performs API requests
 * based on the mode (create or edit).
 *
 * @component
 * @returns {JSX.Element} The rendered component for managing personnel data
 */
const PersonnelModeAdmin = (): JSX.Element => {
  // Extract mode and id from URL parameters
  const { mode, id } = useParams<{ mode?: string; id?: string }>();

  // Custom hook for making authenticated requests
  const axiosPrivate = useAxiosPrivate();

  // State to manage personnel data
  const [personnel, setPersonnel] = useState<any>({});

  // Hook to programmatically navigate
  const navigate = useNavigate();

  // Form handler setup using react-hook-form and yup for validation
  const formHandler = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const {
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
    control,
  } = formHandler;

  /**
   * Handles creating or updating personnel data based on mode.
   *
   * @param {Object} values - The form values for personnel data
   */
  const createOrEditPersonnel = async (values: any) => {
    try {
      let response: any;

      // Determine API endpoint based on mode
      if (mode === "edit")
        response = await axiosPrivate.post(`/personnel/admin/update/${id}`, {
          ...values,
        });
      else
        response = await axiosPrivate.post("/personnel/admin/create", {
          ...values,
        });

      // Check response status and handle success
      if (response.status === 200 || response.status === 201) {
        reset(); // Reset the form
        toast.success(`${mode === "edit" ? "Edit" : "Create"} successful`);
        navigate("/admin/personnel"); // Navigate to the personnel list page
      }
    } catch (error: any) {
      // Handle error
      toast.error(error.response.data.error.message);
    }
  };

  /**
   * Fetches the details of a personnel by ID for editing.
   *
   * @param {string} id - The ID of the personnel
   */
  const getPersonnel = async (id: string) => {
    try {
      const response = await axiosPrivate.get(`/personnel/admin/${id}`);
      if (response.status === 200) setPersonnel(response.data.feedback); // Set fetched personnel data to state
    } catch (error: any) {
      // Handle error
      toast.error(error.response.data.error.message);
    }
  };

  // Effect to fetch personnel details when in edit mode and ID is present
  useEffect(() => {
    if (mode === "edit" && id) getPersonnel(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, id]);

  // Effect to update form values when personnel data or mode changes
  useEffect(() => {
    if (mode === "edit") {
      setValue("visible", personnel?.visible);
      setValue("file", personnel?.avatar);
    }
  }, [personnel, mode, setValue]);

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
        <title>Personnel | Admin</title>
      </Helmet>
      <FormProvider {...formHandler}>
        <form onSubmit={handleSubmit(createOrEditPersonnel)}>
          <Grid container spacing={2}>
            {/* Container for the form header and controls */}
            <Grid item xs={12} display="flex" justifyContent="space-around">
              {/* Typography for form title, dynamically shows 'Edit' or 'Create' based on mode */}
              <Typography textAlign="center" variant="h4">
                {mode === "edit" ? "Edit" : "Create"} The Personnel
              </Typography>
              {/* Box container for the visibility switch and submit button */}
              <Box>
                {/* Label for the visibility switch */}
                <label>Personnel visible</label>
                {/* Controller to handle form state and rendering of the Switch component */}
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
              {/* Submit button for the form, with text based on mode */}
              <Button variant="contained" sx={{ padding: 1.5 }} type="submit">
                {mode === "edit" ? "Edit" : "Create"} Personnel
              </Button>
            </Grid>
            {/* Section for Vietnamese language details */}
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
                {/* Custom text field components for Vietnamese details */}
                <SimpleTextField
                  title="Department"
                  name="vi.department"
                  mode={mode}
                  line={2}
                  defaultValue={personnel?.vi?.department}
                  control={control}
                  {...{ setValue }}
                />
                <SimpleTextField
                  title="Position"
                  name="vi.possition"
                  mode={mode}
                  defaultValue={personnel?.vi?.possition}
                  control={control}
                  {...{ setValue }}
                />
                <SimpleTextField
                  title="Name"
                  name="vi.name"
                  mode={mode}
                  defaultValue={personnel?.vi?.name}
                  control={control}
                  {...{ setValue }}
                />
                <SimpleTextField
                  title="Title"
                  name="vi.title"
                  mode={mode}
                  line={2}
                  defaultValue={personnel?.vi?.title}
                  control={control}
                  {...{ setValue }}
                />
                <SimpleTextField
                  title="Content"
                  name="vi.content"
                  mode={mode}
                  line={5}
                  defaultValue={personnel?.vi?.content}
                  control={control}
                  {...{ setValue }}
                />
              </Grid>
            </Grid>
            {/* Section for Japanese language details */}
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
                {/* Custom text field components for Japanese details */}
                <SimpleTextField
                  title="Department"
                  name="jp.department"
                  mode={mode}
                  line={2}
                  defaultValue={personnel?.jp?.department}
                  control={control}
                  {...{ setValue }}
                />
                <SimpleTextField
                  title="Position"
                  name="jp.possition"
                  mode={mode}
                  defaultValue={personnel?.jp?.possition}
                  control={control}
                  {...{ setValue }}
                />
                <SimpleTextField
                  title="Name"
                  name="jp.name"
                  mode={mode}
                  defaultValue={personnel?.jp?.name}
                  control={control}
                  {...{ setValue }}
                />
                <SimpleTextField
                  title="Title"
                  name="jp.title"
                  mode={mode}
                  line={2}
                  defaultValue={personnel?.jp?.title}
                  control={control}
                  {...{ setValue }}
                />
                <SimpleTextField
                  title="Content"
                  name="jp.content"
                  mode={mode}
                  line={5}
                  defaultValue={personnel?.jp?.content}
                  control={control}
                  {...{ setValue }}
                />
              </Grid>
            </Grid>
            {/* Section for file upload (e.g., avatar image) */}
            <Grid item xs={12}>
              <Box
                sx={{ boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)" }}
                p={3}
              >
                <Grid
                  container
                  columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
                  minHeight={300}
                >
                  <Grid item xl={4.5} lg={4} md={3} sm={2} xs={0}></Grid>
                  <Grid item xl={3} lg={4} md={6} sm={8} xs={12}>
                    {/* DropZoneField for file upload, with restrictions for image files */}
                    <DropZoneField
                      accept={{
                        "image/*": [".jpeg", ".jpg", ".png"],
                      }}
                      name="file"
                      mode={mode}
                      label="Avatar image"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default PersonnelModeAdmin;
