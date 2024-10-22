import { Box, Grid, Typography } from "@mui/material";
import api from "apis/api";
import { Cooperative } from "models/cooperative";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

/**
 * CustomersCooperate: A component to display a list of cooperative images in a swiper carousel.
 *
 * This component fetches and displays cooperative images using the Swiper carousel for a responsive and interactive UI.
 *
 * @component
 * @returns {JSX.Element} The rendered CustomersCooperate component.
 */
const CustomersCooperate = (): JSX.Element => {
  // Hook for translation
  const { t } = useTranslation("home");

  // State to store cooperative
  const [cooperatives, setCooperatives] = useState<Cooperative[]>([]);

  /**
   * Fetches the list of cooperatives from the API.
   *
   * @param {number | null} limit - The number of cooperatives to fetch per page (nullable).
   * @param {number | null} page - The page number for pagination (nullable).
   * @param {boolean | null} visible - The visibility status of cooperatives to fetch (nullable).
   * @returns {Promise<void>}
   */
  const getCooperativeList = async (
    limit: number | null,
    page: number | null,
    visible: boolean | null
  ): Promise<void> => {
    await api
      .getCooperativeList(limit, page, visible)
      .then((response) => {
        // Update state with fetched data
        setCooperatives(response.data.cooperatives);
      })
      .catch((error) => {
        // Log any errors for debugging
        console.log(error);
      });
  };

  useEffect(() => {
    // Fetch cooperatives on component mount
    getCooperativeList(null, null, true);
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
            {t("customersCooperate.title")}
          </Typography>
        </Box>
      </Grid>
      {/* Cooperative Carousel Section */}
      <Grid
        maxWidth={{ xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "lg" }}
        sx={{
          boxShadow: 0,
          height: "auto",
          marginX: "auto",
        }}
        m={5}
      >
        <Swiper
          breakpoints={{
            576: {
              slidesPerView: 1, // Show 1 slide for screens 576px and wider
            },
            768: {
              slidesPerView: 2, // Show 2 slides for screens 768px and wider
            },
            992: {
              slidesPerView: 3, // Show 3 slides for screens 992px and wider
            },
            1200: {
              slidesPerView: 4, // Show 4 slides for screens 1200px and wider
            },
          }}
          pagination={{
            clickable: true, // Make pagination dots clickable
          }}
          navigation={true} // Enable navigation arrows
          modules={[Pagination, Navigation]} // Include Swiper modules for pagination and navigation
          className="mySwiper"
          style={{
            width: "100%",
            marginTop: "16px",
            paddingBottom: "0px !important",
          }}
        >
          {cooperatives &&
            cooperatives.map((cooperative) => (
              <SwiperSlide
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={cooperative._id}
              >
                <Box
                  component="img"
                  src={process.env.REACT_APP_URL_API + "/" + cooperative.image}
                  alt="Cooperative Image"
                ></Box>
              </SwiperSlide>
            ))}
        </Swiper>
      </Grid>
    </>
  );
};

export default CustomersCooperate;
