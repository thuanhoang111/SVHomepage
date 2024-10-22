import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Outlet, useParams } from "react-router-dom";
import SideBarNews from "../pages/home/news/SideBarNews";
import { Helmet } from "react-helmet-async";

/**
 * LayoutNews: A component for rendering the main layout of the news section.
 *
 * This component sets up the layout for the news page, including a header with a background image and title, a sidebar for news-related content, and a main content area. It uses `react-helmet` to manage the document title, which includes the year extracted from URL parameters. The layout is responsive, with a background image and title positioned absolutely over the header image.
 *
 * @component
 * @returns {JSX.Element} The rendered LayoutNews component with a header, sidebar, main content, and background image.
 */
const LayoutNews = (): JSX.Element => {
  // Extracts translation functions for the "news" namespace
  const { t } = useTranslation("news");

  // Retrieves the year from URL parameters
  const { year } = useParams<{ year?: string }>();

  return (
    <>
      {/* Sets the document title using react-helmet */}
      <Helmet>
        <title>{t("titleHeader", { year })}</title>
      </Helmet>
      {/* Header section with background image and title */}
      <Grid mt={12} container sx={{ position: "relative", height: 200 }}>
        <Box
          component="img"
          alt={t("titleHeader", { year })} // Provides alternative text for the image
          src="/images/Background_Header.png" // Source of the background image
          sx={{
            width: 1, // Full width
            objectFit: "cover", // Ensures image covers the area
            height: 1, // Full height
            backgroundPosition: "center", // Centers the background image
          }}
        />
        <Grid
          position="absolute" // Positions the title absolutely within the header
          display="flex" // Enables flexbox layout
          top="55.5%" // Positions title vertically
          width={1} // Full width
          height={42} // Fixed height for the title container
          alignItems="flex-end" // Aligns title to the bottom of the container
        >
          <Typography
            variant="h4" // Typography variant for the title
            width={{ xl: 1200, lg: 1050, md: 800, sm: 550, xs: 400 }} // Responsive width
            sx={{
              fontFamily: "'Philosopher', sans-serif", // Font family for the title
              textAlign: "center", // Centers the text
              fontWeight: "bold", // Makes the text bold
              color: "#FFFFFF", // White text color
              textTransform: "uppercase", // Transforms text to uppercase
              mx: "auto", // Centers the title horizontally
            }}
          >
            {/* Title text */}
            {t("titleHeader", { year })}
          </Typography>
        </Grid>
      </Grid>
      {/* Main content area with sidebar and nested routes */}
      <Grid
        maxWidth={{ xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" }} // Responsive maximum width
        sx={{
          boxShadow: 0, // Removes shadow
          height: "auto", // Adjusts height based on content
          marginX: "auto", // Centers container horizontally
        }}
        px={{ xs: 5, sm: 5, md: 8, lg: 10, xl: 20 }} // Responsive padding
        my={6} // Vertical margin
      >
        <Grid
          container
          columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} // Defines number of columns for grid layout
          spacing={10} // Sets spacing between grid items
          direction="row-reverse" // Reverses the order of grid items
        >
          {/* Sidebar for news-related content */}
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <SideBarNews />
          </Grid>
          {/* Renders nested routes */}
          <Outlet />
        </Grid>
      </Grid>
      {/* Background image for styling */}
      <Box
        component="img"
        src="/images/Background_Message.png" // Source of the background image
        alt="Background" // Provides alternative text for the image
        sx={{
          width: 1, // Full width
          zIndex: -10, // Places image behind other elements
          position: "absolute", // Positions image absolutely
          top: 315, // Adjusts top position
          height: "850px", // Fixed height
          userSelect: "none", // Prevents text selection on image
        }}
      />
    </>
  );
};

export default LayoutNews;
