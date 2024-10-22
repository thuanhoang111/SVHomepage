import { Grid, Pagination } from "@mui/material";
import api from "apis/api";
import NewsCard from "components/home/card/NewsCard";
import i18n from "i18nextConf";
import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * News: A component that fetches and displays a list of news articles with pagination.
 * It uses `useParams` to get the year from the URL, fetches news data from an API, and displays it in a grid format.
 * Pagination is implemented to navigate through multiple pages of news articles.
 *
 * @component
 * @returns {JSX.Element} The rendered component with news articles and pagination controls.
 */
const News = (): JSX.Element => {
  // Gets the year parameter from the URL
  const { year } = useParams<{ year?: string }>();

  // State variables for pagination and news data
  const [page, setPage] = useState<number>(1);
  const [newss, setNewss] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);

  /**
   * Fetches the news list from the API based on pagination and year.
   *
   * @param {number | null} page - The current page number.
   * @param {number | null} limit - The number of news items per page.
   * @param {boolean | null} visible - The visibility status of the news items.
   * @param {string | ""} year - The year for which news is being fetched.
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
        if (response.status === 200) {
          setNewss(response.data.newss);
          if (limit && page)
            setCount(Math.ceil(response.data.filteredCount / limit));
        }
      })
      .catch((error: any) => {
        toast.error(error.response.data.error.message);
      });
  };

  // Resets the page number to 1 when the year changes
  useEffect(() => {
    setPage(1);
  }, [year]);

  // Fetches the news list when the year or page number changes
  useEffect(() => {
    if (year) getNewsList(page, 4, true, year);
  }, [year, page]);

  // Scrolls to the top of the page when the page number changes
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [page]);

  return (
    <>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={8}
        xl={8}
        container
        columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
        spacing={5}
      >
        {/* Maps through the news items and displays them using NewsCard component */}
        {newss.length > 0 &&
          newss.map((item) => (
            <NewsCard
              display={{ xl: 6, lg: 6, md: 12, sm: 12, xs: 12 }}
              year={year}
              date={item.day}
              id={item._id}
              item={i18n.resolvedLanguage === "vi" ? item.vi : item.jp}
              key={item._id}
            ></NewsCard>
          ))}
        {/* Renders pagination controls if there are multiple pages */}
        {count > 1 && (
          <Grid container mt={5} alignItems="end">
            <Pagination
              sx={{ marginX: "auto" }}
              count={count}
              size="large"
              page={page}
              variant="outlined"
              color="primary"
              onChange={(e, value) => setPage(value)}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default News;
