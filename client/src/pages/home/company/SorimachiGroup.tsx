import { Box, Grid, Typography } from "@mui/material";
import ImageContent from "components/home/common/ImageContent";
import TitleIcon from "components/home/title/TitleIcon";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

/**
 * SorimachiGroup: A component that displays information about Sorimachi groups and departments.
 * It includes group titles and content as well as department details with images.
 * Utilizes `react-helmet-async` for setting the page title and `react-i18next` for translations.
 *
 * @component
 * @returns {JSX.Element} The rendered component with group and department information, images, and background styling.
 */
const SorimachiGroup = (): JSX.Element => {
  // Provides translation functions for the 'sorimachiGroup' namespace
  const { t } = useTranslation("sorimachiGroup");

  // Interface for the props used in the mapping
  interface IndexProps {
    id: number;
    title: string;
    content: string;
    image: string;
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
        <Grid display="flex" flexDirection="column">
          {/* Group Titles and Content */}
          <Grid item>
            <TitleIcon
              title={t("titleGroup")}
              fontSize="38px"
              fontWeight="bold"
              lineHeight="46px"
            ></TitleIcon>
            {t<string, IndexProps[]>("groups", {
              returnObjects: true,
            }).map((item) => (
              <Grid
                mt={0.5}
                key={item.id}
                container
                columns={{ xl: 10, lg: 10, md: 10, sm: 10, xs: 1 }}
                columnSpacing={2}
              >
                <Grid item xs={1} sm={4} md={3} lg={2} xl={2}>
                  <Typography
                    textAlign={{
                      xl: "right",
                      lg: "right",
                      md: "right",
                      sm: "right",
                      xs: "left",
                    }}
                    variant="subtitle1"
                    fontWeight="bold"
                  >
                    {item.title}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={1}
                  sm={6}
                  md={7}
                  lg={8}
                  xl={8}
                  ml={{ xs: 3, sm: 0, md: 0, lg: 0, xl: 0 }}
                >
                  <Typography variant="subtitle1">{item.content}</Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
          {/* Department Titles and Images */}
          <Grid pt={6} item display="flex" flexDirection="column">
            <Grid>
              <TitleIcon
                title={t("titleDepartment")}
                fontSize="38px"
                fontWeight="bold"
                lineHeight="46px"
              ></TitleIcon>
            </Grid>
            {t<string, IndexProps[]>("departments", {
              returnObjects: true,
            }).map((item, index) => (
              <Grid
                key={item.id + index}
                mt={4}
                display="flex"
                flexDirection="column"
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{
                    width: index === 3 ? 500 : 225,
                    objectFit: "cover",
                    height: 58,
                  }}
                ></Box>
                <Typography variant="h5" mt={1} fontWeight="bold">
                  {item.title}
                </Typography>
                <Typography textAlign="justify" variant="subtitle1" mt={1}>
                  {item.content}
                </Typography>
              </Grid>
            ))}
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
          height: "auto",
          userSelect: "none",
        }}
      ></Box>
    </>
  );
};

export default SorimachiGroup;
