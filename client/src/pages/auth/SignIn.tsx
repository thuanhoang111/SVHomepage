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
import { authSignIn } from "stores/auth/auth-slice";
import { useAppDispatch } from "stores/hooks";
import * as yup from "yup";

// Schema for validating sign-in form using Yup
const signInSchema = yup.object({
  email: yup
    .string()
    .required("The field must be required")
    .email("The field must be a valid email address"),
  password: yup
    .string()
    .required("The field must be required")
    .min(8, "The field must be more than 8 characters"),
});

/**
 * SignIn: A component for handling user sign-in.
 * Provides a form where users can input their email address and password
 * to sign in to their account. This component uses React Hook Form for form
 * management and Yup for validation. It also dispatches a Redux action to handle
 * the sign-in process and displays error messages using React Toastify.
 *
 * @component
 * @returns {JSX.Element} The rendered component for user sign-in
 */
const SignIn = (): JSX.Element => {
  // Form handling with React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
    mode: "onSubmit",
  });

  // Redux dispatch function
  const dispatch = useAppDispatch();

  /**
   * Handles form submission for user sign-in.
   *
   * @param {Object} values - Form values including email and password
   */
  const handleSignIn = (values: any) => {
    dispatch(authSignIn(values));
    reset();
  };

  // Custom hook for toggling password visibility
  const { value: showPassword, handleToggleValue: handleShowPassword } =
    useToggleValue();

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
        <title>Sign In | Admin</title>
      </Helmet>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Form title */}
          <Typography textAlign="center" variant="h4">
            Sign In
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
          {/* Password input field */}
          <Input
            size="md"
            autoComplete="off"
            {...register("password")}
            placeholder="Password"
            variant="soft"
            type={showPassword ? "text" : "password"}
            endDecorator={
              <span onClick={handleShowPassword}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </span>
            }
            error={errors.password?.message ? true : false}
          />
          {/* Submit button */}
          <Button type="submit" size="lg">
            Sign In
          </Button>
        </Box>
        <Box mt={1} display="flex" justifyContent="space-between">
          {/* Links for forgot password and sign up */}
          <Link style={{ textAlign: "left" }} to="/admin/auth/forgotPassword">
            Forgot password?
          </Link>
          <Link style={{ textAlign: "right" }} to="/admin/auth/signup">
            Sign Up
          </Link>
        </Box>
      </form>
    </>
  );
};

export default SignIn;
