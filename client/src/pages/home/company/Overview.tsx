import { Box, Grid, Typography } from "@mui/material";
import ImageContent from "components/home/common/ImageContent";
import TitleIcon from "components/home/title/TitleIcon";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

/**
 * Overview: A component displaying an overview with an image, title, and a list of content items.
 * It includes an embedded Google Map and a background image for visual enhancement.
 * Utilizes `react-helmet-async` for setting the page title and `react-i18next` for translations.
 *
 * @component
 * @returns {JSX.Element} The rendered component with an overview image, title, content items, and Google Map
 */
const Overview = (): JSX.Element => {
  // Provides translation functions for the 'overview' namespace
  const { t } = useTranslation("overview");

  interface IndexProps {
    id: number;
    title: string;
    content: string;
  }

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
        my={6}
      >
        <Grid container columns={{ xs: 1, sm: 1, md: 1, lg: 11, xl: 11 }}>
          {/* Image section with overview image */}
          <Grid
            item
            xs={1}
            sm={1}
            md={1}
            lg={6}
            xl={5}
            position={{
              xl: "relative",
              lg: "relative",
              md: "relative",
              sm: "relative",
              xs: "static",
            }}
          >
            <Box
              sx={{
                maxWidth: 464,
                width: 1,
                height: 500,
                background: "#EAEAEA",
              }}
              display={{
                xl: "block",
                lg: "block",
                md: "block",
                sm: "block",
                xs: "none",
              }}
              mb={5}
            ></Box>
            <Box
              component="img"
              alt="Overview Image"
              position={{
                xl: "absolute",
                lg: "absolute",
                md: "absolute",
                sm: "absolute",
                xs: "static",
              }}
              src="/images/Overview_Avatar.png"
              sx={{
                display: "block",
                maxWidth: 464,
                width: 1,
                height: 1,
                maxHeight: 540,
                top: 40,
                left: 40,
                userSelect: "none",
              }}
              pb={5}
            />
          </Grid>
          {/* Overview content section */}
          <Grid item xs={1} sm={1} md={1} lg={5} xl={6}>
            <Grid>
              <TitleIcon
                lineHeight="46px"
                fontWeight="600"
                fontSize="38px"
                title={t("title")}
              ></TitleIcon>
              <Grid height={20}></Grid>
              {t<string, IndexProps[]>("overviews", {
                returnObjects: true,
              }).map((item) => (
                <Grid
                  mt={0.5}
                  key={item.id}
                  container
                  columns={{ xl: 10, lg: 1, md: 10, sm: 1, xs: 1 }}
                  columnSpacing={2}
                >
                  <Grid item xs={1} sm={1} md={3} lg={1} xl={3}>
                    <Typography
                      textAlign={{
                        xl: "right",
                        lg: "left",
                        md: "right",
                        sm: "left",
                        xs: "left",
                      }}
                      variant="subtitle1"
                      fontWeight="bold"
                    >
                      {item.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={1} sm={1} md={7} lg={1} xl={7}>
                    <Typography
                      variant="subtitle1"
                      ml={{ xs: 3, sm: 3, md: 0, lg: 3, xl: 0 }}
                    >
                      {item.content}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            {/* Embedded Google Map */}
            <Grid mt={2}>
              <Box
                sx={{
                  height: 160,
                  width: 1,
                }}
              >
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7838.297608003642!2d106.678506!3d10.799913!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf19e40783f62920f!2zQ2FvIOG7kWMgQsOhbyBUdeG7lWkgVHLhurs!5e0!3m2!1sen!2sus!4v1664503509793!5m2!1sen!2sus"
                  style={{ border: 0, width: "100%", height: "100%" }}
                  // allowfullscreen=""
                  loading="lazy"
                  // referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
            </Grid>
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
          objectFit: "cover",
          zIndex: -10,
          position: "absolute",
          top: 315,
          height: 900,
          userSelect: "none",
        }}
      ></Box>
    </>
  );
};

export default Overview;
