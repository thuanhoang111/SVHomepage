import { Box, Grid, Typography } from "@mui/material";
import ImageContent from "components/home/common/ImageContent";
import SubTitleIcon from "components/home/title/SubTitleIcon";
import TitleIconCenter from "components/home/title/TitleIconCenter";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

/**
 * OffshoreServices component displays information about offshore services.
 *
 * It sets the page title, shows an introductory image, and includes two sections:
 * - Enterprise services with corresponding text and image.
 * - Agriculture services with corresponding text and image.
 *
 * @returns {JSX.Element} The rendered OffshoreServices component.
 */
const OffshoreServices = (): JSX.Element => {
  // Hook for internationalization, providing translation functions for the "offshoreServices" namespace.
  const { t } = useTranslation("offshoreServices");

  // TypeScript interface for objects with a `text` property used in rendering dynamic content.
  interface IndexProps {
    text: string;
  }

  return (
    <>
      {/* Set the document title for the Offshore Services page */}
      <Helmet>
        <title>{t("titleHeader")}</title>
      </Helmet>
      {/* Display the title image content */}
      <ImageContent title={t("titleHeader")} />
      {/* Main grid container with responsive design */}
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
        <Grid container direction="column" spacing={5}>
          {/* Container for offshore services information */}
          <Grid
            item
            display="flex"
            flexDirection="column"
            gap={2.5}
            id="offshore"
          >
            {/* Title section for the 'produce' information */}
            <TitleIconCenter title={t("produce.title")} />
            {/* Content section for enterprise services */}
            <Box display="flex" flexDirection="column" gap={2.5}>
              <Typography
                textAlign="center"
                variant="subtitle1"
                sx={{ color: "#232323" }}
                fontWeight={400}
                fontSize={16}
                lineHeight="30px"
              >
                {t("produce.content")}
              </Typography>
              <Grid
                container
                columns={{ xl: 11, lg: 11, md: 11, sm: 11, xs: 11 }}
                spacing={5}
              >
                {/* Content section for enterprise services with text and image */}
                <Grid
                  item
                  xl={7}
                  lg={7}
                  md={6}
                  sm={11}
                  xs={11}
                  display="flex"
                  flexDirection="column"
                  gap={1}
                >
                  <SubTitleIcon
                    fontSize={22}
                    fontWeight={800}
                    lineHeight="30px"
                    title={t("produce.enterprise.title")}
                  />
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "#232323" }}
                      fontWeight={400}
                      fontSize={16}
                      lineHeight="30px"
                    >
                      {t("produce.enterprise.subTitle")}
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={0.5}>
                      {t<string, IndexProps[]>(
                        "produce.enterprise.contentArr",
                        { returnObjects: true }
                      ).map((item, index) => (
                        <Box
                          key={item.text + index}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          {/* Icon and text for each item in the enterprise content array */}
                          <Box display="flex" alignItems="center">
                            <svg
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22 11.8623V12.7823C21.9988 14.9388 21.3005 17.037 20.0093 18.7642C18.7182 20.4913 16.9033 21.7548 14.8354 22.3662C12.7674 22.9777 10.5573 22.9042 8.53447 22.1569C6.51168 21.4096 4.78465 20.0284 3.61096 18.2194C2.43727 16.4104 1.87979 14.2704 2.02168 12.1186C2.16356 9.9669 2.99721 7.91866 4.39828 6.27941C5.79935 4.64015 7.69279 3.49772 9.79619 3.02248C11.8996 2.54724 14.1003 2.76467 16.07 3.64234"
                                stroke="#0C5ADB"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M22 4.78223L12 14.7922L9 11.7922"
                                stroke="#0C5ADB"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Box>
                          <Typography
                            variant="subtitle1"
                            sx={{ color: "#232323" }}
                            fontWeight={400}
                            fontSize={16}
                            lineHeight="30px"
                            textAlign="justify"
                          >
                            {item.text}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#232323" }}
                    fontWeight={400}
                    fontSize={16}
                    lineHeight="30px"
                    textAlign="justify"
                  >
                    {t("produce.enterprise.content")}
                  </Typography>
                </Grid>
                {/* Image for enterprise services */}
                <Grid item xl={4} lg={4} md={5} sm={11} xs={11}>
                  <Box
                    component="img"
                    src="/images/business_offshore_enterprise.png"
                    alt="business_offshore_enterprise"
                    width={1}
                  />
                </Grid>
              </Grid>
              {/* Content section for agriculture services */}
              <Grid
                container
                columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
                spacing={5}
                direction="row-reverse"
                pt={2.5}
              >
                <Grid
                  item
                  xl={9}
                  lg={9}
                  md={6}
                  sm={6}
                  xs={12}
                  display="flex"
                  flexDirection="column"
                  gap={1}
                >
                  <SubTitleIcon
                    fontSize={22}
                    fontWeight={800}
                    lineHeight="30px"
                    title={t("produce.agriculture.title")}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#232323" }}
                    fontWeight={400}
                    fontSize={16}
                    lineHeight="30px"
                    textAlign="justify"
                  >
                    {t("produce.agriculture.content")}
                  </Typography>
                </Grid>
                {/* Image for agriculture services */}
                <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                  <Box
                    component="img"
                    src="/images/business_offshore_agriculture.png"
                    alt="business_offshore_agriculture"
                    width={1}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default OffshoreServices;
