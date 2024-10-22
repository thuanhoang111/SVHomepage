import { Box, Grid, Link, Typography } from "@mui/material";
import ImageContent from "components/home/common/ImageContent";
import SubTitleIcon from "components/home/title/SubTitleIcon";
import TitleIconCenter from "components/home/title/TitleIconCenter";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

/**
 * FaceFarmProductionLog: A component that displays the FaceFarm production log page.
 * It utilizes the `react-helmet-async` library for managing document head, and `react-i18next` for internationalization.
 * The page includes an introductory section, special features, and a function section with images and descriptions.
 *
 * @component
 * @returns {JSX.Element} The rendered component with various sections of content, including images, titles, and links.
 */
const FaceFarmProductionLog = () => {
  const { t } = useTranslation("faceFarmProductionLog");

  // Defines the structure for content items used in the special and function sections
  interface IndexProps {
    id: number;
    title: string;
    content: string;
    image: string;
    contentArr: any;
    url: string;
  }

  return (
    <>
      {/* Sets the document title for the page */}
      <Helmet>
        <title>{t("titleHeader")}</title>
      </Helmet>
      {/* Displays the main title image */}
      <ImageContent title={t("titleHeader")} />
      {/* Main content area */}
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
          {/* Introductory section */}
          <Grid item display="flex" flexDirection="column" gap={2.5}>
            <TitleIconCenter title={t("introduce.title")} />
            <Box display="flex" flexDirection="column" gap={2.5}>
              <Typography textAlign="justify" variant="subtitle1">
                {t("introduce.content")}
              </Typography>
              <Box
                component="img"
                src="/images/facefarm_introduce.png"
                width={1}
                alt="facefarm_introduce"
              />
            </Box>
          </Grid>
          {/* Special features section */}
          <Grid item display="flex" flexDirection="column" gap={2.5}>
            <TitleIconCenter title={t("special.title")} />
            <Box display="flex" flexDirection="column" gap={5}>
              {t<string, IndexProps[]>("special.contentArr", {
                returnObjects: true,
              }).map((item, index) => (
                <Grid
                  container
                  key={item.id + index}
                  columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
                  spacing={5}
                  direction={index % 2 === 0 ? "row" : "row-reverse"}
                >
                  <Grid item xl={8} lg={8} md={6} sm={6} xs={12}>
                    <Box display="flex" flexDirection="column" gap={1}>
                      <SubTitleIcon
                        fontSize={22}
                        fontWeight={500}
                        lineHeight="30px"
                        title={item.title}
                      />
                      <Typography
                        color="#232323"
                        textAlign="justify"
                        fontWeight={400}
                        lineHeight="30px"
                        variant="subtitle1"
                        fontSize={16}
                      >
                        {item.content}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.title}
                      width={1}
                    />
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Grid>
          {/* Function section with external link */}
          <Grid item width={1} mt={-3}>
            <Link
              target="_blank"
              href="https://waca.vn/wbs/RegisterWACA?t=637310701158393436"
            >
              <Box
                component="img"
                src={t("function.image")}
                alt="FaceFarm Production Log"
                sx={{ width: 1, userSelect: "none" }}
              />
            </Link>
          </Grid>
        </Grid>
      </Grid>
      {/* Footer section with additional information */}
      <Box bgcolor="#0c5adb" paddingY={6}>
        <Grid
          maxWidth={{ xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
          sx={{
            boxShadow: 0,
            height: "auto",
            marginX: "auto",
          }}
          px={{ xs: 5, sm: 5, md: 8, lg: 10, xl: 20 }}
        >
          <Grid item display="flex" flexDirection="column" gap={2.5}>
            <TitleIconCenter color="white" title={t("function.title")} />
            <Box bgcolor="white" display="flex" flexDirection="column">
              {t<string, IndexProps[]>("function.functions", {
                returnObjects: true,
              }).map((item, index) => (
                <Box
                  key={item.id + index}
                  display="flex"
                  flexDirection="column"
                >
                  <Box bgcolor="rgba(74, 194, 255, 0.7)">
                    <Typography
                      fontFamily="'Philosopher', sans-serif"
                      fontSize={20}
                      fontWeight={700}
                      lineHeight="22px"
                      textAlign="center"
                      sx={{
                        color: "#F9FAFC",
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Box>
                  <Grid
                    container
                    columns={{ xl: 12, lg: 12, md: 9, sm: 9, xs: 6 }}
                    paddingBottom={2}
                  >
                    {item.contentArr.map((text: any, textIndex: number) => (
                      <Grid
                        item
                        xs={3}
                        key={text.text + textIndex}
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        gap={1}
                        paddingLeft={1}
                      >
                        <Box
                          sx={{
                            height: "10px",
                            width: "10px",
                          }}
                          borderRadius={100}
                          bgcolor="#4AC2FF"
                        />
                        <Typography variant="subtitle1">{text.text}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
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

export default FaceFarmProductionLog;
