import { takeLatest } from "redux-saga/effects";
import {
  handleAuthLogout,
  handleAuthRefreshToken,
  handleAuthRequestPasswordReset,
  handleAuthResetPassword,
  handleAuthSignIn,
  handleAuthSignUp,
  handleAuthVerified,
} from "./auth-handlers";
import {
  authLogout,
  authRefreshToken,
  authRequestPasswordReset,
  authResetPassword,
  authSignIn,
  authSignUp,
  authVerified,
} from "./auth-slice";

/**
 * authSaga: Root saga for handling authentication-related actions.
 * Uses the takeLatest effect to handle side effects for authentication actions.
 * Each takeLatest watcher listens for a specific action type and runs the corresponding handler function.
 */
export default function* authSaga() {
  // Watch for authSignUp action and call handleAuthSignUp
  yield takeLatest(authSignUp.type, handleAuthSignUp);

  // Watch for authSignIn action and call handleAuthSignIn
  yield takeLatest(authSignIn.type, handleAuthSignIn);

  // Watch for authRefreshToken action and call handleAuthRefreshToken
  yield takeLatest(authRefreshToken.type, handleAuthRefreshToken);

  // Watch for authRequestPasswordReset action and call handleAuthRequestPasswordReset
  yield takeLatest(
    authRequestPasswordReset.type,
    handleAuthRequestPasswordReset
  );

  // Watch for authResetPassword action and call handleAuthResetPassword
  yield takeLatest(authResetPassword.type, handleAuthResetPassword);

  // Watch for authVerified action and call handleAuthVerified
  yield takeLatest(authVerified.type, handleAuthVerified);

  // Watch for authLogout action and call handleAuthLogout
  yield takeLatest(authLogout.type, handleAuthLogout);
}
