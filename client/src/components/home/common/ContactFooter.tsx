import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Grid, Link, Tooltip, Typography } from "@mui/material";
import api from "apis/api";
import { Contact } from "models/contact";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Define the interface for contact properties
interface IndexProps {
  id: number;
  title: string;
  link: string;
}

/**
 * ContactFooter component displays contact information in the footer,
 * including company information, services, links, and contact details.
 *
 * This component fetches the contact data from an API and supports multiple languages.
 *
 * @component
 */
const ContactFooter = () => {
  // Translation hook for multi-language support
  const { t, i18n } = useTranslation("common");

  // State to hold contact information
  const [contacts, setContacts] = useState<Contact[]>([]);

  /**
   * Fetches the contact list from the API.
   *
   * @param {number | null} page - Page number for pagination (optional)
   * @param {number | null} limit - Number of items per page (optional)
   * @param {boolean | null} defaultContact - Whether to fetch the default contact (optional)
   */
  const getContactList = async (
    page: number | null,
    limit: number | null,
    defaultContact: boolean | null
  ) => {
    await api
      .getContactList(page, limit, defaultContact)
      .then((response) => {
        setContacts(response.data.contacts);
      })
      .catch((error: any) => {
        toast.error(error.response.data.error.message);
      });
  };

  // Call function getContactList when component mounts or when language changes
  useEffect(() => {
    getContactList(null, null, true);
  }, []);

  return (
    <Grid sx={{ background: "#232323" }}>
      <Grid
        maxWidth={{ xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
        sx={{
          boxShadow: 0,
          height: "auto",
          marginX: "auto",
          color: "white",
        }}
        px={{ xs: 5, sm: 5, md: 8, lg: 10, xl: 20 }}
        pt={4}
        pb={2}
      >
        <Grid
          container
          columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
          columnSpacing={5}
        >
          {/* Company Information Section */}
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <Box
              component="img"
              src="/images/SORIMACHI_VIETNAM_FOOTER.png"
              alt="SORIMACHI_VIETNAM"
            ></Box>
            <Typography
              mt={2}
              sx={{ color: "white" }}
              fontStyle="italic"
              textAlign="justify"
            >
              {t("contactFooter.company.content")}
            </Typography>
            <Grid mt={1} direction="row" container gap={1}>
              {/* Facebook Link */}
              <Link
                href="https://www.facebook.com/people/Sorimachi-Vietnam-Co-Ltd/100051071995936/"
                target="_blank"
              >
                <Tooltip title="Facebook">
                  <FacebookIcon
                    sx={{
                      width: 30,
                      height: 30,
                      color: "gray",
                    }}
                  ></FacebookIcon>
                </Tooltip>
              </Link>
              {/* YouTube Link */}
              <Link
                href="https://www.youtube.com/channel/UCFqWRLTNHmBFRyeW3kkHCpg"
                target="_blank"
              >
                <Tooltip title="Youtube">
                  <YouTubeIcon
                    sx={{ width: 30, height: 30, color: "gray" }}
                  ></YouTubeIcon>
                </Tooltip>
              </Link>
            </Grid>
          </Grid>
          {/* Services Section */}
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <Typography variant="h5">
              {t("contactFooter.service.title")}
            </Typography>
            <hr />
            <Grid direction="column" container gap={1}>
              {t<string, IndexProps[]>("contactFooter.service.services", {
                returnObjects: true,
              }).map((item) => (
                <LinkItem key={item.id} item={item}></LinkItem>
              ))}
            </Grid>
          </Grid>
          {/* Links Section */}
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <Typography variant="h5">
              {t("contactFooter.link.title")}
            </Typography>
            <hr />
            <Grid direction="column" container gap={1}>
              {t<string, IndexProps[]>("contactFooter.link.links", {
                returnObjects: true,
              }).map((item) => (
                <LinkItem key={item.id} item={item}></LinkItem>
              ))}
            </Grid>
          </Grid>
          {/* Contact Details Section */}
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <Typography variant="h5">
              {t("contactFooter.contact.title")}
            </Typography>
            <hr />
            <Grid direction="column" container gap={1}>
              {/* Address Link */}
              <Link
                style={{
                  color: "white",
                  textDecoration: "none",
                  textAlign: "justify",
                }}
                target="_blank"
                href="https://www.google.com/maps/place/Cao+%E1%BB%91c+B%C3%A1o+Tu%E1%BB%95i+Tr%E1%BA%BB/@10.799913,106.678506,15z/data=!4m5!3m4!1s0x0:0xf19e40783f62920f!8m2!3d10.7999447!4d106.6785379?hl=en"
              >
                <Box>
                  <PlaceOutlinedIcon sx={{ marginRight: 1 }} />
                  <span>
                    {i18n.resolvedLanguage === "vi"
                      ? contacts[0]?.vi?.address
                      : contacts[0]?.jp?.address}
                  </span>
                </Box>
              </Link>
              {/* Phone Link */}
              <Link
                href={`tel: ${
                  i18n.resolvedLanguage === "vi"
                    ? contacts[0]?.vi?.phone
                    : contacts[0]?.jp?.phone
                }`}
                style={{
                  color: "white",
                  textDecoration: "none",
                  textAlign: "justify",
                }}
              >
                <Box>
                  <CallOutlinedIcon sx={{ marginRight: 1 }} />
                  <span>
                    {i18n.resolvedLanguage === "vi"
                      ? contacts[0]?.vi?.phone
                      : contacts[0]?.jp?.phone}
                  </span>
                </Box>
              </Link>
              {/* Email Link */}
              <Link
                href={`mailto: ${
                  i18n.resolvedLanguage === "vi"
                    ? contacts[0]?.vi?.email
                    : contacts[0]?.jp?.email
                }`}
                style={{
                  color: "white",
                  textDecoration: "none",
                  textAlign: "justify",
                }}
              >
                <Box>
                  <EmailOutlinedIcon sx={{ marginRight: 1 }} />
                  <span>
                    {i18n.resolvedLanguage === "vi"
                      ? contacts[0]?.vi?.email
                      : contacts[0]?.jp?.email}
                  </span>
                </Box>
              </Link>
            </Grid>
          </Grid>
          {/* Footer Bottom Text */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <hr />
            <Typography sx={{ textAlign: "center" }}>
              {t("contactFooter.titleBottom.company")} &copy;
              {new Date().getFullYear()}{" "}
              {t("contactFooter.titleBottom.reserved")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

/**
 * LinkItem component renders individual link items with hover effects.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {IndexProps} props.item - An object containing link data with fields for title and link.
 *
 * @returns {JSX.Element} The rendered link item.
 */
const LinkItem = ({ item }: { item: IndexProps }): JSX.Element => {
  // State to handle hover effect
  const [hover, setHover] = useState<boolean>(false);

  // Navigation hook for redirecting to the link
  const navigate = useNavigate();

  return (
    <Grid
      display="flex"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      alignItems="center"
      gap={2}
      onClick={() => navigate(item.link)}
      sx={{ cursor: "pointer" }}
    >
      <Box
        sx={{
          background: "white",
          borderRadius: 100,
          transition: "all 0.5s ease",
        }}
        height={`${hover ? "2px" : "5px"}`}
        width={`${hover ? "20px" : "5px"}`}
      ></Box>
      <Typography color="white">{item.title}</Typography>
    </Grid>
  );
};

export default ContactFooter;
