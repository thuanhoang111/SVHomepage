import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import CachedIcon from "@mui/icons-material/Cached";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import ImageContent from "components/home/common/ImageContent";
import TitleIcon from "components/home/title/TitleIcon";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import * as yup from "yup";

/**
 * Contact: A component for the contact form page.
 * Provides a form where users can submit their contact information, 
 * including name, company, address, phone number, email, and message.
 * Handles form validation using Yup and form submission via Axios.
 *
 * @component
 * @returns {JSX.Element} The rendered contact form component
 */
const Contact = (): JSX.Element => {
  // Translation hook
  const { t } = useTranslation("contact");

  // Yup schema for validating contact form
  const schema = yup.object().shape({
    name: yup.string().required(t("formContact.name.error")),
    company: yup.string(),
    address: yup.string(),
    phone: yup
      .string()
      .required(t("formContact.phone.error.required"))
      .matches(
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        t("formContact.phone.error.matches")
      ),
    email: yup
      .string()
      .email(t("formContact.email.error.email"))
      .required(t("formContact.email.error.required")),
    content: yup.string().required(t("formContact.contentForm.error")),
  });

  // Form handling with React Hook Form
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // Local state for form contact information
  const [formContact, setFormContact] = useState({
    name: "",
    company: "",
    address: "",
    phone: "",
    email: "",
    content: "",
  });

  /**
   * Handles form submission for the contact form.
   * Sends form data to the server and displays success or error messages.
   *
   * @async
   * @function
   */
  const handle = async () => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
      };
      const response = await axios.post(
        `${process.env.REACT_APP_URL_API}/email/contact`,
        { ...formContact },
        config
      );
      if (response.status === 200) {
        toast.success("Đã gửi thành công");
        reset();
      }
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  /**
   * Handles input changes and updates form contact state.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event for input fields
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormContact({ ...formContact, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>{t("titleHeader")}</title>
      </Helmet>
      <ImageContent title={t("titleHeader")} />
      <Grid
        maxWidth={{ xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
        sx={{
          boxShadow: 0,
          height: "auto",
          marginX: "auto",
        }}
        px={{ xs: 5, sm: 5, md: 8, lg: 10, xl: 20 }}
        my={6}
      >
        <Grid
          container
          columns={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2 }}
          spacing={5}
        >
          <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
            <Box
              component="img"
              src="/images/lien_lac.jpg"
              alt="Contact"
              sx={{
                width: 1,
                objectFit: "cover",
                userSelect: "none",
              }}
            />
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
            <form onSubmit={handleSubmit(handle)} autoComplete="off">
              <Grid
                display="flex"
                flexDirection="column"
                sx={{
                  background: "#ffffff",
                  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
                }}
                p={4.5}
                gap={2}
              >
                <Grid>
                  <TitleIcon
                    title={t("formContact.title")}
                    fontSize="38px"
                    fontWeight="600"
                    lineHeight="46px"
                  />
                  <Typography variant="subtitle1" mt={2}>
                    {t("formContact.content")}
                  </Typography>
                </Grid>
                <Grid display="flex" flexDirection="column" gap={2}>
                  {/* Name Field */}
                  <Grid>
                    <Typography width={1} variant="subtitle1" fontWeight="600">
                      {t("formContact.name.title")}
                      <span style={{ color: "#FF7612" }}>*</span>
                    </Typography>
                    <TextField
                      {...register("name")}
                      name="name"
                      onChange={handleChange}
                      hiddenLabel
                      placeholder={t("formContact.name.placeholder")}
                      size="small"
                      sx={{ width: "100%" }}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="name"
                      render={({ message }) => (
                        <Typography
                          width={1}
                          mt={0.5}
                          variant="body1"
                          color="red"
                        >
                          {message}
                        </Typography>
                      )}
                    />
                  </Grid>
                  {/* Company Field */}
                  <Grid>
                    <Typography width={1} variant="subtitle1" fontWeight="600">
                      {t("formContact.company.title")}
                    </Typography>
                    <TextField
                      {...register("company")}
                      name="company"
                      onChange={handleChange}
                      hiddenLabel
                      placeholder={t("formContact.company.placeholder")}
                      size="small"
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                  {/* Address Field */}
                  <Grid>
                    <Typography width={1} variant="subtitle1" fontWeight="600">
                      {t("formContact.address.title")}
                    </Typography>
                    <TextField
                      {...register("address")}
                      name="address"
                      onChange={handleChange}
                      hiddenLabel
                      placeholder={t("formContact.address.placeholder")}
                      size="small"
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                  {/* Phone Field */}
                  <Grid>
                    <Typography width={1} variant="subtitle1" fontWeight="600">
                      {t("formContact.phone.title")}
                      <span style={{ color: "#FF7612" }}>*</span>
                    </Typography>
                    <TextField
                      {...register("phone")}
                      name="phone"
                      onChange={handleChange}
                      type="tel"
                      hiddenLabel
                      placeholder={t("formContact.phone.placeholder")}
                      size="small"
                      sx={{ width: "100%" }}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="phone"
                      render={({ message }) => (
                        <Typography
                          width={1}
                          mt={0.5}
                          variant="body1"
                          color="red"
                        >
                          {message}
                        </Typography>
                      )}
                    />
                  </Grid>
                  {/* Email Field */}
                  <Grid>
                    <Typography width={1} variant="subtitle1" fontWeight="600">
                      {t("formContact.email.title")}
                      <span style={{ color: "#FF7612" }}>*</span>
                    </Typography>
                    <TextField
                      {...register("email")}
                      name="email"
                      onChange={handleChange}
                      type="email"
                      hiddenLabel
                      placeholder={t("formContact.email.placeholder")}
                      size="small"
                      sx={{ width: "100%" }}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="email"
                      render={({ message }) => (
                        <Typography
                          width={1}
                          mt={0.5}
                          variant="body1"
                          color="red"
                        >
                          {message}
                        </Typography>
                      )}
                    />
                  </Grid>
                  {/* Content Field */}
                  <Grid>
                    <Typography width={1} variant="subtitle1" fontWeight="600">
                      {t("formContact.contentForm.title")}
                      <span style={{ color: "#FF7612" }}>*</span>
                    </Typography>
                    <TextField
                      {...register("content")}
                      name="content"
                      onChange={handleChange}
                      type="email"
                      hiddenLabel
                      multiline
                      rows={4}
                      placeholder={t("formContact.contentForm.placeholder")}
                      size="small"
                      sx={{ width: "100%" }}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="content"
                      render={({ message }) => (
                        <Typography
                          width={1}
                          mt={0.5}
                          variant="body1"
                          color="red"
                        >
                          {message}
                        </Typography>
                      )}
                    />
                  </Grid>
                  {/* Submit and Reset Buttons */}
                  <Grid
                    container
                    gap={5}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      sx={{
                        height: 60,
                        width: 200,
                        background:
                          "linear-gradient(94.43deg, #1A6BF0 0%, #0742A5 96.94%)",
                      }}
                      variant="contained"
                    >
                      {isSubmitting ? (
                        <CircularProgress size={30} color="primary" />
                      ) : (
                        t("formContact.buttonSend")
                      )}
                    </Button>
                    <Tooltip title={t("formContact.tooltipDelete")}>
                      <IconButton onClick={() => reset()}>
                        <CachedIcon
                          sx={{ width: 30, height: 30, cursor: "pointer" }}
                        />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
      {/* Google Map */}
      <Box
        sx={{
          height: 450,
          width: 1,
        }}
      >
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7838.297608003642!2d106.678506!3d10.799913!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf19e40783f62920f!2zQ2FvIOG7kWMgQsOhbyBUdeG7lWkgVHLhurs!5e0!3m2!1sen!2sus!4v1664503509793!5m2!1sen!2sus"
          style={{ border: 0, width: "100%", height: "100%" }}
          // allowfullscreen=""
          loading="lazy"
          // referrerpolicy="no-referrer-when-downgrade"
        />
      </Box>
      {/* Background Image */}
      <Box
        component="img"
        src="/images/Background_Message.png"
        alt="Background"
        sx={{
          width: 1,
          zIndex: -10,
          position: "absolute",
          top: 315,
          height: "auto",
          userSelect: "none",
        }}
      />
    </>
  );
};

export default Contact;
