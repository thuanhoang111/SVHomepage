import { Box, Grid, Pagination, Typography } from "@mui/material";
import api from "apis/api";
import AgricultureCard from "components/home/card/AgricultureCard";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * Agriculture: A component that fetches and displays a list of agriculture-related items.
 * It supports pagination, language translation, and tag-based filtering.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
const Agriculture = (): JSX.Element => {
  // Retrieve the 'tag' parameter from the URL
  const { tag } = useParams<{ tag?: string }>();
  const { t, i18n } = useTranslation("agricultureJapan");

  // State for storing the list of agriculture items
  const [agricultures, setAgricultures] = useState<any[]>([]);

  // State for storing the total number of pages
  const [count, setCount] = useState<number>(0);

  // State for storing the current page number
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

  /**
   * Fetches the list of agriculture items based on the provided parameters.
   *
   * @param {number | null} page - The page number to fetch.
   * @param {number | null} limit - The number of items per page.
   * @param {boolean | null} visible - The visibility status of the items.
   * @param {string | ""} tag - The tag to filter the items.
   * @param {string | ""} lang - The language to filter the items.
   */
  const getAgricultureList = async (
    page: number | null,
    limit: number | null,
    visible: boolean | null,
    tag: string | "",
    lang: string | ""
  ) => {
    await api
      .getAgricultureList(page, limit, visible, tag, lang)
      .then((response) => {
        if (response.status === 200) {
          setAgricultures(response.data.agricultures);
          if (limit && page)
            setCount(Math.ceil(response.data.filteredCount / limit));
        }
      })
      .catch((error: any) => {
        toast.error(error.response.data.error.message);
      });
  };

  useEffect(() => {
    // Reset page number when the tag changes
    setPage(1);
  }, [tag]);

  useEffect(() => {
    // Fetch the agriculture list whenever page, tag, or language changes
    getAgricultureList(page, 4, true, tag || "", i18n.resolvedLanguage);
  }, [tag, page, i18n.resolvedLanguage]);

  return (
    <>
      {/* Render content if there are agriculture items available */}
      {agricultures.length > 0 ? (
        <>
          {/* Display the first agriculture item details */}
          <Box display="flex" flexDirection="column" gap={5}>
            <Box display="flex" flexDirection="column" gap={2}>
              {/* Image of the first agriculture item */}
              <Box
                component="img"
                src={
                  process.env.REACT_APP_URL_API +
                  "/" +
                  (i18n.resolvedLanguage === "vi"
                    ? agricultures[0]?.vi?.poster
                    : agricultures[0]?.jp?.poster)
                }
                alt={
                  i18n.resolvedLanguage === "vi"
                    ? agricultures[0]?.vi?.title
                    : agricultures[0]?.jp?.title
                }
                width={1}
                borderRadius={1.5}
              />
              <Box>
                {/* Tags for the first agriculture item */}
                <Typography
                  sx={{ color: "#0C5ADB" }}
                  fontWeight={400}
                  fontStyle="italic"
                  variant="subtitle1"
                  fontSize={14}
                >
                  {i18n.resolvedLanguage === "vi"
                    ? agricultures[0]?.vi?.tag.map(
                        (item: any, index: number) => (
                          <span
                            key={item + index}
                            onClick={() => navigate(`/agricultureJp/${item}`)}
                            style={{ cursor: "pointer" }}
                          >
                            #{item}{" "}
                          </span>
                        )
                      )
                    : agricultures[0]?.jp?.tag.map(
                        (item: any, index: number) => (
                          <span
                            key={item + index}
                            onClick={() => navigate(`/agricultureJp/${item}`)}
                            style={{ cursor: "pointer" }}
                          >
                            #{item}{" "}
                          </span>
                        )
                      )}
                </Typography>
                {/* Date and author details for the first agriculture item */}
                <Typography
                  fontSize={14}
                  fontStyle="italic"
                  fontWeight={400}
                  color="rgba(0, 0, 0, 0.4)"
                >
                  {agricultures[0].day &&
                    (i18n.resolvedLanguage === "vi"
                      ? moment(agricultures[0].day).format("DD.MM.YYYY")
                      : moment(agricultures[0].day).format("YYYY.MM.DD"))}
                  <span
                    style={{
                      paddingLeft: 10,
                      fontSize: 16,
                      fontStyle: "normal",
                      fontWeight: 500,
                      color: "#0C5ADB",
                    }}
                  >
                    {t("author")}
                    {i18n.resolvedLanguage === "vi"
                      ? agricultures[0]?.vi?.author
                      : agricultures[0]?.jp?.author}
                  </span>
                </Typography>
                {/* Title of the first agriculture item */}
                <Typography
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/agricultureJp/detail/${agricultures[0]?._id}`)
                  }
                  fontWeight={500}
                  fontSize={24}
                  gutterBottom
                >
                  {i18n.resolvedLanguage === "vi"
                    ? agricultures[0]?.vi?.title
                    : agricultures[0]?.jp?.title}
                </Typography>
                {/* Description of the first agriculture item */}
                <Typography
                  color="#232323"
                  fontSize={16}
                  fontWeight={400}
                  textAlign="justify"
                >
                  {i18n.resolvedLanguage === "vi"
                    ? String(agricultures[0]?.vi?.description).split(/\r?\n/)[0]
                    : String(agricultures[0]?.jp?.description).split(
                        /\r?\n/
                      )[0]}
                  <br />
                  <br />
                  {i18n.resolvedLanguage === "vi"
                    ? String(agricultures[0]?.vi?.description).split(/\r?\n/)[2]
                    : String(agricultures[0]?.jp?.description).split(
                        /\r?\n/
                      )[2]}
                  ...
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* Separator line */}
          <hr />
          {/* Display the list of agriculture items as cards */}
          <Grid
            container
            columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
            spacing={3}
          >
            {agricultures.length > 0 &&
              agricultures.map((item, index) => (
                <AgricultureCard key={item._id + index} item={item} />
              ))}
            {/* Pagination control if there are multiple pages */}
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
      ) : (
        <Typography>Vui lòng chọn chủ đề khác</Typography>
      )}
    </>
  );
};

export default Agriculture;
