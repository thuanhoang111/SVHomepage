import { Box, Button, Grid, Typography } from "@mui/material";
import api from "apis/api";
import i18n from "i18nextConf";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NewsCard from "../card/NewsCard";
import { News } from "models/news";

/**
 * BreakingNew: A component to display the latest news with dynamic resizing.
 *
 * This component fetches the latest news and displays them in a grid layout.
 * It also adjusts the number of news items displayed based on the window size.
 *
 * @component
 * @returns {JSX.Element} The rendered BreakingNew component
 */

const BreakingNew = (): JSX.Element => {
  // Hook for translation
  const { t } = useTranslation("home");

  // Hook to programmatically navigate
  const navigate = useNavigate();

  // State to store news items
  const [newss, setNewss] = useState<News[]>([]);

  // State to store available years for news
  const [years, setYears] = useState<any[]>([]);

  /**
   * Fetches all available years for news and updates the state.
   */
  const getAllYear = async () => {
    await api
      .getAllYear()
      .then((response) => {
        if (response.status === 200) {
          // Set the years state
          setYears(response.data.years);
        }
      })
      .catch((error: any) => {
        // Display error message
        toast.error(error.response.data.error.message);
      });
  };

  /**
   * Fetches news list based on provided parameters and updates the state.
   *
   * @param {number | null} page - Page number
   * @param {number | null} limit - Number of items per page
   * @param {boolean | null} visible - Visibility filter
   * @param {string | ""} year - Year filter
   */
  const getNewsList = async (
    page: number | null,
    limit: number | null,
    visible: boolean | null,
    year: string | ""
  ) => {
    await api
      .getNewsList(page, limit, visible, year)
      .then((response) => {
        // Set the news items state
        if (response.status === 200) setNewss(response.data.newss);
      })
      .catch((error: any) => {
        // Display error message
        toast.error(error.response.data.error.message);
      });
  };

  useEffect(() => {
    // Fetch all years when component mounts
    getAllYear();
  }, []);

  useEffect(() => {
    // Fetch news list when years are available
    if (years.length > 0) getNewsList(1, 3, true, years[0].year);
  }, [years]);

  /**
   * Gets the current window size.
   *
   * @returns {Object} The current window width and height
   */
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  // State to store window size
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      // Update window size state on resize
      setWindowSize(getWindowSize());
    }

    // Add event listener for window resize
    window.addEventListener("resize", handleWindowResize);

    return () => {
      // Clean up event listener
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <>
      {/* Header Section */}
      <Grid
        height={{ xl: 45, lg: 40, md: 35, sm: 30, xs: 25 }}
        mt={5}
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box component="img" src="/images/h2.png" alt="h2" width={1}></Box>
        <Box
          position={{ xl: "absolute", lg: "absolute" }}
          width={1}
          height={1}
          top={0}
          display="flex"
          justifyContent="center"
          alignItems="start"
        >
          <Typography
            fontFamily="'Philosopher', sans-serif"
            fontSize={{ xl: 36, lg: 32, md: 28, sm: 28, xs: 28 }}
          >
            {t("breakingNews.title")}
          </Typography>
        </Box>
      </Grid>
      {/* News List Section */}
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
          spacing={5}
          columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
        >
          {/* Display news items based on window size */}
          {newss.length > 0 &&
            newss
              .slice(
                0,
                windowSize.innerWidth >= 1536
                  ? 3
                  : windowSize.innerWidth < 1536 && windowSize.innerWidth >= 900
                  ? 2
                  : 1
              )
              .map((item, index) => (
                <NewsCard
                  display={{ xl: 4, lg: 6, md: 6, sm: 12, xs: 12 }}
                  key={item._id}
                  item={i18n.resolvedLanguage === "vi" ? item.vi : item.jp}
                  id={item._id}
                  year={years.length > 0 && years[0].year}
                  date={item.day}
                ></NewsCard>
              ))}
        </Grid>
        {/* View More Button */}
        <Grid mt={3} display="flex" justifyContent="center">
          <Button
            onClick={() => navigate(`/news/${years[0]?.year}`)}
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
            {t("breakingNews.titleButton")}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default BreakingNew;
