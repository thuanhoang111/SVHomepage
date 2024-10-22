import axios from "apis/axios";

/**
 * requestAuthSignUp: Sends a POST request to the server to register a new user.
 *
 * @param {any} data - The data to be sent in the request body, containing user registration information
 * @returns {Promise} - The Axios promise for the HTTP request
 */
export const requestAuthSignUp = (data: any) => {
  return axios.post("/auth/register", { ...data });
};

/**
 * requestAuthSignIn: Sends a POST request to the server to log in a user.
 *
 * @param {any} data - The data to be sent in the request body, containing user login information
 * @returns {Promise} - The Axios promise for the HTTP request
 */
export const requestAuthSignIn = (data: any) => {
  return axios.post("/auth/login", { ...data });
};

/**
 * requestAuthFetchMe: Sends a GET request to fetch authenticated user information.
 * Includes the access token in the request headers for authorization.
 *
 * @param {any} token - The access token to be included in the request headers
 * @returns {Promise} - The Axios promise for the HTTP request
 */
export const requestAuthFetchMe = (token: any) => {
  if (!token) return;
  return axios.get("/auth/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * requestAuthRefreshToken: Sends a POST request to refresh the authentication tokens.
 * Includes the refresh token in the request body.
 *
 * @param {any} token - The refresh token to be sent in the request body
 * @returns {Promise} - The Axios promise for the HTTP request
 */
export const requestAuthRefreshToken = (token: any) => {
  if (!token) return;
  return axios.post(
    "/auth/refresh-token",
    {
      refreshToken: token,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

/**
 * requestAuthLogout: Sends a DELETE request to log out the user.
 * Includes the access token in the URL and sets the content type in the headers.
 *
 * @param {any} token - The access token to be included in the request URL
 * @returns {Promise} - The Axios promise for the HTTP request
 */
export const requestAuthLogout = (token: any) => {
  if (!token) return;
  return axios.delete(`/auth/logout/${token}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * requestRequestPasswordReset: Sends a POST request to request a password reset.
 * Includes the user's email in the request body.
 *
 * @param {any} data - The data to be sent in the request body, containing the user's email
 * @returns {Promise} - The Axios promise for the HTTP request
 */
export const requestRequestPasswordReset = (data: any) => {
  return axios.post(
    "/auth/requestPasswordReset",
    { ...data },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

/**
 * requestResetPassword: Sends a POST request to reset the user's password.
 * Includes the new password and reset token in the request body.
 *
 * @param {any} data - The data to be sent in the request body, containing the new password and reset token
 * @returns {Promise} - The Axios promise for the HTTP request
 */
export const requestResetPassword = (data: any) => {
  return axios.post(
    "/auth/resetPassword",
    { ...data },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

/**
 * requestVerified: Sends a POST request to verify the user's email.
 * Includes the verification data in the request body.
 *
 * @param {any} data - The data to be sent in the request body, containing the verification information
 * @returns {Promise} - The Axios promise for the HTTP request
 */
export const requestVerified = (data: any) => {
  return axios.post(
    "/auth/verified",
    { ...data },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
