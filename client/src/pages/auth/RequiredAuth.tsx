import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "stores/hooks";
import { getToken } from "utils/auth";
const { default: jwt_decode } = require("jwt-decode");

/**
 * RequiredAuth: A higher-order component that handles route protection
 * based on user authentication and permissions. It checks if the user
 * is authenticated and if they have the necessary permissions to access
 * the requested route.
 *
 * @param {Object} props - Component properties
 * @param {Array<string>} props.allowPermissions - List of permissions
 *   required to access the route. If empty, no specific permissions
 *   are required.
 *
 * @component
 * @returns {JSX.Element} A component that either renders the child routes
 *   or redirects to an authentication or unauthorized page based on the
 *   user's authentication status and permissions.
 */
const RequiredAuth = ({
  allowPermissions = [],
}: {
  allowPermissions: Array<string>;
}): JSX.Element => {
  // Access the current user from the Redux store
  const { user } = useAppSelector((state) => state.auth);

  // Retrieve the access token from local storage or other storage
  const { access_token } = getToken();

  // Get the current location to use in redirection
  const location = useLocation();

  // If no access token is present, redirect to the sign-in page
  if (!access_token)
    return (
      <Navigate to="/admin/auth/signin" state={{ from: location }} replace />
    );

  // Decode the access token to get user roles
  const decode = jwt_decode(access_token);
  const userPermissions: Array<string> = decode?.userRole || [];

  // Check if the user has the required permissions or if no specific
  // permissions are needed
  return userPermissions.find((p) => allowPermissions?.includes(p)) ||
    allowPermissions.length <= 0 ? (
    <Outlet></Outlet> // Render the child routes if permissions are valid
  ) : user && user._id ? (
    <Navigate to="/admin/auth/unauthorize" state={{ from: location }} replace />
  ) : (
    <Navigate to="/admin/auth/signin" state={{ from: location }} replace />
  );
};

export default RequiredAuth;
