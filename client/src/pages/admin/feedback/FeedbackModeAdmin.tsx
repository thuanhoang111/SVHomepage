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

// Validation schema for feedback form using yup
const schema = yup.object().shape({
  // Indicates whether the feedback is visible
  visible: yup.boolean().required(),
  // Object containing Vietnamese feedback details
  vi: yup.object({
    // Name of the feedback in Vietnamese
    name: yup.string().required(),
    // Content of the feedback in Vietnamese
    content: yup.string().required(),
  }),
  // Object containing Japanese feedback details
  jp: yup.object({
    // Name of the feedback in Japanese
    name: yup.string().required(),
    // Content of the feedback in Japanese
    content: yup.string().required(),
  }),
  // File attachment for feedback
  file: yup.mixed().required(),
});

/**
 * FeedbackModeAdmin: A component for creating or editing feedback data in admin mode.
 *
 * This component handles form submission, fetching feedback details for editing, and displaying validation errors.
 * It manages state and performs API requests based on the mode (create or edit).
 *
 * @component
 * @returns {JSX.Element} The rendered component for managing feedback data
 */
const FeedbackModeAdmin = (): JSX.Element => {
  // Extract mode and id from URL parameters
  const { mode, id } = useParams<{ mode?: string; id?: string }>();

  // Custom hook for making authenticated requests
  const axiosPrivate = useAxiosPrivate();

  // State to manage feedback data
  const [feedback, setFeedback] = useState<any>({});

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
   * Handles creating or updating feedback data based on mode.
   *
   * @param {Object} values - The form values for feedback data
   */
  const createOrEditFeedback = async (values: any) => {
    try {
      let response: any;

      // Determine API endpoint based on mode
      if (mode === "edit") {
        response = await axiosPrivate.post(`/feedback/admin/update/${id}`, {
          ...values,
        });
      } else {
        response = await axiosPrivate.post("/feedback/admin/create", {
          ...values,
        });
      }

      // Check response status and handle success
      if (response.status === 200 || response.status === 201) {
        reset(); // Reset form values
        toast.success(`${mode === "edit" ? "Edit" : "Create"} successful`);
        navigate("/admin/feedback"); // Navigate back to the feedback list
      }
    } catch (error: any) {
      // Handle error
      toast.error(error.response.data.error.message);
    }
  };

  /**
   * Fetches the details of a feedback item by ID for editing.
   *
   * @param {string} id - The ID of the feedback item
   */
  const getFeedbackDetail = async (id: string) => {
    try {
      const response = await axiosPrivate.get(`/feedback/admin/${id}`);
      if (response.status === 200) setFeedback(response.data.feedback);
    } catch (error: any) {
      // Handle error
      toast.error(error.response.data.error.message);
    }
  };

  // Effect to fetch feedback details when in edit mode and ID is present
  useEffect(() => {
    if (mode === "edit" && id) getFeedbackDetail(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, id]);

  // Effect to update form values when feedback data or mode changes
  useEffect(() => {
    if (mode === "edit") {
      setValue("visible", feedback?.visible);
      setValue("file", feedback?.avatar); // Set file value (consider revising if file handling differs)
    }
  }, [feedback, mode, setValue]);

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
        <title>Feedback | Admin</title>
      </Helmet>
      <FormProvider {...formHandler}>
        {/* Form element with submission handler */}
        <form onSubmit={handleSubmit(createOrEditFeedback)}>
          <Grid container spacing={2}>
            {/* Header and visibility switch */}
            <Grid item xs={12} display="flex" justifyContent="space-around">
              <Typography textAlign="center" variant="h4">
                {mode === "edit" ? "Edit" : "Create"} The Feedback
              </Typography>
              <Box>
                <label>Feedback visible</label>
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
              <Button variant="contained" sx={{ padding: 1.5 }} type="submit">
                {mode === "edit" ? "Edit" : "Create"} Feedback
              </Button>
            </Grid>
            {/* Vietnamese Language Section */}
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
                <SimpleTextField
                  title="Content"
                  name="vi.content"
                  mode={mode}
                  line={8}
                  defaultValue={feedback?.vi?.content}
                  control={control}
                  {...{ setValue }}
                ></SimpleTextField>
                <SimpleTextField
                  title="Name"
                  name="vi.name"
                  mode={mode}
                  defaultValue={feedback?.vi?.name}
                  control={control}
                  {...{ setValue }}
                ></SimpleTextField>
              </Grid>
            </Grid>
            {/* Japanese Language Section */}
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
                <SimpleTextField
                  title="Content"
                  name="jp.content"
                  mode={mode}
                  line={8}
                  defaultValue={feedback?.jp?.content}
                  control={control}
                  {...{ setValue }}
                ></SimpleTextField>
                <SimpleTextField
                  title="Name"
                  name="jp.name"
                  mode={mode}
                  defaultValue={feedback?.jp?.name}
                  control={control}
                  {...{ setValue }}
                ></SimpleTextField>
              </Grid>
            </Grid>
            {/* Avatar Upload Section */}
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
                    <DropZoneField
                      accept={{
                        "image/*": [".jpeg", ".jpg", ".png"],
                      }}
                      name="file"
                      mode={mode}
                      label="Avatar image"
                    ></DropZoneField>
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

export default FeedbackModeAdmin;
