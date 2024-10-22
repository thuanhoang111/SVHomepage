import { Box, Grid, Typography } from "@mui/material";
import api from "apis/api";
import { Partner } from "models/partner";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

/**
 * PartnerLogo: A component that displays a carousel of partner logos.
 *
 * This component fetches a list of partner logos and displays them in a Swiper carousel with autoplay and navigation functionality.
 *
 * @component
 * @returns {JSX.Element} The rendered PartnerLogo component.
 */
const PartnerLogo = (): JSX.Element => {
  // Hook for translation
  const { t } = useTranslation("home");

  // State to store partner
  const [partners, setPartners] = useState<Partner[]>([]);

  /**
   * Fetches the list of partners and updates the state.
   *
   * @param {number | null} limit - The number of partners to fetch.
   * @param {number | null} page - The page number for pagination.
   * @param {boolean | null} visible - Flag indicating whether to fetch visible partners.
   */
  const getPartnerList = async (
    limit: number | null,
    page: number | null,
    visible: boolean | null
  ) => {
    try {
      const response = await api.getPartnerList(limit, page, visible);
      setPartners(response.data.partners);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch the partner list when the component mounts
    getPartnerList(null, null, true);
  }, []);

  return (
    <>
      <hr />
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
        <Grid container columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
          {/* Section Header */}
          <Grid
            item
            xl={3}
            lg={3}
            md={5}
            sm={6}
            xs={5}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography fontSize="38px" fontWeight="bold">
              {t("customersCooperate.partner")}
            </Typography>
          </Grid>
          {/* Carousel for Partner Logos */}
          <Grid item xl={9} lg={9} md={7} sm={6} xs={7}>
            <Swiper
              breakpoints={{
                576: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                992: {
                  slidesPerView: 3,
                },
                1200: {
                  slidesPerView: 4,
                },
              }}
              spaceBetween={30}
              // centeredSlides={false}
              autoplay={{
                delay: 2500, // Time between slides
                disableOnInteraction: false, // Continue autoplay even after user interaction
              }}
              pagination={{
                clickable: true, // Allows pagination dots to be clickable
              }}
              navigation={true} // Enables navigation arrows
              modules={[Autoplay, Pagination, Navigation]} // Swiper modules
              className="mySwiper"
              style={{
                width: "100%",
                marginTop: "16px",
                paddingBottom: "0px !important",
              }}
            >
              {/* Render partner logos */}
              {partners &&
                partners.map((partner) => (
                  <SwiperSlide key={partner._id}>
                    <Box
                      component="img"
                      src={process.env.REACT_APP_URL_API + "/" + partner.image}
                      width={1}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PartnerLogo;
