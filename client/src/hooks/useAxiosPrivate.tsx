import { axiosPrivate } from "apis/axios";
import { useEffect } from "react";
import { useAppSelector } from "stores/hooks";
import useRefreshToken from "./useRefreshToken";
import { AxiosInstance } from "axios";

/**
 * useAxiosPrivate: A custom hook to set up axios interceptors for private API requests.
 *
 * This hook configures axios to handle private API requests by setting up interceptors for request and response.
 * It automatically attaches the `Authorization` header to requests and handles token refreshing if an unauthorized response is received.
 *
 * @returns {AxiosInstance} The configured instance of axios with request and response interceptors.
 */
export default function useAxiosPrivate(): AxiosInstance {
  // Custom hook for obtaining a refresh token function
  const refresh = useRefreshToken();

  // Selector to get the current access token from the Redux store
  const { accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Interceptor for adding the Authorization header to outgoing requests
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        // Check if the Authorization header is not already set
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor for handling responses and refreshing the token if necessary
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        // Check for a 403 Unauthorized response and handle token refresh
        if (error?.response?.status === 403 && !prevRequest.sent) {
          // Mark request as sent to prevent infinite loops
          prevRequest.sent = true;
          // Refresh the token
          const newAccessToken = await refresh();
          // Update the Authorization header with the new token
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          // Retry the failed request with the new token
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on component unmount
    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, refresh]); // Dependencies for the useEffect hook

  // Return the configured axios instance
  return axiosPrivate;
}
