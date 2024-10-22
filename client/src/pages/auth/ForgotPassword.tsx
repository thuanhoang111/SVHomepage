import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "@mui/joy";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { authRequestPasswordReset } from "stores/auth/auth-slice";
import { useAppDispatch } from "stores/hooks";
import * as yup from "yup";

// Schema for validating forgot password form using Yup
const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required("The field must be required")
    .email("The field must be valid"),
});

/**
 * ForgotPassword: A component for handling password reset requests.
 * Provides a form where users can input their email address to
 * request a password reset link.
 *
 * This component uses React Hook Form for form management and Yup
 * for validation. It also dispatches a Redux action to handle the
 * password reset request and displays error messages using React Toastify.
 *
 * @component
 * @returns {JSX.Element} The rendered component for password reset
 */
const ForgotPassword = (): JSX.Element => {
  // Form handling with React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    mode: "onSubmit",
  });

  // Redux dispatch function
  const dispatch = useAppDispatch();

  /**
   * Handles form submission for password reset request.
   *
   * @param {Object} values - Form values including email
   */
  const handleForgotPassword = (values: any) => {
    // Construct the redirect URL for password reset
    values.redirectUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      "/vi/admin/auth/resetPassword";
    // Dispatch the password reset request action
    dispatch(authRequestPasswordReset(values));
    // Reset the form fields
    reset();
  };

  useEffect(() => {
    // Extract and display error messages from form state
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(String(arrErrors[0]?.message), {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  return (
    <>
      {/* Sets the document title for the page */}
      <Helmet>
        <title>Forgot Password | Admin</title>
      </Helmet>
      <form onSubmit={handleSubmit(handleForgotPassword)}>
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Form title */}
          <Typography textAlign="center" variant="h4">
            Forgot Password
          </Typography>
          {/* Email input field */}
          <Input
            size="md"
            {...register("email")}
            placeholder="Email"
            variant="soft"
            type="email"
            error={errors.email?.message ? true : false}
          />
          {/* Submit button */}
          <Button type="submit" size="lg">
            Send Email
          </Button>
        </Box>
        <Box mt={1} display="flex" justifyContent="space-between">
          {/* Links for sign-in and sign-up */}
          <Link style={{ textAlign: "left" }} to="/admin/auth/signin">
            Sign In
          </Link>
          <Link style={{ textAlign: "right" }} to="/admin/auth/signup">
            Sign Up
          </Link>
        </Box>
      </form>
    </>
  );
};

export default ForgotPassword;
