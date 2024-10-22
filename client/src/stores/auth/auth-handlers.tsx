import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import { logout, saveToken } from "utils/auth";
import {
  requestAuthFetchMe,
  requestAuthLogout,
  requestAuthRefreshToken,
  requestAuthSignIn,
  requestAuthSignUp,
  requestRequestPasswordReset,
  requestResetPassword,
  requestVerified,
} from "./auth-requests";
import { authUpdateRedirect, authUpdateUser } from "./auth-slice";
import {
  RequestPasswordResetPayload,
  ResetPasswordPayload,
  SignInPayload,
  SignUpPayload,
  VerifiedPayload,
} from "./auth-types";

/**
 * handleAuthSignUp: Saga to handle user sign-up.
 * Calls the requestAuthSignUp function and displays a success message on successful sign-up.
 * Displays an error message if the sign-up fails.
 *
 * @generator
 * @param {Object} action - Redux action object
 * @param {SignUpPayload} action.payload - Payload containing user sign-up data
 * @yields {void}
 */
function* handleAuthSignUp({
  payload,
}: {
  payload: SignUpPayload;
  type: string;
}) {
  try {
    const response = yield call(requestAuthSignUp, payload);
    if (response.status === 201) toast.success("Please check your email");
  } catch (error: any) {
    toast.error(error.response.data.error.message);
  }
}

/**
 * handleAuthSignIn: Saga to handle user sign-in.
 * Calls the requestAuthSignIn function and saves the access and refresh tokens on successful sign-in.
 * Fetches user information after sign-in and displays an error message if sign-in fails.
 *
 * @generator
 * @param {Object} action - Redux action object
 * @param {SignInPayload} action.payload - Payload containing user sign-in data
 * @yields {void}
 */
function* handleAuthSignIn({
  payload,
}: {
  payload: SignInPayload;
  type: string;
}) {
  try {
    const response = yield call(requestAuthSignIn, payload);
    if (response.data.accessToken && response.data.refreshToken) {
      saveToken(response.data.accessToken, response.data.refreshToken);
      yield call(handleAuthFetchMe, { payload: response.data.accessToken });
    }
  } catch (error: any) {
    toast.error(error.response.data.error.message);
  }
}

/**
 * handleAuthFetchMe: Saga to fetch authenticated user information.
 * Calls the requestAuthFetchMe function and updates the Redux store with user information.
 * Displays an error message if the fetch operation fails.
 *
 * @generator
 * @param {Object} action - Redux action object
 * @param {string} action.payload - Payload containing the access token
 * @yields {void}
 */
function* handleAuthFetchMe({ payload }: { payload: string }) {
  try {
    const response = yield call(requestAuthFetchMe, payload);
    if (response.data)
      yield put(
        authUpdateUser({
          user: response.data.profile,
          accessToken: payload,
        })
      );
  } catch (error: any) {
    toast.error(error.response.data.error.message);
  }
}

/**
 * handleAuthRefreshToken: Saga to handle token refresh.
 * Calls the requestAuthRefreshToken function and saves new tokens on success.
 * Fetches user information after refreshing the token and logs out the user if token refresh fails.
 *
 * @generator
 * @param {Object} action - Redux action object
 * @param {string} action.payload - Payload containing the refresh token
 * @yields {void}
 */
function* handleAuthRefreshToken({
  payload,
}: {
  payload: string;
  type: string;
}) {
  try {
    const response = yield call(requestAuthRefreshToken, payload);
    if (response.status === 200) {
      saveToken(response.data.accessToken, response.data.refreshToken);
      yield call(handleAuthFetchMe, { payload: response.data.accessToken });
    } else {
      yield handleAuthLogout({
        payload: response.data.accessToken,
        type: null,
      });
    }
  } catch (error: any) {
    toast.error(error.response.data.error.message);
  }
}

/**
 * handleAuthLogout: Saga to handle user logout.
 * Calls the logout utility function and updates the Redux store to clear user information.
 * Calls the requestAuthLogout function and displays an error message if logout fails.
 *
 * @generator
 * @param {Object} action - Redux action object
 * @param {string} action.payload - Payload containing the access token
 * @yields {void}
 */
function* handleAuthLogout({ payload }: { payload: string; type: any }) {
  try {
    logout();
    yield put(
      authUpdateUser({
        user: undefined,
        accessToken: null,
      })
    );
    yield call(requestAuthLogout, payload);
  } catch (error: any) {
    toast.error(error.response.data.error.message);
  }
}

/**
 * handleAuthRequestPasswordReset: Saga to handle password reset request.
 * Calls the requestRequestPasswordReset function and displays a success message on success.
 * Displays an error message if the password reset request fails.
 *
 * @generator
 * @param {Object} action - Redux action object
 * @param {RequestPasswordResetPayload} action.payload - Payload containing email for password reset
 * @yields {void}
 */
function* handleAuthRequestPasswordReset({
  payload,
}: {
  payload: RequestPasswordResetPayload;
  type: string;
}) {
  try {
    const response = yield call(requestRequestPasswordReset, payload);
    if (response.status === 200) toast.success("Please check your email");
  } catch (error: any) {
    toast.error(error.response.data.error.message);
  }
}

/**
 * handleAuthResetPassword: Saga to handle password reset.
 * Calls the requestResetPassword function and displays a success message on successful password reset.
 * Updates the Redux store to trigger a redirect after password reset.
 * Displays an error message if the password reset fails.
 *
 * @generator
 * @param {Object} action - Redux action object
 * @param {ResetPasswordPayload} action.payload - Payload containing new password data
 * @yields {void}
 */
function* handleAuthResetPassword({
  payload,
}: {
  payload: ResetPasswordPayload;
  type: string;
}) {
  try {
    const response = yield call(requestResetPassword, payload);
    if (response.status === 200) {
      toast.success("Reset password successfully");
      yield put(authUpdateRedirect(true));
    }
  } catch (error: any) {
    toast.error(error.response.data.error.message);
  }
}

/**
 * handleAuthVerified: Saga to handle email verification.
 * Calls the requestVerified function and saves new tokens on successful verification.
 * Fetches user information after email verification and displays an error message if verification fails.
 *
 * @generator
 * @param {Object} action - Redux action object
 * @param {VerifiedPayload} action.payload - Payload containing verification data
 * @yields {void}
 */
function* handleAuthVerified({
  payload,
}: {
  payload: VerifiedPayload;
  type: string;
}) {
  try {
    const response = yield call(requestVerified, payload);
    if (response.data.accessToken && response.data.refreshToken) {
      saveToken(response.data.accessToken, response.data.refreshToken);
      yield call(handleAuthFetchMe, { payload: response.data.accessToken });
    }
  } catch (error: any) {
    toast.error(error.response.data.error.message);
  }
}

export {
  handleAuthFetchMe,
  handleAuthLogout,
  handleAuthRefreshToken,
  handleAuthRequestPasswordReset,
  handleAuthResetPassword,
  handleAuthSignIn,
  handleAuthSignUp,
  handleAuthVerified,
};
