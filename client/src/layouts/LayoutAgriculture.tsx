import { Box, Grid } from "@mui/material";
import ImageContent from "components/home/common/ImageContent";
import SideBarAgriculture from "pages/home/agriculture/SideBarAgriculture";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

/**
 * LayoutAgriculture: A component for rendering the main layout of the agriculture section.
 *
 * This component sets up the layout for the agriculture page, including the header, content, and sidebar. It uses `react-helmet` to manage the document head, `ImageContent` for displaying an image with a title, and `Grid` from Material-UI for responsive layout. The `Outlet` component is used for rendering nested routes, and `SideBarAgriculture` is used for displaying additional sidebar content. A background image is also included for styling.
 *
 * @component
 * @returns {JSX.Element} The rendered LayoutAgriculture component with a responsive layout and background image.
 */
const LayoutAgriculture = (): JSX.Element => {
  // Extracts translation functions for the "agricultureJapan" namespace
  const { t } = useTranslation("agricultureJapan");

  return (
    <>
      {/* Sets the document title using react-helmet */}
      <Helmet>
        <title>{t("titleHeader")}</title>
      </Helmet>
      {/* Renders an image with a title from translation */}
      <ImageContent title={t("titleHeader")} />
      {/* Main container for the page layout */}
      <Grid
        maxWidth={{ xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" }} // Sets the maximum width for different screen sizes
        sx={{
          boxShadow: 0, // Removes shadow
          height: "auto", // Adjusts height based on content
          marginX: "auto", // Centers container horizontally
        }}
        px={{ xs: 5, sm: 5, md: 8, lg: 10, xl: 20 }} // Sets padding for different screen sizes
        my={6} // Sets vertical margin
      >
        <Grid
          container
          columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }} // Defines the number of columns for grid layout
          spacing={5} // Sets spacing between grid items
        >
          {/* Main content area */}
          <Grid
            item
            xl={8}
            lg={8}
            md={6}
            sm={12}
            xs={12}
            display="flex"
            flexDirection="column"
            gap={4} // Sets gap between items
          >
            {/* Renders nested routes */}
            <Outlet />
          </Grid>
          {/* Sidebar */}
          <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
            <SideBarAgriculture />
          </Grid>
        </Grid>
      </Grid>
      {/* Background image */}
      <Box
        component="img"
        src="/images/Background_Message.png"
        alt="Background" // Provides alternative text for the image
        sx={{
          width: 1, // Full width
          objectFit: "cover", // Ensures image covers the area
          zIndex: -10, // Places image behind other elements
          position: "absolute", // Positions image absolutely
          top: 315, // Adjusts top position
          height: 1000, // Sets fixed height
          userSelect: "none", // Prevents text selection on image
        }}
      />
    </>
  );
};

export default LayoutAgriculture;
