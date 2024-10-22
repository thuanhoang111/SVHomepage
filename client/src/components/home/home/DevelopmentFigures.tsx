import { Box, Grid, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

/**
 * DevelopmentFigures: A component to display development figures with a background image.
 *
 * This component presents development figures with associated images and titles, along with a background image.
 *
 * @component
 * @returns {JSX.Element} The rendered DevelopmentFigures component.
 */
const DevelopmentFigures = (): JSX.Element => {
  // Hook for translation
  const { t } = useTranslation("home");

  return (
    <>
      {/* Main container for the development figures section */}
      <Grid mt={1} position="relative">
        <Grid
          maxWidth={{ xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
          sx={{
            boxShadow: 0,
            height: "auto",
            marginX: "auto",
          }}
          px={{ xs: 5, sm: 5, md: 8, lg: 10, xl: 20 }}
        >
          <Grid
            container
            spacing={1}
            columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
            paddingTop={{ xl: 3, lg: 3, md: 0 }}
          >
            {/* Market Figure */}
            <Grid
              item
              xl={6}
              lg={6}
              md={12}
              sm={12}
              xs={12}
              display="flex"
              justifyContent="center"
            >
              <Stack direction="column" textAlign="center">
                <Box
                  component="img"
                  sx={{
                    display: { xs: "flex", md: "flex" },
                    width: 90,
                    height: 90,
                    margin: "0 auto",
                  }}
                  src="/images/Figure_1.png"
                />
                <h3
                  style={{
                    color: "#0C5ADB",
                    fontWeight: "900",
                    fontSize: "48px",
                  }}
                >
                  {t("developmentFigures.market.title")}
                </h3>
                <h6 style={{ fontWeight: "bold" }}>
                  {t("developmentFigures.market.subTitle")}
                </h6>
              </Stack>
            </Grid>
            {/* Customer Figure */}
            <Grid
              item
              xl={3}
              lg={3}
              md={6}
              sm={6}
              xs={12}
              display="flex"
              justifyContent="center"
            >
              <Stack direction="column" textAlign="center">
                <Box
                  component="img"
                  sx={{
                    display: { xs: "flex", md: "flex" },
                    width: 90,
                    height: 90,
                    margin: "0 auto",
                  }}
                  src="/images/Figure_2.png"
                />
                <h3
                  style={{
                    color: "#0C5ADB",
                    fontWeight: "900",
                    fontSize: "48px",
                  }}
                >
                  {t("developmentFigures.customer.title")}
                </h3>
                <h6 style={{ fontWeight: "bold" }}>
                  {t("developmentFigures.customer.subTitle")}
                </h6>
              </Stack>
            </Grid>
            {/* Request Figure */}
            <Grid
              item
              xl={3}
              lg={3}
              md={6}
              sm={6}
              xs={12}
              display="flex"
              justifyContent="center"
            >
              <Stack direction="column" textAlign="center">
                <Box
                  component="img"
                  sx={{
                    display: { xs: "flex", md: "flex" },
                    width: 90,
                    height: 90,
                    margin: "0 auto",
                  }}
                  src="/images/Figure_3.png"
                />
                <h3
                  style={{
                    color: "#0C5ADB",
                    fontWeight: "900",
                    fontSize: "48px",
                  }}
                >
                  {t("developmentFigures.request.title")}
                </h3>
                <h6 style={{ fontWeight: "bold" }}>
                  {t("developmentFigures.request.subTitle")}
                </h6>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        {/* Background Image */}
        <Box
          style={{ width: "100%", top: 0, zIndex: -10, objectFit: "cover" }}
          component="img"
          src="/images/Figure_BG.png"
          title="Pancakes"
          alt="Pancakes"
          position="absolute"
          height={{ xl: 250, lg: 250, md: 400, sm: 400, xs: 650 }}
        />
      </Grid>
    </>
  );
};

export default DevelopmentFigures;
