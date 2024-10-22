import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import api from "apis/api";
import moment from "moment";
import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player/youtube";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * NewsDetails: A component that fetches and displays detailed news content including images, videos, PDFs, and links.
 * It uses `useParams` to get the news ID from the URL, fetches news data from an API, and displays it with appropriate content rendering.
 * The component adjusts its display based on the selected language and handles different types of content like images, videos, and PDFs.
 *
 * @component
 * @returns {JSX.Element} The rendered component with detailed news content.
 */
const NewsDetails = (): JSX.Element => {
  // Initializes translation and gets the news ID from the URL
  const { i18n } = useTranslation();
  const { id } = useParams<{ id?: string }>();

  // State variables for news details and content
  const [newsDetail, setNewsDetail] = useState<any>({});
  const [newsVi, setNewsVi] = useState<any>([]);
  const [newsJp, setNewsJp] = useState<any>([]);
  const [newsDisplay, setNewsDisplay] = useState<any>([]);

  /**
   * Fetches the full news details from the API based on the news ID and language.
   *
   * @param {string} id - The ID of the news item.
   * @param {string} language - The language for which news is being fetched.
   */
  const getNewsDetailFull = async (id: string, language: string) => {
    await api
      .getNewsDetailFull(id)
      .then((response) => {
        setNewsDetail(response.data.newsDetail);
        setNewsVi(response.data.newsVi);
        setNewsJp(response.data.newsJp);
        setNewsDisplay(
          language === "vi" ? response.data.newsVi : response.data.newsJp
        );
      })
      .catch((error: any) => {
        toast.error(error.response.data.error.message);
      });
  };

  // Updates the displayed news content when the language changes
  useEffect(() => {
    setNewsDisplay(i18n.resolvedLanguage === "vi" ? newsVi : newsJp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.resolvedLanguage]);

  // Fetches news details when the news ID or language changes
  useEffect(() => {
    if (id) getNewsDetailFull(id, i18n.resolvedLanguage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Scrolls to the top of the page when the news ID changes
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [id]);

  // Creates an instance of the default layout plugin for PDF viewer
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <>
      <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
        <Grid
          container
          columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
          sx={{ background: "#F9FAFC" }}
          rowGap={4}
          p={2}
        >
          {/* Displays the publication date of the news */}
          <Grid display="flex" item xs={12} gap={1} m={0}>
            <span style={{ color: "#A7A7A7" }}>
              <svg
                style={{ width: "25px", height: "25px" }}
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </span>
            <Typography variant="subtitle1" color="#A7A7A7">
              {i18n.resolvedLanguage === "vi"
                ? moment(newsDetail?.day).format("DD.MM.YYYY")
                : moment(newsDetail?.day).format("YYYY.MM.DD")}
            </Typography>
          </Grid>
          {/* Displays the news title */}
          <Grid item mt={-3} xs={12}>
            <Typography
              textTransform="uppercase"
              color="#0944A4"
              variant="h5"
              fontWeight="bold"
            >
              {i18n.resolvedLanguage === "vi"
                ? newsDetail?.vi?.title
                : newsDetail?.jp?.title}
            </Typography>
          </Grid>
          {/* Maps through and displays various content types such as images, videos, PDFs, etc. */}
          {newsDisplay.length > 0 &&
            newsDisplay.map((item: any, index: number) => (
              <Fragment key={item.content + index}>
                {/* Displays a centered image */}
                {item.imageCenter && (
                  <Grid item xs={12} display="flex" justifyContent="center">
                    <Box
                      component="img"
                      src={
                        process.env.REACT_APP_URL_API + "/" + item.imageCenter
                      }
                      alt={item.imageCenter}
                      width={1}
                      height="auto"
                    ></Box>
                  </Grid>
                )}
                {/* Displays images on the left and right side */}
                {(item.imageLeft || item.imageRight) && (
                  <Grid
                    item
                    xs={12}
                    container
                    spacing={3}
                    columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={6}
                      xl={6}
                      display="flex"
                      justifyContent="center"
                    >
                      <Box
                        component="img"
                        src={
                          process.env.REACT_APP_URL_API + "/" + item.imageLeft
                        }
                        alt={item.imageLeft}
                        width={1}
                        height="auto"
                      ></Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={6}
                      xl={6}
                      display="flex"
                      justifyContent="center"
                    >
                      <Box
                        component="img"
                        src={
                          process.env.REACT_APP_URL_API + "/" + item.imageRight
                        }
                        alt={item.imageRight}
                        width={1}
                        height="auto"
                      ></Box>
                    </Grid>
                  </Grid>
                )}
                {/* Displays a group of images */}
                {item.imageGroup && item.imageGroup.length > 0 && (
                  <Grid container spacing={1}>
                    {item.imageGroup.map((image, index) => (
                      <Grid key={image.url + index} item xs={4}>
                        <Box
                          component="img"
                          src={process.env.REACT_APP_URL_API + "/" + image.url}
                          alt={image.url}
                          sx={{ width: 1 }}
                        ></Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
                {/* Displays centered text */}
                {item.contentCenter && (
                  <Grid item xs={12}>
                    <Typography
                      textAlign="center"
                      color="gray"
                      variant="subtitle2"
                      mt={-2}
                    >
                      {item.contentCenter}
                    </Typography>
                  </Grid>
                )}
                {/* Displays text content */}
                {item.content && (
                  <Grid item xs={12}>
                    <Typography textAlign="justify" variant="subtitle1">
                      {item.content}
                    </Typography>
                  </Grid>
                )}
                {/* Displays a YouTube video */}
                {item.youtube && (
                  <Grid item xs={12} display="flex" justifyContent="center">
                    <ReactPlayer controls url={item.youtube}></ReactPlayer>
                  </Grid>
                )}
                {/* Displays a video */}
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
                {/* Displays a PDF document */}
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
                {/* Displays a table */}
                {item.table && item.table.length > 0 && (
                  <Grid item xs={12} sx={{ border: "1px solid gray" }}>
                    {item.table.map((row: any, index: number) => (
                      <Grid
                        key={row.title + index}
                        container
                        columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
                      >
                        <Grid
                          container
                          sx={{ border: "1px solid gray" }}
                          p={2}
                          xl={4}
                          lg={4}
                          md={12}
                          sm={12}
                          xs={12}
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography
                            textAlign="center"
                            variant="subtitle1"
                            fontWeight="bold"
                          >
                            {row.title}
                          </Typography>
                        </Grid>
                        <Grid
                          sx={{ border: "1px solid gray", background: "white" }}
                          p={2}
                          xl={8}
                          lg={8}
                          md={12}
                          sm={12}
                          xs={12}
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography variant="subtitle1">
                            {row.content}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                )}
                {/* Displays a group of links */}
                {item.linkGroup && item.linkGroup.length > 0 && (
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      {item.linkGroup.map((link: any, index: number) => (
                        <Typography variant="subtitle1" key={link.url + index}>
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
              </Fragment>
            ))}
        </Grid>
      </Grid>
    </>
  );
};

export default NewsDetails;
