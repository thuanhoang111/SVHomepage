import "@fontsource/inter";
import {
  Box,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import TitleIcon from "components/home/title/TitleIcon";
import { Card } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

/**
 * SDGs: A component that displays information related to Sustainable Development Goals (SDGs).
 * It includes a header image, title and content sections, and a grid of cards representing different journeys.
 * Each card contains an image, icons, title, and content, with a color bar at the bottom.
 * The component sets the page title using Helmet and utilizes the translation hook for localization.
 *
 * @component
 * @returns {JSX.Element} The rendered SDGs component
 */
const SDGs = (): JSX.Element => {
  // Translation hook for localization
  const { t } = useTranslation("sdgs");

  // Interface for the journey item properties
  interface IndexProps {
    id: number;
    image: string;
    title: string;
    content: string;
    icon1: string;
    icon2: string;
    icon3: string;
    color: string;
  }

  return (
    <>
      <Helmet>
        <title>SDGs</title>
      </Helmet>
      {/* Header image */}
      <Box
        mt={12}
        style={{
          height: "200px",
          width: "100%",
          objectFit: "cover",
        }}
        component="img"
        src="/images/img_headerSGDs.png"
        alt="Header SGDs"
      />
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
        <Stack spacing={5} alignItems="center">
          {/* Title and content section */}
          <Grid>
            <TitleIcon
              title={t("titleSDGs")}
              fontSize="40px"
              fontWeight="bold"
              lineHeight="46px"
            />
            <Typography textAlign="justify" mt={2.5} variant="subtitle1">
              {t("contentSDGs")}
            </Typography>
          </Grid>
          {/* SDGs image */}
          <Box
            component="img"
            src={t("imageSDGs")}
            alt="Sustainable"
            sx={{
              maxWidth: "960px",
              display: "flex",
              width: "100%",
              height: "auto",
              userSelect: "none",
            }}
          />
          {/* Meaning title and content section */}
          <Grid>
            <TitleIcon
              title={t("titleMeaning")}
              fontSize="40px"
              fontWeight="bold"
              lineHeight="46px"
            />
            <Typography mt={2.5} textAlign="justify" variant="subtitle1">
              {t("contentMeaning")}
            </Typography>
          </Grid>
          {/* Journey title and content section */}
          <Grid>
            <TitleIcon
              title={t("journey.title")}
              fontSize="40px"
              fontWeight="bold"
              lineHeight="46px"
            />
            <Typography textAlign="justify" mt={2.5} variant="subtitle1">
              {t("journey.content")}
            </Typography>
          </Grid>
          {/* Grid of journey cards */}
          <Grid
            container
            columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 3 }}
            columnSpacing={{ xl: 3, lg: 3, md: 3, sm: 3, xs: 0 }}
            rowSpacing={5.5}
          >
            {t<string, IndexProps[]>("journey.journeys", {
              returnObjects: true,
            }).map((item) => (
              <Grid item key={item.id} xs={1} sm={1} md={1} lg={1} xl={1}>
                <Card style={{ border: "0px" }}>
                  <Box position="relative">
                    {/* Journey image and icons */}
                    <CardMedia
                      component="img"
                      height="230"
                      image={item.image}
                      alt={item.title}
                    />
                    <Grid
                      top={-15}
                      left={14}
                      columnGap={1}
                      position="absolute"
                      display="flex"
                      flexDirection="row"
                    >
                      <Box
                        component="img"
                        width={75}
                        height={75}
                        src={item.icon1}
                        alt={item.title}
                      />
                      {item.icon2 && (
                        <Box
                          width={75}
                          height={75}
                          component="img"
                          src={item.icon2}
                          alt={item.title}
                        />
                      )}
                      {item.icon3 && (
                        <Box
                          width={75}
                          height={75}
                          component="img"
                          src={item.icon3}
                          alt={item.title}
                        />
                      )}
                    </Grid>
                  </Box>
                  <CardContent sx={{ padding: "20px 0px", height: 220 }}>
                    <Typography
                      variant="h6"
                      color={item.color}
                      gutterBottom
                      sx={{ fontWeight: "bold" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      textAlign="justify"
                      variant="body1"
                      color="#000000"
                    >
                      {item.content}
                    </Typography>
                  </CardContent>
                  {/* Color bar at the bottom of the card */}
                  <Box
                    height={9}
                    mt={{ xs: 5, lg: 0, xl: 0, md: 0, sm: 0 }}
                    sx={{ background: item.color }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
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
      />
    </>
  );
};

export default SDGs;
