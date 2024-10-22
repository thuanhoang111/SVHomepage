import axios from "axios";

// Create a default Axios instance with common settings for the public API
export default axios.create({
  // Base URL for API requests, set from environment variable
  baseURL: process.env.REACT_APP_URL_API,
  // Common headers for all requests made with this instance
  headers: {
    "Content-Type": "application/json", // Default content type for JSON requests
    "Cache-Control": "no-cache", // Prevent caching of requests
  },
});

// Create a separate Axios instance for private or file upload requests
export const axiosPrivate = axios.create({
  // Base URL for API requests, set from environment variable
  baseURL: process.env.REACT_APP_URL_API,
  // Common headers for file upload requests made with this instance
  headers: {
    "Content-Type": "multipart/form-data", // Content type for form data (used for file uploads)
    "Cache-Control": "no-cache", // Prevent caching of requests
  },
});
