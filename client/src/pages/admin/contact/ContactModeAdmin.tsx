import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, Switch, Typography } from "@mui/material";
import SimpleTextField from "components/admin/input/SimpleTextField";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

// Validation schema for the contact form using yup
const schema = yup.object().shape({
  // Indicates whether the contact is the default
  default: yup.boolean().required(),
  // Object containing Vietnamese contact details
  vi: yup.object({
    // Address in Vietnamese
    address: yup.string().required(),
    // Phone number in Vietnamese
    phone: yup.string().required(),
    // Email address in Vietnamese
    email: yup.string().email().required(),
  }),
  // Object containing Japanese contact details
  jp: yup.object({
    // Address in Japanese
    address: yup.string().required(),
    // Phone number in Japanese
    phone: yup.string().required(),
    // Email address in Japanese
    email: yup.string().email().required(),
  }),
});

/**
 * ContactModeAdmin: A component for managing contact data in admin mode.
 *
 * This component allows for the creation or editing of contact details based on the provided mode.
 * It handles fetching contact details, form submission, and error handling.
 *
 * @component
 * @returns {JSX.Element} The rendered component for managing contact data
 */
const ContactModeAdmin = (): JSX.Element => {
  // Extract mode and id from URL parameters
  const { mode, id } = useParams<{ mode?: string; id?: string }>();

  // Custom hook for making authenticated requests
  const axiosPrivate = useAxiosPrivate();

  // State to manage contact data
  const [contact, setContact] = useState<any>({});

  // Hook to programmatically navigate
  const navigate = useNavigate();

  // Form handler setup using react-hook-form and yup for validation
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  /**
   * Handles creating or updating contact data based on mode.
   *
   * @param {Object} values - The form values for contact data
   */
  const createOrEditContact = async (values: any) => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
      };

      let response: any;

      // Determine API endpoint based on mode
      if (mode === "edit") {
        response = await axiosPrivate.post(
          `/contact/admin/update/${id}`,
          { ...values },
          config
        );
      } else {
        response = await axiosPrivate.post(
          "/contact/admin/create",
          { ...values },
          config
        );
      }

      // Check response status and handle success
      if (response.status === 200 || response.status === 201) {
        reset();
        toast.success(`${mode === "edit" ? "Edit" : "Create"} successful`);
        navigate("/admin/contact");
      }
    } catch (error: any) {
      // Handle error
      toast.error(error.response.data.error.message);
    }
  };

  /**
   * Fetches the details of a contact item by ID.
   *
   * @param {string} id - The ID of the contact item
   */
  const getContactDetail = async (id: string) => {
    try {
      const response = await axiosPrivate.get(`/contact/admin/${id}`);
      if (response.status === 200) setContact(response.data.contact);
    } catch (error: any) {
      // Handle error
      toast.error(error.response.data.error.message);
    }
  };

  // Effect to fetch contact details when in edit mode and ID is present
  useEffect(() => {
    if (mode === "edit" && id) getContactDetail(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, id]);

  // Effect to update form values when contact data or mode changes
  useEffect(() => {
    if (mode === "edit") setValue("default", contact?.default);
  }, [contact, mode, setValue]);

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
        <title>Contact | Admin</title>
      </Helmet>
      <form onSubmit={handleSubmit(createOrEditContact)}>
        <Grid container spacing={2}>
          {/* Container for form heading and controls */}
          <Grid item xs={12} display="flex" justifyContent="space-around">
            {/* Heading for form */}
            <Typography textAlign="center" variant="h4">
              {mode === "edit" ? "Edit" : "Create"} The Contact
            </Typography>
            {/* Control for 'Contact default' toggle */}
            <Box>
              <label>Contact default</label>
              <Controller
                name="default"
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
            {/* Submit button for form */}
            <Button variant="contained" sx={{ padding: 1.5 }} type="submit">
              {mode === "edit" ? "Edit" : "Create"} Contact
            </Button>
          </Grid>
          {/* Section for Vietnamese language contact information */}
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
                title="Address"
                name="vi.address"
                mode={mode}
                line={2}
                defaultValue={contact?.vi?.address}
                control={control}
                {...{ setValue }}
              ></SimpleTextField>
              <SimpleTextField
                title="Phone"
                name="vi.phone"
                mode={mode}
                defaultValue={contact?.vi?.phone}
                control={control}
                {...{ setValue }}
              ></SimpleTextField>
              <SimpleTextField
                title="Email"
                name="vi.email"
                mode={mode}
                defaultValue={contact?.vi?.email}
                control={control}
                {...{ setValue }}
              ></SimpleTextField>
            </Grid>
          </Grid>
          {/* Section for Japanese language contact information */}
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
                title="Address"
                name="jp.address"
                mode={mode}
                line={2}
                defaultValue={contact?.jp?.address}
                control={control}
                {...{ setValue }}
              ></SimpleTextField>
              <SimpleTextField
                title="Phone"
                name="jp.phone"
                mode={mode}
                defaultValue={contact?.jp?.phone}
                control={control}
                {...{ setValue }}
              ></SimpleTextField>
              <SimpleTextField
                title="Email"
                name="jp.email"
                mode={mode}
                defaultValue={contact?.jp?.email}
                control={control}
                {...{ setValue }}
              ></SimpleTextField>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ContactModeAdmin;
