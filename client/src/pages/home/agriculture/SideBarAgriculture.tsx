import { Box, Grid, Typography } from "@mui/material";
import api from "apis/api";
import AgricultureSmallCard from "components/home/card/AgricultureSmallCard";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * SideBarAgriculture: A component that displays a sidebar with agriculture-related tags and blog posts.
 * This component fetches and displays a list of tags and agriculture blog posts, and handles navigation
 * based on user interactions and language settings.
 *
 * @component
 * @returns {JSX.Element} The rendered sidebar component with tags and blog posts
 */
const SideBarAgriculture = (): JSX.Element => {
  // Extracts the 'tag' parameter from the URL
  const { tag } = useParams<{ tag?: string }>();

  // State to hold the list of tags
  const [tags, setTags] = useState<any[]>([]);

  // State to hold the tag used for navigation
  const [tagNavigate, setTagNavigate] = useState<any>();

  // State to hold the list of agriculture items
  const [agricultures, setAgricultures] = useState<any[]>([]);

  // Provides translation functions and current language
  const { i18n, t } = useTranslation("agricultureJapan");

  // Hook for programmatic navigation
  const navigate = useNavigate();

  /**
   * Fetches the list of tags from the API and sets the tags state.
   *
   * @param {number | null} page - The page number for pagination
   * @param {number | null} limit - The number of items per page
   * @param {boolean | null} visible - Visibility filter
   * @param {string | null} vi - Vietnamese tag filter
   * @param {string | null} jp - Japanese tag filter
   */
  const getTagList = async (
    page: number | null,
    limit: number | null,
    visible: boolean | null,
    vi: string | null,
    jp: string | null
  ) => {
    await api
      .getTagList(page, limit, visible, vi, jp)
      .then((response) => {
        if (response.status === 200) setTags(response.data.tags);
      })
      .catch((error: any) => {
        toast.error(error.response.data.error.message);
      });
  };

  /**
   * Fetches the tag to navigate to based on the current language and tag parameter.
   *
   * @param {number | null} page - The page number for pagination
   * @param {number | null} limit - The number of items per page
   * @param {boolean | null} visible - Visibility filter
   * @param {string | null} vi - Vietnamese tag filter
   * @param {string | null} jp - Japanese tag filter
   */
  const getTagNavigate = async (
    page: number | null,
    limit: number | null,
    visible: boolean | null,
    vi: string | null,
    jp: string | null
  ) => {
    await api
      .getTagList(page, limit, visible, vi, jp)
      .then((response) => {
        if (response.status === 200) setTagNavigate(response.data.tags[0]);
      })
      .catch((error: any) => {
        toast.error(error.response.data.error.message);
      });
  };

  useEffect(() => {
    // Fetch the tag to navigate to based on language and tag parameter
    if (tag && i18n.resolvedLanguage === "vi") {
      getTagNavigate(null, null, null, null, tag);
    }
    if (tag && i18n.resolvedLanguage === "jp") {
      getTagNavigate(null, null, null, tag, null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    // Navigate to the appropriate tag page when tagNavigate is set
    if (tagNavigate)
      navigate(
        `/agricultureJp/${
          i18n.resolvedLanguage === "vi" ? tagNavigate?.vi : tagNavigate?.jp
        }`
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagNavigate]);

  /**
   * Fetches the list of agriculture items from the API and sets the agricultures state.
   *
   * @param {number | null} page - The page number for pagination
   * @param {number | null} limit - The number of items per page
   * @param {boolean | null} visible - Visibility filter
   * @param {string | ""} tag - Tag filter for agriculture items
   * @param {string | ""} lang - Language filter for agriculture items
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
        if (response.status === 200)
          setAgricultures(response.data.agricultures);
      })
      .catch((error: any) => {
        toast.error(error.response.data.error.message);
      });
  };

  useEffect(() => {
    // Fetch the tag list and agriculture items when component mounts
    getTagList(null, null, true, null, null);
    getAgricultureList(1, 3, true, "", "");
  }, []);

  return (
    <>
      <Box display="flex" flexDirection="column" gap={5}>
        <Grid display="flex" flexDirection="column" gap={2}>
          <Typography
            textTransform="uppercase"
            fontWeight={700}
            fontSize={18}
            color="#00030A"
          >
            {t("key")}
          </Typography>
          <Box display="flex" flexDirection="row" gap={1} flexWrap="wrap">
            {tags.length > 0 &&
              tags.map((item, index) => (
                <Typography
                  key={item._id + index}
                  paddingY={0.5}
                  paddingX={1.5}
                  onClick={() =>
                    navigate(
                      `/agricultureJp/${
                        i18n.resolvedLanguage === "vi" ? item.vi : item.jp
                      }`
                    )
                  }
                  borderRadius={1}
                  sx={{ cursor: "pointer" }}
                  border="solid 1px rgba(0, 0, 0, 0.35)"
                >
                  {i18n.resolvedLanguage === "vi" ? item.vi : item.jp}
                </Typography>
              ))}
          </Box>
        </Grid>
        <Grid display="flex" flexDirection="column" gap={2}>
          <Typography
            textTransform="uppercase"
            fontWeight={700}
            fontSize={18}
            color="#00030A"
          >
            {t("blog")}
          </Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            {agricultures.length > 0 &&
              agricultures.slice(0, 3).map((item, index) => (
                <Fragment key={item?._id + index}>
                  <AgricultureSmallCard item={item}></AgricultureSmallCard>
                  {index !== 2 && <hr />}
                </Fragment>
              ))}
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default SideBarAgriculture;
