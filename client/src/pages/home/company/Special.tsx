import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import ImageContent from "components/home/common/ImageContent";
import SubTitleIcon from "components/home/title/SubTitleIcon";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

/**
 * Special: A component that displays a list of special items in a card format.
 * It includes a header image, a grid of cards with images and descriptions, and a background image.
 * Utilizes `react-helmet-async` for setting the page title and `react-i18next` for translations.
 *
 * @component
 * @returns {JSX.Element} The rendered component with a header, grid of special items, and background styling.
 */
const Special = (): JSX.Element => {
  // Provides translation functions for the 'special' namespace
  const { t } = useTranslation("special");

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
        <Grid
          container
          columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
          spacing={7}
        >
          {/* Maps through the special items and displays them in cards */}
          {t<string, IndexProps[]>("specials", {
            returnObjects: true,
          }).map((item) => (
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1} key={item.id}>
              <Card
                sx={{
                  width: 1,
                  height: 1,
                  borderRadius: 0,
                  background: "#E7EFFC66",
                  boxShadow: 0,
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={item.image}
                  alt={item.title}
                />
                <CardContent>
                  <SubTitleIcon
                    fontSize="21px"
                    fontWeight="400"
                    lineHeight="30px"
                    title={item.title}
                  ></SubTitleIcon>
                  <Typography textAlign="justify" mt={2} variant="subtitle1">
                    {item.content}
                  </Typography>
                </CardContent>
              </Card>
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

export default Special;
