import { Box, Grid } from "@mui/material";
import FooterAdmin from "components/admin/FooterAdmin";
import HeaderAdmin from "components/admin/HeaderAdmin";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "stores/hooks";

/**
 * LayoutAuthentication: A component for rendering the authentication layout.
 *
 * This component is used for authentication-related pages. It first checks if the user is authenticated by inspecting the `user` object from the state. If the user is authenticated, it redirects to the admin dashboard using `navigate`. If the user is not authenticated, it displays the authentication layout, including a header, main content area, and footer. The layout includes a flex container centered on the page with a `Box` component for rendering nested routes.
 *
 * @component
 * @returns {JSX.Element | null} The rendered LayoutAuthentication component or null if the user is authenticated.
 */
const LayoutAuthentication = (): JSX.Element | null => {
  // Retrieves the current user from the application state
  const { user } = useAppSelector((state) => state.auth);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Effect hook to handle redirection based on authentication status
  useEffect(() => {
    // Redirects to the admin dashboard if the user is authenticated
    if (user && user._id) {
      navigate("/admin/dashboard");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // If the user is authenticated, render nothing
  if (user && user._id) return null;

  return (
    <>
      {/* Renders the admin header */}
      <HeaderAdmin />
      {/* Main content area for authentication pages */}
      <Box
        minHeight={800} // Minimum height for the container
        bgcolor="#ecf6f7" // Background color
        display="flex" // Enables flexbox layout
        justifyContent="center" // Centers content horizontally
        alignItems="center" // Centers content vertically
      >
        <Grid
          minWidth={500} // Minimum width for the grid
          display="flex" // Enables flexbox layout
          justifyContent="flex-start" // Aligns content to the start of the container
          pl={5} // Adds left padding
        >
          <Box
            bgcolor="white" // Background color for the box
            borderRadius={3} // Rounded corners
            p={5} // Padding inside the box
            width={1} // Full width of the container
          >
            {/* Renders nested routes */}
            <Outlet />
          </Box>
        </Grid>
      </Box>

      {/* Renders the admin footer */}
      <FooterAdmin />
    </>
  );
};

export default LayoutAuthentication;
