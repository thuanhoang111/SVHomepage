import { yupResolver } from "@hookform/resolvers/yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, Input } from "@mui/joy";
import { Box, Typography } from "@mui/material";
import useToggleValue from "hooks/useToggleValue";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { authResetPassword } from "stores/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import * as yup from "yup";

// Schema for validating reset password form using Yup
const resetPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .required("The field must be required")
    .min(8, "The field must be more than 8 characters"),
  newConfirmPassword: yup
    .string()
    .required("The field must be required")
    .min(8, "The field must be more than 8 characters"),
});

/**
 * ResetPassword: A component for handling password reset.
 * Provides a form where users can input their new password and confirm it.
 * This component uses React Hook Form for form management and Yup for validation.
 * It also dispatches a Redux action to reset the password and navigates the user
 * upon successful password reset.
 *
 * @component
 * @returns {JSX.Element} The rendered component for resetting password
 */
const ResetPassword = (): JSX.Element => {
  // Extract parameters from the URL
  const { id, resetString } = useParams<{
    id?: string;
    resetString?: string;
  }>();

  // Selector for redirect state from Redux store
  const { redirect } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  // Form handling with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    mode: "onSubmit",
  });

  // Redux dispatch function
  const dispatch = useAppDispatch();

  /**
   * Handles form submission for password reset.
   *
   * @param {Object} values - Form values including new password and confirm password
   */
  const handleResetPassword = (values: any) => {
    values.userId = id;
    values.resetString = resetString;
    dispatch(authResetPassword(values));
  };

  useEffect(() => {
    // Navigate to sign-in page upon successful password reset
    if (redirect) navigate("/admin/auth/signin");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirect]);

  // Custom hook for toggling password visibility
  const { value: showPassword, handleToggleValue: handleShowPassword } =
    useToggleValue();
  const {
    value: showConfirmPassword,
    handleToggleValue: handleShowConfirmPassword,
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
        <title>Reset Password | Admin</title>
      </Helmet>
      <form onSubmit={handleSubmit(handleResetPassword)}>
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Form title */}
          <Typography textAlign="center" variant="h4">
            Reset Password
          </Typography>
          {/* New Password input field */}
          <Input
            size="md"
            autoComplete="off"
            {...register("newPassword")}
            placeholder="Password"
            variant="soft"
            type={showPassword ? "text" : "password"}
            endDecorator={
              <span onClick={handleShowPassword}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </span>
            }
            error={errors.newPassword?.message ? true : false}
          />
          {/* Confirm Password input field */}
          <Input
            size="md"
            autoComplete="off"
            {...register("newConfirmPassword")}
            placeholder="Confirm Password"
            variant="soft"
            type={showConfirmPassword ? "text" : "password"}
            endDecorator={
              <span onClick={handleShowConfirmPassword}>
                {showConfirmPassword ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </span>
            }
            error={errors.newConfirmPassword?.message ? true : false}
          />
          {/* Submit button */}
          <Button type="submit" size="lg">
            Reset
          </Button>
        </Box>
      </form>
    </>
  );
};

export default ResetPassword;
