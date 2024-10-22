import { Box, Button, Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

/**
 * NotFound: A component that displays a 404 error page when the requested page is not found.
 * It shows an error image, a title, a subtitle, and a button to navigate back to the home page.
 * The component sets the page title using Helmet and utilizes the translation hook for localization.
 *
 * @component
 * @returns {JSX.Element} The rendered 404 error page component
 */
const NotFound = (): JSX.Element => {
  // Translation hook for localization
  const { t } = useTranslation(["notFoundPage", "common"]);

  return (
    <>
      <Helmet>
        <title>{t("appName", { ns: "common" })}</title>
      </Helmet>
      <Grid
        maxWidth={{ xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
        sx={{
          boxShadow: 0,
          height: "auto",
          marginX: "auto",
          marginTop: 18,
        }}
        px={{ xs: 5, sm: 5, md: 8, lg: 10, xl: 20 }}
        my={6}
      >
        <Grid
          container
          columns={{ xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
          rowSpacing={5}
        >
          {/* Error image */}
          <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
            <Box
              component="img"
              src="/images/Error_404.png"
              alt="Error 404"
              sx={{ width: 1, height: "auto", userSelect: "none" }}
            />
          </Grid>
          {/* Error message and button */}
          <Grid
            item
            xs={1}
            sm={1}
            md={1}
            lg={1}
            xl={1}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              textAlign="center"
              gutterBottom
              variant="h4"
              fontWeight="bold"
              width="80%"
            >
              {t("title", { ns: "notFoundPage" })}
            </Typography>
            <Typography textAlign="center" gutterBottom variant="h6" mb={3}>
              {t("subTitle", { ns: "notFoundPage" })}
            </Typography>
            <Button
              href="/"
              style={{
                color: "#fff",
                padding: "15px 35px",
                background:
                  "linear-gradient(94.43deg, #1A6BF0 0%, #0742A5 96.94%)",
              }}
            >
              {t("titleButton", { ns: "notFoundPage" })}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default NotFound;
