import { User } from "models/user";

/**
 * Payload for signing up a new user.
 *
 * @interface SignUpPayload
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password for the account.
 * @property {string} confirmPassword - The confirmation of the password.
 */
export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * Payload for signing in an existing user.
 *
 * @interface SignInPayload
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user.
 */
export interface SignInPayload {
  name: string;
  email: string;
}

/**
 * Payload for updating user information.
 *
 * @interface UpdateUserPayload
 * @property {User} [user] - The user information to update (optional).
 * @property {string | null} [accessToken] - The access token for authentication (optional).
 */
export interface UpdateUserPayload {
  user?: User;
  accessToken?: string | null;
}

/**
 * Payload for requesting a password reset.
 *
 * @interface RequestPasswordResetPayload
 * @property {string} email - The email address of the user.
 * @property {string} redirectUrl - The URL to redirect the user to after the password reset request.
 */
export interface RequestPasswordResetPayload {
  email: string;
  redirectUrl: string;
}

/**
 * Payload for resetting the password.
 *
 * @interface ResetPasswordPayload
 * @property {string} userId - The ID of the user.
 * @property {string} resetString - The reset string provided for verification.
 * @property {string} newPassword - The new password for the account.
 * @property {string} newConfirmPassword - The confirmation of the new password.
 */
export interface ResetPasswordPayload {
  userId: string;
  resetString: string;
  newPassword: string;
  newConfirmPassword: string;
}

/**
 * Payload for verifying a user.
 *
 * @interface VerifiedPayload
 * @property {string} [userId] - The ID of the user (optional).
 * @property {string} [loginString] - The login string provided for verification (optional).
 */
export interface VerifiedPayload {
  userId?: string;
  loginString?: string;
}

/**
 * Represents the authentication state.
 *
 * @interface AuthState
 * @property {User} [user] - The authenticated user information (optional).
 * @property {string | null} [accessToken] - The access token for authentication (optional).
 * @property {boolean} [redirect] - Indicates whether to redirect after a certain action (optional).
 */
export interface AuthState {
  user?: User;
  accessToken?: string | null;
  redirect?: boolean;
}
