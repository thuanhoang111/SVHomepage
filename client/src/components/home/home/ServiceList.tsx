import { Box, Grid, Typography } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import ReactPlayer from "react-player";

/**
 * ServiceList: A component to display a list of services with titles, images, and videos.
 *
 * This component iterates through a list of services, displaying each with its associated image, title, slogan, and a video.
 * The services are rendered in a grid layout with alternating background colors.
 *
 * @component
 * @returns {JSX.Element} The rendered ServiceList component.
 */
const ServiceList = (): JSX.Element => {
  // Hook for translation to handle internationalization
  const { t } = useTranslation("home");

  // Define the interface for service items
  interface IndexProps {
    subTitle: string;
    title: string;
    image: string;
    slogan: string;
    introduce: any;
    content: string;
    icon: string;
    youtube: string;
    index: number;
  }

  return (
    <>
      {/* Map through each service item and render it */}
      {t<string, IndexProps[]>("serviceList", { returnObjects: true }).map(
        (product, productIndex) => (
          <Grid
            key={product.title}
            bgcolor={productIndex % 2 === 0 ? "" : "rgba(26, 36, 125, 0.03)"}
            paddingY={6}
          >
            <Grid
              maxWidth={{ xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
              sx={{
                boxShadow: 0,
                height: "auto",
                marginX: "auto",
              }}
              px={{ xs: 5, sm: 5, md: 8, lg: 10, xl: 20 }}
              columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
              container
            >
              {/* Container for the service details */}
              <Grid
                item
                lg={12}
                xl={12}
                md={12}
                sm={12}
                xs={12}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                gap={1}
              >
                {/* Service Title and Divider */}
                <Grid
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  gap={1}
                >
                  <Typography
                    fontFamily="'Philosopher', sans-serif"
                    fontWeight={400}
                    fontSize={{ xl: 30, lg: 22, md: 22, sm: 22, xs: 22 }}
                    textTransform="uppercase"
                  >
                    {product.title}
                  </Typography>
                  <Box
                    width={1}
                    component="img"
                    src="/images/line.jpg"
                    alt="line"
                    maxWidth={600}
                  ></Box>
                </Grid>
                {/* Service Image */}
                <Box
                  component="img"
                  src={product.image}
                  marginX={{ xl: 16, lg: 12, md: 8, sm: 4, xs: 0 }}
                ></Box>
                {/* Service Slogan */}
                <Box
                  display="flex"
                  justifyContent="center"
                  className="font-inter"
                >
                  <Typography
                    style={{
                      fontSize: 22,
                      fontWeight: 400,
                      lineHeight: "35px",
                      color: "#232323",
                      textAlign: "center",
                    }}
                  >
                    <Trans
                      i18nKey={product.slogan}
                      components={{
                        bold: <strong style={{ color: "#0C5ADB" }} />,
                      }}
                    />
                  </Typography>
                </Box>
                {/* Service Details and Video */}
                <Grid
                  container
                  columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
                  spacing={4}
                >
                  {/* Introduce Section */}
                  <Grid
                    item
                    xl={6}
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                  >
                    {product.introduce.map((item) => (
                      <Grid
                        key={item.content}
                        container
                        columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
                      >
                        <Grid
                          item
                          xl={2}
                          lg={2}
                          md={2}
                          sm={2}
                          xs={2}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Box
                            borderRadius={100}
                            bgcolor="#0C5ADB"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            width={48}
                            height={48}
                          >
                            <Box
                              component="img"
                              src={item.icon}
                              alt={item.content}
                            ></Box>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xl={10}
                          lg={10}
                          md={10}
                          sm={10}
                          xs={10}
                          display="flex"
                          alignItems="center"
                        >
                          <Typography variant="subtitle1" textAlign="justify">
                            {item.content}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                  {/* YouTube Video */}
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <ReactPlayer
                      width="100%"
                      controls
                      config={{
                        youtube: {
                          playerVars: { index: product.index },
                        },
                      }}
                      url={product.youtube}
                    ></ReactPlayer>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )
      )}
    </>
  );
};

export default ServiceList;
