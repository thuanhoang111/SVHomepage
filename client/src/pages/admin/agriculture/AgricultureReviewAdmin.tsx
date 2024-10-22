import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import api from "apis/api";
import SubTitleIcon from "components/home/title/SubTitleIcon";
import { AgricultureLanguage } from "models/agriculture";
import moment from "moment";
import { useEffect, useLayoutEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * AgricultureReviewAdmin Component
 *
 * This component is responsible for displaying detailed information about an agriculture entry. It fetches
 * data from the server based on the `id` parameter from the URL and manages state for the agriculture details
 * in both Vietnamese and Japanese languages. It also ensures the page scrolls to the top when the ID changes.
 *
 * @returns JSX.Element - The rendered component
 */
const AgricultureReviewAdmin = () => {
  // Extract the 'id' parameter from the URL using useParams hook
  const { id } = useParams<{ id?: string }>();

  // State to hold the agriculture details, Vietnamese data, and Japanese data
  const [agricultureDetail, setAgricultureDetail] = useState<any>();
  const [agricultureVi, setAgricultureVi] = useState<
    Array<AgricultureLanguage>
  >([]);
  const [agricultureJp, setAgricultureJp] = useState<
    Array<AgricultureLanguage>
  >([]);

  /**
   * Fetches the full details of an agriculture entry from the server.
   *
   * This function makes an API call to retrieve detailed information for the agriculture entry specified
   * by the provided `id`. It updates the component state with the received data.
   *
   * @param id - The ID of the agriculture entry to fetch
   */
  const getAgricultureDetailFull = async (id: string) => {
    await api
      .getAgricultureDetailFull(id)
      .then((response) => {
        // Update state with the received data
        setAgricultureDetail(response.data.agricultureDetail);
        setAgricultureVi(response.data.agricultureVi);
        setAgricultureJp(response.data.agricultureJp);
      })
      .catch((error: any) => {
        // Display an error message if the API call fails
        toast.error(error.response.data.error.message);
      });
  };

  // useEffect hook to call getAgricultureDetailFull whenever the `id` changes
  useEffect(() => {
    if (id) getAgricultureDetailFull(id);
  }, [id]);

  // useLayoutEffect hook to scroll the page to the top when the `id` changes
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [id]);

  // Instance of the default layout plugin for additional layout functionality
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <>
      {/* Sets the document title for the page */}
      <Helmet>
        <title>Agriculture | Admin</title>
      </Helmet>
      {/* Main container Grid with spacing */}
      <Grid
        container
        columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
        spacing={5}
      >
        {/* Vietnamese Content Section */}
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            sx={{
              background: "#F9FAFC",
              boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
            }}
            height={1}
            p={2}
          >
            <Box display="flex" flexDirection="column" gap={2}>
              {/* Poster Image */}
              <Box
                component="img"
                src={
                  process.env.REACT_APP_URL_API +
                  "/" +
                  agricultureDetail?.vi?.poster
                }
                alt={agricultureDetail?.vi?.title}
                width={1}
                borderRadius={1.5}
              />
              <Box>
                {/* Tags */}
                <Typography
                  sx={{ color: "#0C5ADB" }}
                  fontWeight={400}
                  fontStyle="italic"
                  variant="subtitle1"
                  fontSize={14}
                >
                  {agricultureDetail?.vi?.tag.map(
                    (item: any, index: number) => (
                      <span key={item + index} style={{ cursor: "pointer" }}>
                        #{item}{" "}
                      </span>
                    )
                  )}
                </Typography>
                {/* Date and Author */}
                <Typography
                  fontSize={14}
                  fontStyle="italic"
                  fontWeight={400}
                  color="rgba(0, 0, 0, 0.4)"
                >
                  {moment(agricultureDetail.day).format("DD.MM.YYYY")}
                  <span
                    style={{
                      paddingLeft: 10,
                      fontSize: 16,
                      fontStyle: "normal",
                      fontWeight: 500,
                      color: "#0C5ADB",
                    }}
                  >
                    Tác giả: {agricultureDetail?.vi?.author}
                  </span>
                </Typography>
                {/* Title */}
                <Typography fontWeight={500} fontSize={24} gutterBottom>
                  {agricultureDetail?.vi?.title}
                </Typography>
                {/* Description */}
                <Typography
                  color="#232323"
                  fontSize={16}
                  fontWeight={400}
                  textAlign="justify"
                >
                  {agricultureDetail?.vi?.description}
                </Typography>
              </Box>
            </Box>
            {/* Additional Content */}
            {agricultureVi.length > 0 &&
              agricultureVi.map((item: any, index: number) => (
                <Box
                  key={item._id}
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  mt={item.title ? 2 : 0}
                >
                  {/* Subtitle */}
                  {item.title && (
                    <SubTitleIcon
                      title={item.title}
                      fontSize={22}
                      fontWeight={500}
                      lineHeight="30px"
                      fontFamily="'Inter', sans-serif"
                    />
                  )}
                  {/* Top Content */}
                  {item.topContent && (
                    <Typography
                      color="#232323"
                      fontSize={16}
                      fontWeight={400}
                      textAlign="justify"
                    >
                      {item.topContent}
                    </Typography>
                  )}
                  {/* Image */}
                  {item.image && (
                    <Box
                      component="img"
                      src={process.env.REACT_APP_URL_API + "/" + item.image}
                      alt={item.image}
                      width={1}
                      height="auto"
                    />
                  )}
                  {/* Video */}
                  {item.video && (
                    <Grid item xs={12}>
                      <video autoPlay controls width="100%">
                        <source
                          src={process.env.REACT_APP_URL_API + "/" + item.video}
                          type="video/mp4"
                        />
                      </video>
                    </Grid>
                  )}
                  {/* PDF */}
                  {item.pdf && (
                    <Grid item xs={12}>
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
                        <div
                          style={{
                            height: "650px",
                            width: "100%",
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                        >
                          <Viewer
                            fileUrl={
                              process.env.REACT_APP_URL_API + "/" + item.pdf
                            }
                            plugins={[defaultLayoutPluginInstance]}
                            defaultScale={0.7}
                          />
                        </div>
                      </Worker>
                    </Grid>
                  )}
                  {/* YouTube Video */}
                  {item.youtube && (
                    <Grid item xs={12} display="flex" justifyContent="center">
                      <ReactPlayer controls url={item.youtube} />
                    </Grid>
                  )}
                  {/* Bottom Content */}
                  {item.bottomContent && (
                    <Typography
                      color="#232323"
                      fontSize={16}
                      fontWeight={400}
                      textAlign="justify"
                    >
                      {item.bottomContent}
                    </Typography>
                  )}
                  {/* Links */}
                  {item.linkGroup && item.linkGroup.length > 0 && (
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        {item.linkGroup.map((link: any, index: number) => (
                          <Typography
                            variant="subtitle1"
                            key={link.url + index}
                          >
                            👉 {link.content && link.content}{" "}
                            <Link
                              target="_blank"
                              variant="subtitle1"
                              href={link.url}
                            >
                              {link.title}
                            </Link>
                          </Typography>
                        ))}
                      </Stack>
                    </Grid>
                  )}
                </Box>
              ))}
          </Box>
        </Grid>
        {/* Japanese Content Section */}
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            sx={{
              background: "#F9FAFC",
              boxShadow: "0 25px 50px -12px rgb(0 0, 0, 0.25)",
            }}
            height={1}
            p={2}
          >
            <Box display="flex" flexDirection="column" gap={2}>
              {/* Poster Image */}
              <Box
                component="img"
                src={
                  process.env.REACT_APP_URL_API +
                  "/" +
                  agricultureDetail?.jp?.poster
                }
                alt={agricultureDetail?.jp?.title}
                width={1}
                borderRadius={1.5}
              />
              <Box>
                {/* Tags */}
                <Typography
                  sx={{ color: "#0C5ADB" }}
                  fontWeight={400}
                  fontStyle="italic"
                  variant="subtitle1"
                  fontSize={14}
                >
                  {agricultureDetail?.jp?.tag.map(
                    (item: any, index: number) => (
                      <span key={item + index} style={{ cursor: "pointer" }}>
                        #{item}{" "}
                      </span>
                    )
                  )}
                </Typography>
                {/* Date and Author */}
                <Typography
                  fontSize={14}
                  fontStyle="italic"
                  fontWeight={400}
                  color="rgba(0, 0, 0, 0.4)"
                >
                  {moment(agricultureDetail.day).format("YYYY.MM.DD")}
                  <span
                    style={{
                      paddingLeft: 10,
                      fontSize: 16,
                      fontStyle: "normal",
                      fontWeight: 500,
                      color: "#0C5ADB",
                    }}
                  >
                    執筆者：{agricultureDetail?.jp?.author}
                  </span>
                </Typography>
                {/* Title */}
                <Typography fontWeight={500} fontSize={24} gutterBottom>
                  {agricultureDetail?.jp?.title}
                </Typography>
                {/* Description */}
                <Typography
                  color="#232323"
                  fontSize={16}
                  fontWeight={400}
                  textAlign="justify"
                >
                  {agricultureDetail?.jp?.description}
                </Typography>
              </Box>
            </Box>
            {/* Additional Content */}
            {agricultureJp.length > 0 &&
              agricultureJp.map((item: any, index: number) => (
                <Box
                  key={item._id}
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  mt={item.title ? 2 : 0}
                >
                  {/* Subtitle */}
                  {item.title && (
                    <SubTitleIcon
                      title={item.title}
                      fontSize={22}
                      fontWeight={500}
                      lineHeight="30px"
                      fontFamily="'Inter', sans-serif"
                    />
                  )}
                  {/* Top Content */}
                  {item.topContent && (
                    <Typography
                      color="#232323"
                      fontSize={16}
                      fontWeight={400}
                      textAlign="justify"
                    >
                      {item.topContent}
                    </Typography>
                  )}
                  {/* Italic Content */}
                  {item.italicContent && (
                    <Typography
                      color="#232323"
                      fontSize={16}
                      pt={2}
                      fontStyle="italic"
                      fontWeight={400}
                      textAlign="justify"
                    >
                      {item.italicContent}
                    </Typography>
                  )}
                  {/* Image */}
                  {item.image && (
                    <Box
                      component="img"
                      src={process.env.REACT_APP_URL_API + "/" + item.image}
                      alt={item.image}
                      width={1}
                      height="auto"
                    />
                  )}
                  {/* Video */}
                  {item.video && (
                    <Grid item xs={12}>
                      <video autoPlay controls width="100%">
                        <source
                          src={process.env.REACT_APP_URL_API + "/" + item.video}
                          type="video/mp4"
                        />
                      </video>
                    </Grid>
                  )}
                  {/* PDF */}
                  {item.pdf && (
                    <Grid item xs={12}>
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
                        <div
                          style={{
                            height: "650px",
                            width: "100%",
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                        >
                          <Viewer
                            fileUrl={
                              process.env.REACT_APP_URL_API + "/" + item.pdf
                            }
                            plugins={[defaultLayoutPluginInstance]}
                            defaultScale={0.7}
                          />
                        </div>
                      </Worker>
                    </Grid>
                  )}
                  {/* YouTube Video */}
                  {item.youtube && (
                    <Grid item xs={12} display="flex" justifyContent="center">
                      <ReactPlayer controls url={item.youtube} />
                    </Grid>
                  )}
                  {/* Bottom Content */}
                  {item.bottomContent && (
                    <Typography
                      color="#232323"
                      fontSize={16}
                      fontWeight={400}
                      textAlign="justify"
                    >
                      {item.bottomContent}
                    </Typography>
                  )}
                  {/* Links */}
                  {item.linkGroup && item.linkGroup.length > 0 && (
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        {item.linkGroup.map((link: any, index: number) => (
                          <Typography
                            variant="subtitle1"
                            key={link.url + index}
                          >
                            👉 {link.content && link.content}{" "}
                            <Link
                              target="_blank"
                              variant="subtitle1"
                              href={link.url}
                            >
                              {link.title}
                            </Link>
                          </Typography>
                        ))}
                      </Stack>
                    </Grid>
                  )}
                </Box>
              ))}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AgricultureReviewAdmin;
