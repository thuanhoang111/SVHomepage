import { Box, Typography } from "@mui/material";

/**
 * FooterAdmin component renders a fixed footer at the bottom of the screen.
 * The footer has a dark background, white text, and displays a copyright notice.
 *
 * @component
 * @returns {JSX.Element} The rendered footer component.
 */
const FooterAdmin = (): JSX.Element => {
  return (
    <Box
      height={60} // Set the height of the footer
      bgcolor="#232323" // Set the background color of the footer
      color="white" // Set the text color of the footer
      position="fixed" // Fix the footer at the bottom of the screen
      bottom={0} // Align the footer at the very bottom
      width={1} // Set the footer to span the full width of the screen
      display="flex" // Use flexbox for alignment
      justifyContent="center" // Center the content horizontally
      alignItems="center" // Center the content vertically
    >
      <Typography>
        SORIMACHI VIET NAM &copy;
        {new Date().getFullYear()} All Rights Reserved
      </Typography>
    </Box>
  );
};

export default FooterAdmin;
