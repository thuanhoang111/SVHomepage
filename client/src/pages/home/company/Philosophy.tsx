import { Box, Grid, Typography } from "@mui/material";
import ImageContent from "components/home/common/ImageContent";
import { Helmet } from "react-helmet-async";
import { Trans, useTranslation } from "react-i18next";

/**
 * Philosophy: A component that displays the philosophy section of the website.
 * It includes a title, images, and text content styled with a gradient effect.
 * Utilizes `react-helmet-async` for setting the page title, and `react-i18next` for translations.
 *
 * @component
 * @returns {JSX.Element} The rendered component with images, text content, and background styling.
 */
const Philosophy = (): JSX.Element => {
  // Provides translation functions for the 'philosophy' namespace
  const { t } = useTranslation("philosophy");

  return (
    <>
      {/* Sets the page title using react-helmet-async */}
      <Helmet>
        <title>{t("titleHeader")}</title>
      </Helmet>
      {/* Renders the main image content with title */}
      <ImageContent title={t("titleHeader")}></ImageContent>
      <Grid
        maxWidth={{ xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
        sx={{
          boxShadow: 0,
          height: "auto",
          marginX: "auto",
        }}
        px={{ xs: 5, sm: 5, md: 8, lg: 10, xl: 20 }}
        my={8}
      >
        <Grid
          columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
          container
          spacing={5}
        >
          {/* Grid item for images */}
          <Grid
            item
            xl={6}
            lg={6}
            md={12}
            sm={12}
            xs={12}
            display="flex"
            flexDirection="column"
            gap={3}
          >
            <Box
              component="img"
              src={t("imageFirst")}
              alt="Philosopy_1"
              sx={{
                objectFit: "cover",
                width: 1,
              }}
            ></Box>
            <Box
              component="img"
              src={t("imageSecond")}
              alt="Philosopy_2"
              sx={{
                objectFit: "cover",
                width: 1,
              }}
            ></Box>
          </Grid>
          {/* Grid item for text content */}
          <Grid
            item
            xl={6}
            lg={6}
            md={12}
            sm={12}
            xs={12}
            display="flex"
            flexDirection="column"
            gap={1}
            position="relative"
          >
            <Typography variant="h5" fontSize={20} fontWeight={700}>
              {t("title")}
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography
                fontSize={35}
                fontWeight={700}
                sx={{
                  background:
                    "linear-gradient(90deg, #DF5260 1.66%, #18A6BD 74.25%)",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "'Philosopher', sans-serif",
                }}
                variant="h4"
              >
                {t("song.name")}
              </Typography>
              <Typography
                variant="subtitle1"
                fontWeight={400}
                lineHeight="25px"
                textAlign="justify"
              >
                <Trans
                  i18nKey={t("song.content")}
                  components={{ bold: <span style={{ color: "#10ABBE" }} /> }}
                />
              </Typography>
            </Box>
            {/* Decorative background images */}
            <Box
              component="img"
              src="/images/staves_top.png"
              alt="Staves Top"
              top={-75}
              right={-250}
              sx={{
                zIndex: -1,
                position: "absolute",
              }}
            ></Box>
            <Box
              component="img"
              src="/images/staves_bottom.png"
              alt="Staves Bottom"
              bottom={-310}
              right={-290}
              sx={{
                zIndex: -1,
                position: "absolute",
              }}
            ></Box>
          </Grid>
        </Grid>
      </Grid>
      {/* Background image */}
      <Box
        component="img"
        src="/images/Background_Message.png"
        alt="Background"
        sx={{
          width: 1,
          zIndex: -10,
          position: "absolute",
          top: 315,
          height: 800,
        }}
      ></Box>
    </>
  );
};

export default Philosophy;
