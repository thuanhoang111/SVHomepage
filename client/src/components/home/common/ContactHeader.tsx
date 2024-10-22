import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { AppBar, Grid, IconButton, Link, Tooltip } from "@mui/material";
import api from "apis/api";
import { Contact } from "models/contact";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * ContactHeader component renders a fixed header bar with contact information and a language switcher.
 * It fetches contact details from an API and displays them based on the current language.
 *
 * @component
 */
const ContactHeader = () => {
  // Translation hook for multi-language support
  const { t, i18n } = useTranslation("common");

  // State to hold contact information
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Retrieve the current URL path
  const { pathname } = useLocation();

  /**
   * Fetches the contact list from the API.
   * @param {number | null} page - The page number for pagination (nullable).
   * @param {number | null} limit - The number of items per page (nullable).
   * @param {boolean | null} defaultContact - Flag to fetch default contacts (nullable).
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

  // Fetch the contact list when the component mounts
  useEffect(() => {
    getContactList(null, null, true);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "#0C5ADB",
        paddingRight: "0px !important",
        height: "35px",
      }}
    >
      <Grid width={1}>
        <Grid
          maxWidth={{ xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
          px={{ xs: 5, sm: 5, md: 8, lg: 10, xl: 20 }}
          sx={{
            height: "35px",
            marginX: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          container
        >
          {/* Display address with a link to Google Maps */}
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <Grid
              display={{
                xl: "block",
                lg: "block",
                md: "none",
                sm: "none",
                xs: "none",
              }}
              ml={-1}
            >
              <Link
                target="_blank"
                href="https://www.google.com/maps/place/Cao+%E1%BB%91c+B%C3%A1o+Tu%E1%BB%95i+Tr%E1%BA%BB/@10.799913,106.678506,15z/data=!4m5!3m4!1s0x0:0xf19e40783f62920f!8m2!3d10.7999447!4d106.6785379?hl=en"
              >
                <PlaceOutlinedIcon
                  style={{ color: "white", fontSize: "25px" }}
                />
                <span style={{ color: "white", fontSize: "12.5px" }}>
                  {i18n.resolvedLanguage === "vi"
                    ? contacts[0]?.vi?.address
                    : contacts[0]?.jp?.address}
                </span>
              </Link>
            </Grid>
            <Tooltip
              title={
                i18n.resolvedLanguage === "vi"
                  ? contacts[0]?.vi?.address
                  : contacts[0]?.jp?.address
              }
              sx={{
                display: {
                  xl: "none",
                  lg: "none",
                  md: "block",
                  sm: "block",
                  xs: "block",
                },
              }}
            >
              <IconButton
                sx={{
                  padding: 0,
                  display: {
                    xl: "none",
                    lg: "none",
                    md: "block",
                    sm: "block",
                    xs: "block",
                  },
                }}
              >
                <Link
                  target="_blank"
                  href="https://www.google.com/maps/place/Cao+%E1%BB%91c+B%C3%A1o+Tu%E1%BB%95i+Tr%E1%BA%BB/@10.799913,106.678506,15z/data=!4m5!3m4!1s0x0:0xf19e40783f62920f!8m2!3d10.7999447!4d106.6785379?hl=en"
                >
                  <PlaceOutlinedIcon
                    style={{
                      color: "white",
                      fontSize: "25px",
                    }}
                  />
                </Link>
              </IconButton>
            </Tooltip>
          </Grid>
          {/* Display phone number with a tel link */}
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <Grid
              display={{
                xl: "block",
                lg: "block",
                md: "block",
                sm: "none",
                xs: "none",
              }}
            >
              <Link
                href={`tel: ${
                  i18n.resolvedLanguage === "vi"
                    ? contacts[0]?.vi?.phone
                    : contacts[0]?.jp?.phone
                }`}
              >
                <CallOutlinedIcon
                  style={{ color: "white", fontSize: "25px" }}
                />
                <span
                  style={{ color: "white", fontSize: "12.5px", paddingLeft: 8 }}
                >
                  {i18n.resolvedLanguage === "vi"
                    ? contacts[0]?.vi?.phone
                    : contacts[0]?.jp?.phone}
                </span>
              </Link>
            </Grid>
            <Tooltip
              title={
                i18n.resolvedLanguage === "vi"
                  ? contacts[0]?.vi?.phone
                  : contacts[0]?.jp?.phone
              }
              sx={{
                display: {
                  xl: "none",
                  lg: "none",
                  md: "none",
                  sm: "block",
                  xs: "block",
                },
              }}
            >
              <IconButton
                sx={{
                  padding: 0,
                  display: {
                    xl: "none",
                    lg: "none",
                    md: "none",
                    sm: "block",
                    xs: "block",
                  },
                }}
              >
                <Link
                  href={`tel: ${
                    i18n.resolvedLanguage === "vi"
                      ? contacts[0]?.vi?.phone
                      : contacts[0]?.jp?.phone
                  }`}
                >
                  <CallOutlinedIcon
                    style={{ color: "white", fontSize: "25px" }}
                  />
                </Link>
              </IconButton>
            </Tooltip>
          </Grid>
          {/* Display email with a mailto link */}
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <Grid
              display={{
                xl: "block",
                lg: "block",
                md: "block",
                sm: "block",
                xs: "none",
              }}
            >
              <Link
                href={`mailto: ${
                  i18n.resolvedLanguage === "vi"
                    ? contacts[0]?.vi?.email
                    : contacts[0]?.jp?.email
                }`}
              >
                <EmailOutlinedIcon
                  style={{ color: "white", fontSize: "25px" }}
                />
                <span
                  style={{ color: "white", fontSize: "12.5px", paddingLeft: 8 }}
                >
                  {i18n.resolvedLanguage === "vi"
                    ? contacts[0]?.vi?.email
                    : contacts[0]?.jp?.email}
                </span>
              </Link>
            </Grid>
            <Tooltip
              title={
                i18n.resolvedLanguage === "vi"
                  ? contacts[0]?.vi?.email
                  : contacts[0]?.jp?.email
              }
              sx={{
                display: {
                  xl: "none",
                  lg: "none",
                  md: "none",
                  sm: "none",
                  xs: "block",
                },
              }}
            >
              <IconButton
                sx={{
                  padding: 0,
                  display: {
                    xl: "none",
                    lg: "none",
                    md: "none",
                    sm: "none",
                    xs: "block",
                  },
                }}
              >
                <Link
                  href={`mailto:${
                    i18n.resolvedLanguage === "vi"
                      ? contacts[0]?.vi?.email
                      : contacts[0]?.jp?.email
                  }`}
                >
                  <EmailOutlinedIcon
                    style={{ color: "white", fontSize: "25px" }}
                  />
                </Link>
              </IconButton>
            </Tooltip>
          </Grid>
          {/* Language switcher with flag icons */}
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title={t("contactHeader.language.vi")}>
              <img
                className="d-inline"
                src="/images/icon_VN.png"
                alt="VN"
                style={{ marginRight: "5px", cursor: "pointer" }}
                onClick={() => window.location.replace("/vi" + pathname)}
              />
            </Tooltip>
            <Tooltip title={t("contactHeader.language.jp")}>
              <img
                className="d-inline"
                src="/images/icon_JP.png"
                alt="JP"
                style={{ cursor: "pointer" }}
                onClick={() => window.location.replace("/jp" + pathname)}
              />
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default ContactHeader;
