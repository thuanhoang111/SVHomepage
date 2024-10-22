import { Box, Grid, Typography } from "@mui/material";
import api from "apis/api";
import ImageContent from "components/home/common/ImageContent";
import TitleIcon from "components/home/title/TitleIcon";
import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

/**
 * Personnel: A component displaying a list of personnel with their avatars, titles, and descriptions.
 * It fetches personnel data from an API and displays each personnel item with a department title, avatar,
 * title, content, position, and name. The layout adjusts based on the index of the item.
 * Utilizes `react-helmet-async` for setting the page title, `react-i18next` for translations, and `react-toastify`
 * for error handling.
 *
 * @component
 * @returns {JSX.Element} The rendered component with personnel information, background images, and layout adjustments
 */
const Personnel = (): JSX.Element => {
  // Provides translation functions for the 'personnel' namespace
  const { t, i18n } = useTranslation("personnel");

  // State to hold the list of personnel
  const [personnels, setPersonnel] = useState<any[]>([]);

  /**
   * Fetches personnel list from the API and sets the state with the response data.
   * @param {number | null} page - The page number for pagination (optional).
   * @param {number | null} limit - The number of items per page (optional).
   * @param {boolean | null} visible - Filter to show only visible items (optional).
   * @returns {Promise<void>} - Returns a promise that resolves when the personnel list is fetched and set.
   */
  const getPersonnelList = async (
    page: number | null,
    limit: number | null,
    visible: boolean | null
  ) => {
    await api
      .getPersonnelList(page, limit, visible)
      .then((response) => {
        if (response.status === 200) setPersonnel(response.data.personnels);
      })
      .catch((error: any) => {
        toast.error(error.response.data.error.message);
      });
  };

  // Fetches personnel list when the component mounts
  useEffect(() => {
    getPersonnelList(null, null, true);
  }, []);

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
        <Box display="flex" flexDirection="column">
          {personnels.length > 0 &&
            personnels.map((item, index) => (
              <Fragment key={item._id}>
                <Grid
                  item
                  key={item._id}
                  columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
                  direction={{
                    xl: index % 2 === 0 ? "row" : "row-reverse",
                    lg: index % 2 === 0 ? "row" : "row-reverse",
                    md: index % 2 === 0 ? "row" : "row-reverse",
                    sm: "row",
                    xs: "row",
                  }}
                  container
                  p={2}
                >
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <TitleIcon
                      title={
                        i18n.resolvedLanguage === "vi"
                          ? item?.vi?.department
                          : item?.jp?.department
                      }
                      fontSize="24px"
                      fontWeight="bold"
                      lineHeight="32px"
                    ></TitleIcon>
                  </Grid>
                  <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                    <Box
                      component="img"
                      borderRadius={100}
                      src={process.env.REACT_APP_URL_API + "/" + item?.avatar}
                      alt={
                        i18n.resolvedLanguage === "vi"
                          ? item?.vi?.name
                          : item?.jp?.name
                      }
                      sx={{
                        objectFit: "cover",
                        width: 1,
                      }}
                      p={2}
                    ></Box>
                  </Grid>
                  <Grid item xl={9} lg={9} md={9} sm={12} xs={12} p={2}>
                    <Grid
                      display="flex"
                      height={1}
                      flexDirection="column"
                      justifyContent="space-between"
                    >
                      <Box>
                        <Typography
                          sx={{ color: "#0C5ADB" }}
                          variant="h6"
                          fontWeight="bold"
                          textAlign={{
                            xl: index % 2 === 0 ? "left" : "right",
                            lg: index % 2 === 0 ? "left" : "right",
                            md: index % 2 === 0 ? "left" : "right",
                            sm: "justify",
                            xs: "justify",
                          }}
                        >
                          {i18n.resolvedLanguage === "vi"
                            ? item?.vi?.title
                            : item?.jp?.title}
                        </Typography>
                        <Typography
                          mt={2}
                          variant="subtitle1"
                          textAlign={{
                            xl: index % 2 === 0 ? "left" : "right",
                            lg: index % 2 === 0 ? "left" : "right",
                            md: index % 2 === 0 ? "left" : "right",
                            sm: "justify",
                            xs: "justify",
                          }}
                        >
                          {i18n.resolvedLanguage === "vi"
                            ? item?.vi?.content
                            : item?.jp?.content}
                        </Typography>
                      </Box>
                      <Box mt={2}>
                        <Typography
                          variant="subtitle1"
                          textAlign={index % 2 === 0 ? "left" : "right"}
                        >
                          {i18n.resolvedLanguage === "vi"
                            ? item?.vi?.possition
                            : item?.jp?.possition}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          textAlign={index % 2 === 0 ? "left" : "right"}
                        >
                          {i18n.resolvedLanguage === "vi"
                            ? item?.vi?.name
                            : item?.jp?.name}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Divider line between personnel items */}
                {index + 1 !== personnels.length && <hr />}
              </Fragment>
            ))}
        </Box>
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
      <Grid width={1}>
        <Box
          component="img"
          src="/images/Personnel_Group.png"
          alt="Personnel Group"
          sx={{
            backgroundRepeat: "repeat-y",
            userSelect: "none",
          }}
          width={1}
        ></Box>
      </Grid>
    </>
  );
};

export default Personnel;
