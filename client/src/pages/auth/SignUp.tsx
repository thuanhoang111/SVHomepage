import { yupResolver } from "@hookform/resolvers/yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, Input } from "@mui/joy";
import { Box, Typography } from "@mui/material";
import useToggleValue from "hooks/useToggleValue";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { authSignUp } from "stores/auth/auth-slice";
import { useAppDispatch } from "stores/hooks";
import * as yup from "yup";

// Schema for validating sign-up form using Yup
const signUpSchema = yup.object({
  name: yup.string().required("The field must be required."),
  email: yup
    .string()
    .required("The field must be required")
    .email("The field must be a valid email address"),
  password: yup
    .string()
    .required("The field must be required")
    .min(8, "The field must be more than 8 characters"),
  confirmPassword: yup
    .string()
    .required("The field must be required")
    .min(8, "The field must be more than 8 characters"),
  code: yup.string().required("The field must be required."),
});

/**
 * SignUp: A component for handling user registration.
 * Provides a form where users can input their name, email address,
 * password, password confirmation, and verification code to register
 * a new account. This component uses React Hook Form for form management
 * and Yup for validation. It also dispatches a Redux action to handle
 * the sign-up process and displays error messages using React Toastify.
 *
 * @component
 * @returns {JSX.Element} The rendered component for user registration
 */
const SignUp = (): JSX.Element => {
  // Form handling with React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: "onSubmit",
  });

  // Redux dispatch function
  const dispatch = useAppDispatch();

  /**
   * Handles form submission for user registration.
   *
   * @param {Object} values - Form values including name, email, password, confirmPassword, and code
   */
  const handleSignUp = (values: any) => {
    // Construct the redirect URL for verification
    values.currentUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      "/vi/admin/auth/verify";
    // Dispatch the sign-up action
    dispatch(authSignUp(values));
    // Reset the form fields
    reset();
  };

  // Custom hook for toggling password visibility
  const { value: showPassword, handleToggleValue: handleShowPassword } =
    useToggleValue();
  const {
    value: showPasswordConfirm,
    handleToggleValue: handleShowPasswordConfirm,
  } = useToggleValue();

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
        <title>Sign Up | Admin</title>
      </Helmet>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Form title */}
          <Typography textAlign="center" variant="h4">
            Sign Up
          </Typography>
          {/* Name input field */}
          <Input
            size="md"
            {...register("name")}
            placeholder="Name"
            variant="soft"
            error={errors.name?.message ? true : false}
          />
          {/* Email input field */}
          <Input
            size="md"
            {...register("email")}
            placeholder="Email"
            variant="soft"
            type="email"
            error={errors.email?.message ? true : false}
          />
          {/* Password input field */}
          <Input
            size="md"
            {...register("password")}
            placeholder="Password"
            autoComplete="off"
            variant="soft"
            type={showPassword ? "text" : "password"}
            endDecorator={
              <span onClick={handleShowPassword}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </span>
            }
            error={errors.password?.message ? true : false}
          />
          {/* Confirm Password input field */}
          <Input
            size="md"
            type={showPasswordConfirm ? "text" : "password"}
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            variant="soft"
            autoComplete="off"
            endDecorator={
              <span onClick={handleShowPasswordConfirm}>
                {showPasswordConfirm ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </span>
            }
            error={errors.confirmPassword?.message ? true : false}
          />
          {/* Verification Code input field */}
          <Input
            size="md"
            {...register("code")}
            placeholder="Code"
            variant="soft"
            error={errors.code?.message ? true : false}
          />
          {/* Submit button */}
          <Button type="submit" size="lg">
            Sign Up
          </Button>
        </Box>
        <Box mt={1} display="flex" justifyContent="space-between">
          {/* Links for sign-in and forgot password */}
          <Link style={{ textAlign: "center" }} to="/admin/auth/signin">
            Already have an account?
          </Link>
          <Link style={{ textAlign: "left" }} to="/admin/auth/forgotPassword">
            Forgot password?
          </Link>
        </Box>
      </form>
    </>
  );
};

export default SignUp;
