import { Box, Grid, Link, Typography } from "@mui/material";
import ImageContent from "components/home/common/ImageContent";
import SubTitleIcon from "components/home/title/SubTitleIcon";
import TitleIconCenter from "components/home/title/TitleIconCenter";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const BusinessAreas = () => {
  // Declare t to use translation from file translation.json
  const { t } = useTranslation();
  const { service } = useParams<{ service?: string }>();

  interface IndexProps {
    text: string;
  }
  useEffect(() => {
    const element = document.getElementById(String(service));

    if (element) {
      const yOffset = -60;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [service]);

  return (
    <>
      <ImageContent title={t("businessAreas.titleHeader")}></ImageContent>
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
          <Grid
            id="market"
            item
            display="flex"
            flexDirection="column"
            gap={2.5}
          >
            <TitleIconCenter
              title={t("businessAreas.market.title")}
            ></TitleIconCenter>
            <Box display="flex" flexDirection="column" gap={2.5}>
              <Typography
                textAlign="center"
                variant="subtitle1"
                sx={{ color: "#232323" }}
                fontWeight={400}
                fontSize={16}
                lineHeight="30px"
              >
                {t("businessAreas.market.content")}
              </Typography>
              <Grid
                container
                columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
                spacing={5}
              >
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Link
                    href="/#/faceFarmProductionLog"
                    style={{ textDecoration: "none", height: "100%" }}
                  >
                    <Box
                      component="img"
                      src={t("businessAreas.market.software.imageDiary")}
                      alt="Business Areas"
                      sx={{ width: 1 }}
                    ></Box>
                    <Typography
                      textAlign="center"
                      color="#61C219"
                      variant="h6"
                      fontWeight="bold"
                      mt={2}
                    >
                      {t("businessAreas.market.software.diary")}
                    </Typography>
                  </Link>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Link
                    href="/#/wACACooperativeAccountant"
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      component="img"
                      src={t("businessAreas.market.software.imageAccounting")}
                      alt="Business Areas "
                      sx={{ width: 1 }}
                    ></Box>
                    <Typography
                      textAlign="center"
                      color="#0C5ADB"
                      variant="h6"
                      fontWeight="bold"
                      mt={2}
                    >
                      {t("businessAreas.market.software.accounting")}
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid
            item
            display="flex"
            flexDirection="column"
            gap={2.5}
            id="offshore"
          >
            <TitleIconCenter
              title={t("businessAreas.produce.title")}
            ></TitleIconCenter>
            <Box display="flex" flexDirection="column" gap={2.5}>
              <Typography
                textAlign="center"
                variant="subtitle1"
                sx={{ color: "#232323" }}
                fontWeight={400}
                fontSize={16}
                lineHeight="30px"
              >
                {t("businessAreas.produce.content")}
              </Typography>
              <Grid
                container
                columns={{ xl: 11, lg: 11, md: 11, sm: 11, xs: 11 }}
                spacing={5}
              >
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
                    fontWeight={500}
                    lineHeight="30px"
                    title={t("businessAreas.produce.enterprise.title")}
                  ></SubTitleIcon>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "#232323" }}
                      fontWeight={400}
                      fontSize={16}
                      lineHeight="30px"
                    >
                      {t("businessAreas.produce.enterprise.subTitle")}
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={0.5}>
                      {t<string, IndexProps[]>(
                        "businessAreas.produce.enterprise.contentArr",
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
                    {t("businessAreas.produce.enterprise.content")}
                  </Typography>
                </Grid>
                <Grid item xl={4} lg={4} md={5} sm={11} xs={11}>
                  <Box
                    component="img"
                    src="/images/business_offshore_enterprise.png"
                    alt="business_offshore_enterprise"
                    width={1}
                  ></Box>
                </Grid>
              </Grid>
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
                    fontWeight={500}
                    lineHeight="30px"
                    title={t("businessAreas.produce.agriculture.title")}
                  ></SubTitleIcon>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#232323" }}
                    fontWeight={400}
                    fontSize={16}
                    lineHeight="30px"
                    textAlign="justify"
                  >
                    {t("businessAreas.produce.agriculture.content")}
                  </Typography>
                </Grid>
                <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                  <Box
                    component="img"
                    src="/images/business_offshore_agriculture.png"
                    alt="business_offshore_agriculture"
                    width={1}
                  ></Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
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

export default BusinessAreas;
