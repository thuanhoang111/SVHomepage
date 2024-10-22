import { Box, Grid, Typography } from "@mui/material";
import ImageContent from "components/home/common/ImageContent";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

/**
 * CompliancePrinciples: A component displaying compliance principles.
 * Includes a title, message, date, company information, and a list of compliance principles.
 * Utilizes `react-helmet-async` for setting the page title and `react-i18next` for translations.
 *
 * @component
 * @returns {JSX.Element} The rendered component showing compliance principles information
 */
const CompliancePrinciples = (): JSX.Element => {
  // Provides translation functions for the 'compliancePrinciples' namespace
  const { t } = useTranslation("compliancePrinciples");

  interface IndexProps {
    id: number; // Unique identifier for each principle
    title: string; // Title of the principle
    content: string; // Description of the principle
    image: string; // Image URL associated with the principle
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
        <Grid container columns={{ xs: 1, sm: 1, md: 5, lg: 10, xl: 10 }}>
          {/* Image and text section */}
          <Grid
            item
            xs={1}
            sm={1}
            md={2}
            lg={3}
            xl={3}
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
                maxWidth: 265,
                width: 1,
                height: 360,
                background: "#EAEAEA",
              }}
              display={{
                xl: "block",
                lg: "block",
                md: "block",
                sm: "block",
                xs: "none",
              }}
              mb={10}
            ></Box>
            <Box
              component="img"
              alt="Avatar"
              position={{
                xl: "absolute",
                lg: "absolute",
                md: "absolute",
                sm: "absolute",
                xs: "static",
              }}
              src="/images/Compliance_Principles_Avatar.png"
              sx={{
                display: "block",
                maxWidth: 265,
                width: 1,
                top: 40,
                left: 40,
                userSelect: "none",
              }}
              pb={5}
            />
          </Grid>
          {/* Principle text information */}
          <Grid
            item
            xs={1}
            sm={1}
            md={3}
            lg={7}
            xl={7}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Grid>
              <Typography
                fontFamily="'Philosopher', sans-serif"
                gutterBottom
                fontWeight="bold"
                variant="h4"
              >
                {t("title")}
              </Typography>
              <Typography
                color="#287FF9"
                variant="h6"
                textAlign="justify"
                sx={{
                  fontStyle: "italic",
                }}
              >
                {t("message")}
              </Typography>
            </Grid>
            <Grid mt={4.5} mb={5.5} textAlign="left">
              <Typography fontStyle="italic" gutterBottom>
                {t("date")}
              </Typography>
              <Typography gutterBottom>{t("company")}</Typography>
              <Typography>
                {t("person.title")}{" "}
                <strong style={{ fontSize: "20px" }}>{t("person.name")}</strong>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* List of compliance principles */}
        <Grid
          display="flex"
          sx={{ border: "10px solid rgba(231, 239, 252, 0.5)" }}
          flexDirection="column"
          p={4}
        >
          {t<string, IndexProps[]>("compliancePrinciples", {
            returnObjects: true,
          }).map((item) => (
            <Grid container mb={2.5} columns={6} key={item.id}>
              <Grid item xs={1}>
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{ width: 1, height: "auto" }}
                ></Box>
              </Grid>
              <Grid item xs={5}>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: "bold", fontSize: "18px" }}
                >
                  {item.title}
                </Typography>
                <Typography variant="subtitle1" textAlign="justify">
                  {item.content}
                </Typography>
              </Grid>
            </Grid>
          ))}
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
          height: "auto",
          userSelect: "none",
        }}
      ></Box>
    </>
  );
};

export default CompliancePrinciples;
