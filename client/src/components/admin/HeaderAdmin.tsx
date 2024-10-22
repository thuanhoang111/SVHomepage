import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * HeaderAdmin component renders a fixed header at the top of the screen.
 * The header has a blue background, contains a logo image, and navigates
 * to the home page when the logo is clicked.
 *
 * @component
 * @returns {JSX.Element} The rendered header component.
 */
const HeaderAdmin = (): JSX.Element => {
  // Hook to navigate to different routes
  const navigate = useNavigate();

  return (
    <Box
      height={70} // Set the height of the header
      bgcolor="#0C5ADB" // Set the background color of the header
      display="flex" // Use flexbox for alignment
      alignItems="center" // Center the content vertically
      paddingX={15} // Add horizontal padding
    >
      <Box
        height={40} // Set the height of the logo image
        component="img" // Specify that this Box is an image
        src="/images/SORIMACHI_VIETNAM_FOOTER.png" // Path to the logo image
        alt="logo" // Alternative text for the image
        sx={{ cursor: "pointer" }} // Change cursor to pointer when hovering over the logo
        onClick={() => navigate("/")} // Navigate to the home page when the logo is clicked
      ></Box>
    </Box>
  );
};

export default HeaderAdmin;
