import { Box, Grid, Link, Typography } from "@mui/material";
import api from "apis/api";
import TitleIcon from "components/home/title/TitleIcon";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

/**
 * RecruitChildren: A component that displays the recruitment details, including descriptions, requirements, regimes, skills, and contact information.
 * It fetches contact information from an API and displays dynamic content based on the selected language.
 *
 * @component
 * @returns {JSX.Element} The rendered recruitment details.
 */
const RecruitChildren = (): JSX.Element => {
  const { t, i18n } = useTranslation("recruit");

  // State variable to store the list of contacts
  const [contacts, setContacts] = useState<any[]>([]);

  // Interface for content items with title and content properties
  interface IndexProps {
    title: string;
    content: string;
  }

  /**
   * Fetches the contact list from the API and updates the state.
   * Handles errors by displaying an error message using `toast`.
   *
   * @param {number | null} page - The page number for pagination.
   * @param {number | null} limit - The limit of items per page.
   * @param {boolean | null} defaultContact - Flag to indicate if default contacts should be fetched.
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

  // Fetches the contact list when the component mounts
  useEffect(() => {
    getContactList(null, null, true);
  }, []);

  return (
    <>
      <Grid display="flex" flexDirection="column" gap={8}>
        <Box
          component="img"
          src="/images/recruit.png"
          alt="recruit"
          sx={{
            width: 1,
          }}
        ></Box>
        <Grid
          item
          xs={1}
          sm={1}
          md={1}
          lg={6}
          xl={5}
          display="flex"
          flexDirection="column"
          gap={4}
        >
          {/* Section for recruitment description */}
          <Box display="flex" flexDirection="column" gap={1}>
            <TitleIcon
              title={t("recruitChildren.description.title")}
              fontSize="30px"
              fontWeight="600"
              lineHeight="36px"
            ></TitleIcon>
            <Typography textAlign="justify" variant="subtitle1">
              {t("recruitChildren.description.content")}
            </Typography>
          </Box>
          {/* Section for recruitment requirements */}
          <Box display="flex" flexDirection="column" gap={1}>
            <TitleIcon
              title={t("recruitChildren.require.title")}
              fontSize="30px"
              fontWeight="600"
              lineHeight="36px"
            ></TitleIcon>
            <Typography textAlign="justify" variant="subtitle1">
              {t("recruitChildren.require.content")}
            </Typography>
            <Grid
              container
              columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
            >
              {t<string, IndexProps[]>("recruitChildren.require.contentArr", {
                returnObjects: true,
              }).map((item, index) => (
                <Grid
                  item
                  xl={4}
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  key={item.content + index}
                  display="flex"
                  justifyContent="center"
                  borderRight={
                    index !== 2 ? "solid 1px rgba(0, 0, 0, 0.2)" : ""
                  }
                >
                  <Box width={0.9}>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "#0C5ADB" }}
                      fontWeight={500}
                    >
                      {item.title}
                    </Typography>
                    <Typography pl={1} variant="subtitle1">
                      {item.content}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Typography
              variant="subtitle1"
              sx={{ color: "#0C5ADB" }}
              fontStyle="italic"
            >
              {t("recruitChildren.require.note")}
            </Typography>
          </Box>
          {/* Section for recruitment regimes */}
          <Box display="flex" flexDirection="column" gap={1}>
            <TitleIcon
              title={t("recruitChildren.regime.title")}
              fontSize="30px"
              fontWeight="600"
              lineHeight="36px"
            ></TitleIcon>
            <Grid
              container
              columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
            >
              {t<string, IndexProps[]>("recruitChildren.regime.contentArr", {
                returnObjects: true,
              }).map((item, index) => (
                <Grid
                  item
                  xl={6}
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  key={item.content + index}
                  display="flex"
                  justifyContent="center"
                  borderRight={
                    index !== 1 ? "solid 1px rgba(0, 0, 0, 0.2)" : ""
                  }
                >
                  <Box width={0.9}>
                    <Typography variant="subtitle1">{item.content}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* Section for required skills */}
          <Box display="flex" flexDirection="column" gap={1}>
            <TitleIcon
              title={t("recruitChildren.skill.title")}
              fontSize="30px"
              fontWeight="600"
              lineHeight="36px"
            ></TitleIcon>
            <Typography textAlign="justify" variant="subtitle1">
              {t("recruitChildren.skill.content")}
            </Typography>
          </Box>
          {/* Section for contact information */}
          <Box display="flex" flexDirection="column" gap={1}>
            <TitleIcon
              title={t("recruitChildren.contact.title")}
              fontSize="30px"
              fontWeight="600"
              lineHeight="36px"
            ></TitleIcon>
            <Typography textAlign="justify" variant="subtitle1">
              <span>{t("recruitChildren.contact.content.phone")}</span>
              <Link
                href={`tel: ${
                  i18n.resolvedLanguage === "vi"
                    ? contacts[0]?.vi?.phone
                    : contacts[0]?.jp?.phone
                }`}
                style={{ textDecoration: "none" }}
              >
                {i18n.resolvedLanguage === "vi"
                  ? contacts[0]?.vi?.phone
                  : contacts[0]?.jp?.phone}
              </Link>
              <br />
              <span>{t("recruitChildren.contact.content.email")}</span>
              <Link
                href={`mailto: ${
                  i18n.resolvedLanguage === "vi"
                    ? contacts[0]?.vi?.email
                    : contacts[0]?.jp?.email
                }`}
                style={{ textDecoration: "none" }}
              >
                {i18n.resolvedLanguage === "vi"
                  ? contacts[0]?.vi?.email
                  : contacts[0]?.jp?.email}
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default RecruitChildren;
