import { Box, Grid, Typography } from "@mui/material";
import ImageContent from "components/home/common/ImageContent";
import TitleIcon from "components/home/title/TitleIcon";
import { Helmet } from "react-helmet-async";
import { Trans, useTranslation } from "react-i18next";

/**
 * Message: A component displaying a message with a title, subtitle, and content.
 * It includes an image of a person, a title icon, and a background image.
 * Utilizes `react-helmet-async` for setting the page title and `react-i18next` for translations.
 *
 * @component
 * @returns {JSX.Element} The rendered component with a title, subtitle, message content, and additional details
 */
function Message(): JSX.Element {
  // Provides translation functions for the 'message' namespace
  const { t } = useTranslation("message");

  // Splits the content text into an array of lines
  const contentArr = String(t("content")).split(/\r?\n/);

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
        <Grid container columns={{ xs: 1, sm: 1, md: 1, lg: 8, xl: 10 }}>
          {/* Image section with profile picture */}
          <Grid
            item
            xs={1}
            sm={1}
            md={1}
            lg={4}
            xl={4}
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
                maxWidth: 400,
                height: 550,
                width: 1,
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
              alt="Takahashi Akihiko"
              position={{
                xl: "absolute",
                lg: "absolute",
                md: "absolute",
                sm: "absolute",
                xs: "static",
              }}
              src="/images/Mr.Takahashi.jpg"
              sx={{
                display: "block",
                maxWidth: 400,
                width: 1,
                top: 40,
                left: 40,
                userSelect: "none",
              }}
              pb={5}
            />
          </Grid>
          {/* Title, subtitle, and message content */}
          <Grid item xs={1} sm={1} md={1} lg={4} xl={6}>
            <Grid>
              <TitleIcon
                lineHeight="46px"
                fontWeight="600"
                fontSize="38px"
                title={t("title")}
              ></TitleIcon>
              <Typography pt={2} pb={1} variant="h5">
                {t("subTitle")}
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                {contentArr.map((item, index) => (
                  <Typography
                    key={item + index}
                    textAlign="justify"
                    variant="subtitle1"
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid
              sx={{
                width: 1,
                height: 58,
                textAlign: "left",
              }}
              mt={3}
            >
              <Typography variant="subtitle1" color="#232323">
                {t("company")}
              </Typography>
              <Typography variant="h6" color="#232323">
                <Trans
                  i18nKey={t("author")}
                  components={{ bold: <strong style={{ fontSize: "24px" }} /> }}
                />
              </Typography>
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
          zIndex: -10,
          position: "absolute",
          top: 315,
          height: 900,
          userSelect: "none",
        }}
      ></Box>
    </>
  );
}

export default Message;
