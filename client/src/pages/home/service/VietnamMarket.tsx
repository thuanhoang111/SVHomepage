import { Box, Button, Grid, Typography } from "@mui/material";
import ImageContent from "components/home/common/ImageContent";
import SubTitleIcon from "components/home/title/SubTitleIcon";
import TitleIconCenter from "components/home/title/TitleIconCenter";
import { Helmet } from "react-helmet-async";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

/**
 * VietnamMarket component renders the Vietnam Market page.
 *
 * It includes:
 * - A page title set using `react-helmet-async`.
 * - An image content section displaying the page title.
 * - A grid layout with:
 *   - A section showing market content items, each with a title and content.
 *   - A section displaying software items with images and clickable titles that navigate to specified paths.
 * - A button to view products, which opens a new window with a login URL.
 *
 * @returns {JSX.Element} The rendered VietnamMarket component.
 */
const VietnamMarket = (): JSX.Element => {
  // Hook for internationalization, providing translation functions for the "vietnamMarket" namespace.
  const { t } = useTranslation("vietnamMarket");

  // Hook for programmatic navigation.
  const navigate = useNavigate();

  // TypeScript interface for objects containing market and software details.
  interface IndexProps {
    id: number;
    name: string;
    image: string;
    path: string;
    color: string;
    title: string;
    content: string;
  }

  return (
    <>
      {/* Set the page title */}
      <Helmet>
        <title>Thị trường Việt Nam</title>
      </Helmet>
      {/* Display the page title image */}
      <ImageContent title={t("titleHeader")}></ImageContent>
      {/* Main content layout */}
      <Grid
        maxWidth={{ xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
        sx={{ boxShadow: 0, height: "auto", marginX: "auto" }}
        px={{ xs: 5, sm: 5, md: 8, lg: 10, xl: 20 }}
        my={6}
      >
        <Grid item display="flex" flexDirection="column" gap={4}>
          {/* Market title */}
          <TitleIconCenter title={t("market.title")}></TitleIconCenter>
          {/* Render market content items */}
          {t<string, IndexProps[]>("market.contentArr", {
            returnObjects: true,
          }).map((item, index) => (
            <Box
              key={item.title + index}
              display="flex"
              flexDirection="column"
              gap={1}
            >
              <SubTitleIcon
                fontSize={22}
                fontWeight={800}
                lineHeight="30px"
                title={item.title}
              ></SubTitleIcon>
              <Typography variant="subtitle1" textAlign="justify">
                <Trans
                  i18nKey={item.content}
                  components={{ bold: <strong /> }}
                />
              </Typography>
            </Box>
          ))}
          {/* Render software items */}
          <Box display="flex" flexDirection="column" gap={1}>
            <SubTitleIcon
              fontSize={22}
              fontWeight={800}
              lineHeight="30px"
              title={t("market.titleSoftware")}
            ></SubTitleIcon>
            <Grid
              container
              columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
              spacing={5}
            >
              {t<string, IndexProps[]>("market.software", {
                returnObjects: true,
              }).map((item, index) => (
                <Grid
                  key={item.id + index}
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{ width: 1, cursor: "pointer" }}
                    onClick={() => navigate(item.path)}
                  ></Box>
                  <Typography
                    textAlign="center"
                    color={item.color}
                    variant="h6"
                    fontWeight="bold"
                    mt={2}
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(item.path)}
                  >
                    {item.name}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        {/* Button to view products */}
        <Grid display="flex" justifyContent="center">
          <Button
            onClick={() =>
              window.open("https://portal.sorimachi.vn/Auth/Login")
            }
            sx={{
              color: "#fff",
              padding: "15px 35px",
              background:
                "linear-gradient(94.43deg, #1A6BF0 0%, #0742A5 96.94%)",
              "&:hover": {
                color: "#fff",
                background:
                  "linear-gradient(94.43deg, #0742A5 0%, #1A6BF0 96.94%)",
              },
            }}
          >
            {t("titleButton")}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default VietnamMarket;
