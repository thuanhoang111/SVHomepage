import { Box, Grid, Typography } from "@mui/material";
import api from "apis/api";
import { Feedback } from "models/feedback";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

/**
 * CustomerFeedback: A component to display customer feedback in a swiper carousel.
 *
 * This component fetches and displays a list of customer feedbacks using the Swiper carousel for a responsive and interactive UI.
 *
 * @component
 * @returns {JSX.Element} The rendered CustomerFeedback component.
 */
const CustomerFeedback = (): JSX.Element => {
  // Hook for translation
  const { t } = useTranslation("home");

  // State to store feedbacks
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  /**
   * Fetches the list of customer feedbacks from the API.
   *
   * @param {number | null} page - The page number for pagination (nullable).
   * @param {number | null} limit - The number of feedbacks to fetch per page (nullable).
   * @param {boolean | null} visible - The visibility status of feedbacks to fetch (nullable).
   * @returns {Promise<void>}
   */
  const getFeedbackList = async (
    page: number | null,
    limit: number | null,
    visible: boolean | null
  ): Promise<void> => {
    await api
      .getFeedbackList(page, limit, visible)
      .then((response) => {
        if (response.status === 200) setFeedbacks(response.data.feedbacks);
      })
      .catch((error: any) => {
        toast.error(error.response.data.error.message);
      });
  };

  useEffect(() => {
    // Fetch feedbacks on component mount
    getFeedbackList(null, null, true);
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
            {t("customerFeedback.title")}
          </Typography>
        </Box>
      </Grid>
      {/* Feedback Carousel Section */}
      <Grid
        maxWidth={{ xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
        sx={{
          boxShadow: 0,
          height: "auto",
          marginX: "auto",
        }}
        px={{ xs: 5, sm: 5, md: 8, lg: 10, xl: 20 }}
        m={5}
      >
        <Swiper
          breakpoints={{
            576: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1,
            },
            992: {
              slidesPerView: 1,
            },
            1200: {
              slidesPerView: 2,
            },
          }}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          {feedbacks.length > 0 &&
            feedbacks.map((feedback) => (
              <SwiperSlide key={feedback._id}>
                <CustomerItem item={feedback}></CustomerItem>
              </SwiperSlide>
            ))}
        </Swiper>
      </Grid>
    </>
  );
};

/**
 * CustomerItem: A component to display customer feedback or testimonial.
 *
 * This component shows the customer's content, avatar, and name, formatted in a card-like structure.
 * It supports internationalization for Vietnamese and Japanese languages.
 *
 * @component
 * @param {Object} item - The customer item data containing content, avatar, and name.
 * @returns {JSX.Element} The rendered CustomerItem component.
 */
const CustomerItem = ({ item }: { item: Feedback }): JSX.Element => {
  // Hook for translation
  const { i18n } = useTranslation();

  // Split the content into an array of strings, each representing a line.
  const contentArr = String(
    i18n.resolvedLanguage === "vi" ? item.vi.content : item.jp.content
  ).split(/\r?\n/);

  return (
    <>
      {/* Main Grid Container */}
      <Grid borderRadius={3} boxShadow={5} height={1}>
        {/* Top Blue Bar */}
        <Box
          bgcolor="#0C5ADB"
          height="10px"
          sx={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
        ></Box>
        {/* Content and Footer Grid */}
        <Grid
          p={{ xl: 4, lg: 4, md: 4, sm: 4, xs: 1 }}
          height={1}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          {/* Content Section */}
          <Box display="flex" flexDirection="column" gap={1}>
            {contentArr.map((item, index) => (
              <Typography
                key={item + index}
                textAlign="justify"
                variant="subtitle1"
              >
                {item}
              </Typography>
            ))}
          </Box>
          {/* Footer Section with Avatar, Name, and Quote Icon */}
          <Grid container columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
            {/* Avatar */}
            <Grid
              display="flex"
              alignItems="center"
              justifyContent="center"
              item
              xl={2}
              lg={2}
              md={2}
              sm={3}
              xs={3}
            >
              <Box
                component="img"
                src={process.env.REACT_APP_URL_API + "/" + item.avatar}
                alt={
                  i18n.resolvedLanguage === "vi" ? item.vi.name : item.jp.name
                }
                width={70}
                height={70}
                sx={{ objectFit: "cover", objectPosition: "top" }}
                borderRadius={100}
              ></Box>
            </Grid>
            {/* Customer Name */}
            <Grid
              item
              lg={6}
              xl={6}
              md={6}
              sm={5}
              xs={5}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h6">
                {i18n.resolvedLanguage === "vi" ? item.vi.name : item.jp.name}
              </Typography>
            </Grid>
            {/* Quote Icon */}
            <Grid
              item
              xl={4}
              lg={4}
              md={4}
              sm={4}
              xs={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box component="img" src="/images/quotes.png"></Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CustomerFeedback;
