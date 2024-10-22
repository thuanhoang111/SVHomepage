import { Box, Grid, Link, Modal, Typography } from "@mui/material";
import ImageContent from "components/home/common/ImageContent";
import TitleIconCenter from "components/home/title/TitleIconCenter";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Trans, useTranslation } from "react-i18next";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

/**
 * WACACooperativeAccountant: A component that displays information about the WACA Cooperative Accountant project.
 * It includes an introduction, special features, functions, and activities, all presented in a visually appealing format.
 * Utilizes `react-helmet-async` for setting the page title and `react-i18next` for translations.
 * Also uses Swiper for displaying activities in a carousel format.
 *
 * @component
 * @returns {JSX.Element} The rendered component with detailed sections about the WACA Cooperative Accountant project.
 */
const WACACooperativeAccountant = (): JSX.Element => {
  // Provides translation functions for the 'wACACooperativeAccountant' namespace
  const { t } = useTranslation("wACACooperativeAccountant");

  // Interface for the props used in the mapping
  interface IndexProps {
    id: number;
    title: string;
    content: string;
    image: string;
    contentArr: any;
    url: string;
    note: string;
  }

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
        <Grid container direction="column" spacing={5}>
          {/* Introduction section */}
          <Grid item display="flex" flexDirection="column" gap={2.5}>
            <TitleIconCenter title={t("introduce.title")}></TitleIconCenter>
            <Box display="flex" flexDirection="column" gap={3}>
              <Typography textAlign="justify" variant="subtitle1">
                {t("introduce.content")}
              </Typography>
              <Box
                component="img"
                src="/images/waca_introduce.png"
                width={1}
                alt="waca_introduce"
              ></Box>
            </Box>
          </Grid>
          {/* Special features section */}
          <Grid item display="flex" flexDirection="column" gap={2.5}>
            <TitleIconCenter title={t("special.title")}></TitleIconCenter>
            <Grid
              columns={{ xl: 12, lg: 12, md: 9, sm: 9, xs: 6 }}
              container
              spacing={5}
            >
              {t<string, IndexProps[]>("special.contentArr", {
                returnObjects: true,
              }).map((item, index) => (
                <Grid
                  item
                  xs={3}
                  key={item.id + index}
                  display="flex"
                  flexDirection="column"
                  gap={2}
                >
                  <Box component="img" src={item.image} alt={item.image}></Box>
                  <Typography
                    color="#232323"
                    textAlign="justify"
                    fontWeight={400}
                    lineHeight="30px"
                    variant="subtitle1"
                    fontSize={16}
                  >
                    <Trans
                      i18nKey={item.content}
                      components={{ bold: <strong style={{ color: "red" }} /> }}
                    />
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
          {/* Call to action link section */}
          <Grid item width={1} mt={-3}>
            <Link
              target="_blank"
              href="https://waca.vn/wbs/RegisterWACA?t=637310701158393436"
            >
              <Box
                component="img"
                src={t("function.image")}
                alt="WACA Cooperative Accountant"
                sx={{ width: 1, userSelect: "none" }}
              ></Box>
            </Link>
          </Grid>
        </Grid>
      </Grid>
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
          {/* Functions section */}
          <Grid item display="flex" flexDirection="column" gap={2.5}>
            <TitleIconCenter
              color="white"
              title={t("function.title")}
            ></TitleIconCenter>
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
                        ></Box>
                        <Typography variant="subtitle1">{text.text}</Typography>
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      {item.note && (
                        <Typography
                          variant="subtitle1"
                          fontStyle="italic"
                          sx={{ color: "red" }}
                        >
                          (*) {item.note}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
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
        {/* Activities section with Swiper carousel */}
        <Grid item width={1}>
          <TitleIconCenter title={t("activity.title")}></TitleIconCenter>
          <Swiper
            breakpoints={{
              576: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,
              },
              992: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
            spaceBetween={30}
            slidesPerGroup={1}
            // loop={true}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            style={{ width: "100%", marginTop: "16px" }}
          >
            {t<string, IndexProps[]>("activity.images", {
              returnObjects: true,
            }).map((item, index) => (
              <SwiperSlide key={item.id}>
                <ImageItem item={item}></ImageItem>
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
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
    </>
  );
};

/**
 * ImageItem: A component that displays an image item in the WACACooperativeAccountant activities section.
 * It includes a modal that opens on image click to display the image in a larger view.
 *
 * @component
 * @param {Object} item - The image item to be displayed.
 * @param {string} item.url - The URL of the image to be displayed.
 * @returns {JSX.Element} The rendered image item with modal functionality.
 */
const ImageItem = ({ item }): JSX.Element => {
  // Style for the modal image
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    border: "5px solid white",
    objectFit: "cover",
  };

  // State to control the modal open/close
  const [open, setOpen] = useState<boolean>(false);

  // Opens the modal
  const handleOpen = () => setOpen(true);

  // Closes the modal
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        onClick={handleOpen}
        component="img"
        src={item.url}
        alt="WACA Cooperative Accountant"
        sx={{ width: 1, height: 1, objectFit: "cover" }}
      ></Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          component="img"
          src={item.url}
          alt="WACA Cooperative Accountant"
          sx={style}
        ></Box>
      </Modal>
    </>
  );
};

export default WACACooperativeAccountant;
