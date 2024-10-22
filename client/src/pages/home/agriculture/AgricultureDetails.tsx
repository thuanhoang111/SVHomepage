import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import api from "apis/api";
import SubTitleIcon from "components/home/title/SubTitleIcon";
import moment from "moment";
import { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * Component to display detailed information about a specific agriculture item.
 * Utilizes various content types including images, videos, PDFs, and links.
 *
 * @component
 * @returns {JSX.Element} The rendered component for password reset
 */
const AgricultureDetails = (): JSX.Element => {
  // i18n instance for translation and t function for text
  const { i18n, t } = useTranslation("agricultureJapan");

  // Extracts the ID parameter from the URL
  const { id } = useParams<{ id?: string }>();

  // State for storing detailed agriculture information
  const [agricultureDetail, setAgricultureDetail] = useState<any>({});

  // State for storing Vietnamese agriculture data
  const [agricultureVi, setAgricultureVi] = useState<any>([]);

  // State for storing Japanese agriculture data
  const [agricultureJp, setAgricultureJp] = useState<any>([]);

  // State for determining which agriculture data to display based on language
  const [agricultureDisplay, setAgricultureDisplay] = useState<any>([]);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  /**
   * Fetches detailed agriculture data based on the provided ID and language.
   * @param id - The ID of the agriculture item.
   * @param language - The language code to fetch data in.
   */
  const getAgricultureDetailFull = async (id: string, language: string) => {
    try {
      const response = await api.getAgricultureDetailFull(id);
      setAgricultureDetail(response.data.agricultureDetail);
      setAgricultureVi(response.data.agricultureVi);
      setAgricultureJp(response.data.agricultureJp);
      setAgricultureDisplay(
        language === "vi"
          ? response.data.agricultureVi
          : response.data.agricultureJp
      );
    } catch (error: any) {
      toast.error(error.response.data.error.message);
    }
  };

  useEffect(() => {
    setAgricultureDisplay(
      i18n.resolvedLanguage === "vi" ? agricultureVi : agricultureJp
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    if (id) getAgricultureDetailFull(id, i18n.resolvedLanguage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [id]);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {/* Displaying the main agriculture item details */}
      <Box display="flex" flexDirection="column" gap={2}>
        {/* Image of the agriculture item */}
        <Box
          component="img"
          src={
            process.env.REACT_APP_URL_API +
            "/" +
            (i18n.resolvedLanguage === "vi"
              ? agricultureDetail?.vi?.poster
              : agricultureDetail?.jp?.poster)
          }
          alt={
            i18n.resolvedLanguage === "vi"
              ? agricultureDetail?.vi?.title
              : agricultureDetail?.jp?.title
          }
          width={1}
          borderRadius={1.5}
        />
        <Box>
          {/* Tags for the agriculture item */}
          <Typography
            sx={{ color: "#0C5ADB" }}
            fontWeight={400}
            fontStyle="italic"
            variant="subtitle1"
            fontSize={14}
          >
            {i18n.resolvedLanguage === "vi"
              ? agricultureDetail?.vi?.tag.map((item: any, index: number) => (
                  <span
                    key={item + index}
                    onClick={() => navigate(`/agricultureJp/${item}`)}
                    style={{ cursor: "pointer" }}
                  >
                    #{item}{" "}
                  </span>
                ))
              : agricultureDetail?.jp?.tag.map((item: any, index: number) => (
                  <span
                    key={item + index}
                    onClick={() => navigate(`/agricultureJp/${item}`)}
                    style={{ cursor: "pointer" }}
                  >
                    #{item}{" "}
                  </span>
                ))}
          </Typography>
          {/* Date and author of the agriculture item */}
          <Typography
            fontSize={14}
            fontStyle="italic"
            fontWeight={400}
            color="rgba(0, 0, 0, 0.4)"
          >
            {agricultureDetail.day &&
              (i18n.resolvedLanguage === "vi"
                ? moment(agricultureDetail.day).format("DD.MM.YYYY")
                : moment(agricultureDetail.day).format("YYYY.MM.DD"))}
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
                ? agricultureDetail?.vi?.author
                : agricultureDetail?.jp?.author}
            </span>
          </Typography>
          {/* Title of the agriculture item */}
          <Typography fontWeight={500} fontSize={24} gutterBottom>
            {i18n.resolvedLanguage === "vi"
              ? agricultureDetail?.vi?.title
              : agricultureDetail?.jp?.title}
          </Typography>
          {/* Description of the agriculture item */}
          <Typography
            color="#232323"
            fontSize={16}
            fontWeight={400}
            textAlign="justify"
          >
            {i18n.resolvedLanguage === "vi"
              ? agricultureDetail?.vi?.description
              : agricultureDetail?.jp?.description}
          </Typography>
        </Box>
      </Box>

      {/* Render additional content sections if available */}
      {agricultureDisplay.length > 0 &&
        agricultureDisplay.map((item: any, index: number) => (
          <Box
            key={item._id}
            display="flex"
            flexDirection="column"
            gap={2}
            mt={item.title ? 2 : 0}
          >
            {item.title && (
              <SubTitleIcon
                title={item.title}
                fontSize={22}
                fontWeight={500}
                lineHeight="30px"
                fontFamily="'Inter', sans-serif"
              />
            )}
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
            {item.italicContent && (
              <Typography
                color="#232323"
                fontSize={16}
                pl={5}
                fontStyle="italic"
                fontWeight={400}
                textAlign="justify"
              >
                {item.italicContent}
              </Typography>
            )}
            {item.image && (
              <Box
                component="img"
                src={process.env.REACT_APP_URL_API + "/" + item.image}
                alt={item.image}
                width={1}
                height="auto"
              />
            )}
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
                      fileUrl={process.env.REACT_APP_URL_API + "/" + item.pdf}
                      plugins={[defaultLayoutPluginInstance]}
                      defaultScale={0.7}
                    />
                  </div>
                </Worker>
              </Grid>
            )}
            {item.youtube && (
              <Grid item xs={12} display="flex" justifyContent="center">
                <ReactPlayer controls url={item.youtube} />
              </Grid>
            )}
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
            {item.linkGroup && item.linkGroup.length > 0 && (
              <Grid item xs={12}>
                <Stack spacing={1}>
                  {item.linkGroup.map((link: any, index: number) => (
                    <Typography variant="subtitle1" key={link.url + index}>
                      👉 {link.content && link.content}{" "}
                      <Link target="_blank" variant="subtitle1" href={link.url}>
                        {link.title}
                      </Link>
                    </Typography>
                  ))}
                </Stack>
              </Grid>
            )}
          </Box>
        ))}

      {/* Uncomment and customize the social media share section if needed */}
      {/* <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        gap={1}
      >
        <Typography variant="subtitle1" fontSize={16} fontWeight={400}>
          Chia sẻ bài viết
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          gap={0.5}
          justifyContent="center"
          alignItems="center"
        >
          <FacebookShareButton url={""}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={""}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <EmailShareButton url={""}>
            <EmailIcon size={32} round />
          </EmailShareButton>
        </Box>
      </Box> */}
    </Box>
  );
};

export default AgricultureDetails;
