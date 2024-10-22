import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  AuthState,
  RequestPasswordResetPayload,
  ResetPasswordPayload,
  SignInPayload,
  SignUpPayload,
  UpdateUserPayload,
  VerifiedPayload,
} from "./auth-types";

// Initial state for the authentication slice
const initialState: AuthState = {
  user: undefined,
  accessToken: null,
  redirect: false,
  
};

// Slice for authentication-related state and actions
const authSlice = createSlice({
  name: "auth", // Name of the slice
  initialState, // Initial state
  reducers: {
    /**
     * authSignIn: Action to handle sign-in.
     * Does not modify the state directly as the saga will handle the side effect.
     *
     * @param {AuthState} state - The current state of the authentication slice
     * @param {PayloadAction<SignInPayload>} action - The payload containing sign-in details
     */
    authSignIn: (state, action: PayloadAction<SignInPayload>) => ({
      ...state,
    }),

    /**
     * authSignUp: Action to handle sign-up.
     * Updates the state with the sign-up payload.
     *
     * @param {AuthState} state - The current state of the authentication slice
     * @param {PayloadAction<SignUpPayload>} action - The payload containing sign-up details
     */
    authSignUp: (state, action: PayloadAction<SignUpPayload>) => ({
      ...state,
      ...action.payload,
    }),

    /**
     * authUpdateUser: Action to update user information and access token.
     *
     * @param {AuthState} state - The current state of the authentication slice
     * @param {PayloadAction<UpdateUserPayload>} action - The payload containing user and token information
     */
    authUpdateUser: (state, action: PayloadAction<UpdateUserPayload>) => ({
      user: action.payload.user,
      accessToken: action.payload.accessToken,
    }),

    /**
     * authFetchMe: Action to handle fetching the current user's information.
     * Does not modify the state directly as the saga will handle the side effect.
     *
     * @param {AuthState} state - The current state of the authentication slice
     * @param {PayloadAction<any>} action - The payload containing fetch details
     */
    authFetchMe: (state, action: PayloadAction<any>) => ({
      ...state,
      ...action.payload,
    }),

    /**
     * authRefreshToken: Action to handle refreshing the access token.
     * Does not modify the state directly as the saga will handle the side effect.
     *
     * @param {AuthState} state - The current state of the authentication slice
     * @param {PayloadAction<string>} action - The payload containing the refresh token
     */
    authRefreshToken: (state, action: PayloadAction<string>) => ({}),

    /**
     * authLogout: Action to handle logging out.
     * Does not modify the state directly as the saga will handle the side effect.
     *
     * @param {AuthState} state - The current state of the authentication slice
     * @param {PayloadAction<string>} action - The payload containing the token to be invalidated
     */
    authLogout: (state, action: PayloadAction<string>) => ({}),

    /**
     * authRequestPasswordReset: Action to handle requesting a password reset.
     * Does not modify the state directly as the saga will handle the side effect.
     *
     * @param {AuthState} state - The current state of the authentication slice
     * @param {PayloadAction<RequestPasswordResetPayload>} action - The payload containing request details
     */
    authRequestPasswordReset: (
      state,
      action: PayloadAction<RequestPasswordResetPayload>
    ) => ({}),

    /**
     * authResetPassword: Action to handle resetting the password.
     * Does not modify the state directly as the saga will handle the side effect.
     *
     * @param {AuthState} state - The current state of the authentication slice
     * @param {PayloadAction<ResetPasswordPayload>} action - The payload containing reset details
     */
    authResetPassword: (
      state,
      action: PayloadAction<ResetPasswordPayload>
    ) => ({}),

    /**
     * authUpdateRedirect: Action to update the redirect state.
     *
     * @param {AuthState} state - The current state of the authentication slice
     * @param {PayloadAction<boolean>} action - The payload indicating the redirect state
     */
    authUpdateRedirect: (state, action: PayloadAction<boolean>) => ({
      redirect: action.payload,
    }),

    /**
     * authVerified: Action to handle user verification.
     * Does not modify the state directly as the saga will handle the side effect.
     *
     * @param {AuthState} state - The current state of the authentication slice
     * @param {PayloadAction<VerifiedPayload>} action - The payload containing verification details
     */
    authVerified: (state, action: PayloadAction<VerifiedPayload>) => ({
      ...state,
    }),
  },
});

// Exporting actions for use in dispatching
export const {
  authSignIn,
  authSignUp,
  authUpdateUser,
  authFetchMe,
  authRefreshToken,
  authLogout,
  authRequestPasswordReset,
  authResetPassword,
  authUpdateRedirect,
  authVerified,
} = authSlice.actions;

// Exporting the reducer to be used in the store configuration
export default authSlice.reducer;
