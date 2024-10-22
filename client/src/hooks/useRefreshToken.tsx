import axios from "apis/axios";
import { getToken, saveToken } from "utils/auth";

/**
 * useRefreshToken: A custom hook for handling the refresh token process.
 *
 * This hook provides a function to request a new access token using a refresh token. 
 * It sends a request to the backend to obtain a new access token, saves the new tokens if successful, 
 * and returns the new access token.
 *
 * @returns {Function} The refresh function that:
 *   - Retrieves the refresh token.
 *   - Sends a request to the backend to refresh the access token.
 *   - Saves the new tokens.
 *   - Returns the new access token.
 */
export default function useRefreshToken(): Function {
  /**
   * refresh: Requests a new access token using the refresh token.
   * 
   * @async
   * @returns {Promise<string | null>} The new access token, or null if the request fails.
   */
  async function refresh(): Promise<string | null> {
    // Retrieve the refresh token from storage
    const { refresh_token } = getToken();

    // Return null if no refresh token is found
    if (!refresh_token) return null; 

    try {
      // Send a POST request to the backend to refresh the access token
      const response = await axios.post(
        "/auth/refresh-token",
        {
          refreshToken: refresh_token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the response contains data
      if (!response.data) return null;

      // Save the new access and refresh tokens
      saveToken(response.data.accessToken, response.data.refreshToken);

      // Return the new access token
      return response.data.accessToken || "";
    } catch (error) {
      // Handle errors if the request fails
      console.error("Failed to refresh token:", error);
      return null;
    }
  }
  return refresh;
}
