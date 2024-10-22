import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import api from "apis/api";
import moment from "moment";
import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * NewsReviewAdmin: A component for reviewing news details.
 *
 * This component fetches and displays detailed information about a news item,
 * including associated Vietnamese and Japanese news items. It handles data fetching
 * and updates state accordingly. It also ensures that the page scrolls to the top
 * when the news item ID changes.
 *
 * @component
 * @returns {JSX.Element} The rendered component for reviewing news details
 */
const NewsReviewAdmin = () => {
  // Extract the 'id' parameter from the URL
  const { id } = useParams<{ id?: string }>();

  // State variables for storing news details and news items in Vietnamese and Japanese
  const [newsDetail, setNewsDetail] = useState<any>({});
  const [newsVi, setNewsVi] = useState<any>([]);
  const [newsJp, setNewsJp] = useState<any>([]);

  // Fetch detailed news information including Vietnamese and Japanese news items
  const getNewsDetailFull = async (id: string) => {
    await api
      .getNewsDetailFull(id) // API call to fetch news details
      .then((response) => {
        // Update state with the fetched data
        setNewsDetail(response.data.newsDetail);
        setNewsVi(response.data.newsVi);
        setNewsJp(response.data.newsJp);
      })
      .catch((error: any) => {
        // Handle errors by displaying an error message
        toast.error(error.response.data.error.message);
      });
  };

  // Fetch news details when the 'id' parameter changes
  useEffect(() => {
    if (id) getNewsDetailFull(id);
  }, [id]);

  // Scroll to the top of the page when the 'id' parameter changes
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [id]);

  // Initialize the default layout plugin for a component (assumed to be for a PDF viewer or similar)
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <>
      {/* Sets the document title for the page */}
      <Helmet>
        <title>News | Admin</title>
      </Helmet>
      {/* Main container grid with spacing and responsive columns */}
      <Grid
        container
        columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
        spacing={5}
      >
        {/* Grid for displaying Vietnamese news details */}
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Grid
            container
            columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
            sx={{
              background: "#F9FAFC",
              boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
            }}
            height={1}
            rowGap={4}
            p={2}
          >
            {/* Header with date */}
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
                {newsDetail.day && moment(newsDetail.day).format("DD.MM.YYYY")}
              </Typography>
            </Grid>
            {/* Title of the news in Vietnamese */}
            <Grid item mt={-3} xs={12}>
              <Typography
                textTransform="uppercase"
                color="#0944A4"
                variant="h5"
                fontWeight="bold"
              >
                {newsDetail?.vi?.title}
              </Typography>
            </Grid>
            {/* Rendering news items in Vietnamese */}
            {newsVi.length &&
              newsVi.map((item: any, index: number) => (
                <Fragment key={item.content + index}>
                  {/* Center-aligned image */}
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
                  {/* Left and right aligned images */}
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
                            process.env.REACT_APP_URL_API +
                            "/" +
                            item.imageRight
                          }
                          alt={item.imageRight}
                          width={1}
                          height="auto"
                        ></Box>
                      </Grid>
                    </Grid>
                  )}
                  {/* Group of images */}
                  {item.imageGroup && item.imageGroup.length > 0 && (
                    <Grid container spacing={1}>
                      {item.imageGroup.map((image: any, index: number) => (
                        <Grid key={image.url + index} item xs={4}>
                          <Box
                            component="img"
                            src={
                              process.env.REACT_APP_URL_API + "/" + image.url
                            }
                            alt={image.url}
                            sx={{ width: 1 }}
                          ></Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                  {/* Center-aligned content */}
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
                  {/* Content text */}
                  {item.content && (
                    <Grid item xs={12}>
                      <Typography textAlign="justify" variant="subtitle1">
                        {item.content}
                      </Typography>
                    </Grid>
                  )}
                  {/* YouTube video */}
                  {item.youtube && (
                    <Grid item xs={12} display="flex" justifyContent="center">
                      <ReactPlayer controls url={item.youtube}></ReactPlayer>
                    </Grid>
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
                  {/* PDF viewer */}
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
                  {/* Table */}
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
                            item
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
                            sx={{
                              border: "1px solid gray",
                              background: "white",
                            }}
                            item
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
                  {/* Link group */}
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
                </Fragment>
              ))}
          </Grid>
        </Grid>
        {/* Grid for displaying Japanese news details */}
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Grid
            container
            columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
            sx={{
              background: "#F9FAFC",
              boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
            }}
            height={1}
            rowGap={4}
            p={2}
          >
            {/* Header with date */}
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
                {newsDetail.day && moment(newsDetail.day).format("YYYY.MM.DD")}
              </Typography>
            </Grid>
            {/* Title of the news in Japanese */}
            <Grid item mt={-3} xs={12}>
              <Typography
                textTransform="uppercase"
                color="#0944A4"
                variant="h5"
                fontWeight="bold"
              >
                {newsDetail?.jp?.title}
              </Typography>
            </Grid>
            {/* Rendering news items in Japanese */}
            {newsJp.length &&
              newsJp.map((item: any, index: number) => (
                <Fragment key={item.content + index}>
                  {/* Center-aligned image */}
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
                  {/* Left and right aligned images */}
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
                            process.env.REACT_APP_URL_API +
                            "/" +
                            item.imageRight
                          }
                          alt={item.imageRight}
                          width={1}
                          height="auto"
                        ></Box>
                      </Grid>
                    </Grid>
                  )}
                  {/* Group of images */}
                  {item.imageGroup && item.imageGroup.length > 0 && (
                    <Grid container spacing={1}>
                      {item.imageGroup.map((image: any, index: number) => (
                        <Grid key={image.url + index} item xs={4}>
                          <Box
                            component="img"
                            src={
                              process.env.REACT_APP_URL_API + "/" + image.url
                            }
                            alt={image.url}
                            sx={{ width: 1 }}
                          ></Box>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                  {/* Center-aligned content */}
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
                  {/* Content text */}
                  {item.content && (
                    <Grid item xs={12}>
                      <Typography textAlign="justify" variant="subtitle1">
                        {item.content}
                      </Typography>
                    </Grid>
                  )}
                  {/* YouTube video */}
                  {item.youtube && (
                    <Grid item xs={12} display="flex" justifyContent="center">
                      <ReactPlayer controls url={item.youtube}></ReactPlayer>
                    </Grid>
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
                  {/* PDF viewer */}
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
                  {/* Table */}
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
                            item
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
                            sx={{
                              border: "1px solid gray",
                              background: "white",
                            }}
                            item
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
                  {/* Link group */}
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
                </Fragment>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default NewsReviewAdmin;
