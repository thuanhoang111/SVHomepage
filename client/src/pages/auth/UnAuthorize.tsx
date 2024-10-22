import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { authLogout } from "stores/auth/auth-slice";
import { useAppDispatch } from "stores/hooks";
import { getToken } from "utils/auth";

/**
 * UnAuthorize: A component displayed when a user does not have permission to access a resource.
 * It shows a message indicating lack of permission, a logout button, and a footer. The component
 * also provides a clickable logo that navigates to the home page and handles user logout.
 *
 * @component
 * @returns {JSX.Element} The rendered component indicating unauthorized access
 */
const UnAuthorize = (): JSX.Element => {
  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Redux dispatch function
  const dispatch = useAppDispatch();

  // Retrieve the refresh token from the utility function
  const { refresh_token } = getToken();

  return (
    <>
      {/* Sets the document title for the page */}
      <Helmet>
        <title>Un Authorize | Admin</title>
      </Helmet>
      {/* Header section with logo and logout button */}
      <Box
        height={70}
        bgcolor="#0C5ADB"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        paddingX={20}
      >
        {/* Logo image with click handler to navigate to the home page */}
        <Box
          height={40}
          component="img"
          src="/images/SORIMACHI_VIETNAM_FOOTER.png"
          alt="logo"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        {/* Logout button that triggers logout action and navigates to the sign-in page */}
        <IconButton
          onClick={() => {
            dispatch(authLogout(refresh_token));
            navigate("/admin/auth/signin");
          }}
        >
          <LogoutIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
      {/* Main content section displaying the unauthorized access message */}
      <Box
        minHeight={800}
        bgcolor="#ecf6f7"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid minWidth={500} display="flex" justifyContent="flex-start" pl={5}>
          <Box bgcolor="white" borderRadius={3} p={5} width={1}>
            <Typography variant="h6">
              You do not have permission to access this resource
            </Typography>
          </Box>
        </Grid>
      </Box>
      {/* Footer section with copyright information */}
      <Box
        height={60}
        bgcolor="#232323"
        color="white"
        position="fixed"
        bottom={0}
        width={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography>
          SORIMACHI VIET NAM &copy;
          {new Date().getFullYear()} All Rights Reserved
        </Typography>
      </Box>
    </>
  );
};

export default UnAuthorize;
