import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Grid, Tab } from "@mui/material";
import ImageContent from "components/home/common/ImageContent";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import EmployeePolicy from "./EmployeePolicy";
import RecruitChildren from "./RecruitChildren";
import RecruitmentProcess from "./RecruitmentProcess";
import RegistrationForm from "./RegistrationForm";
import { Helmet } from "react-helmet-async";

/**
 * Recruit: A component that displays different sections of the recruitment process,
 * including Employee Policy, Recruitment Process, Recruit Children, and Registration Form.
 * It uses a tabbed interface to switch between different sections.
 *
 * @component
 * @returns {JSX.Element} The rendered component with recruitment sections.
 */
const Recruit = (): JSX.Element => {
  // Provides translation functions for the 'recruit' namespace
  const { t } = useTranslation("recruit");

  // State to manage the current tab value
  const [value, setValue] = useState<string>("1");

  /**
   * handleChange: Handles the change event when a tab is clicked, updating the current tab value.
   *
   * @param {React.SyntheticEvent} event - The event object.
   * @param {string} newValue - The new value of the selected tab.
   */
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Helmet>
        <title>{t("titleHeader")}</title>
      </Helmet>
      {/* Header image content */}
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
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            {/* Tab list for different sections */}
            <TabList onChange={handleChange} sx={{ width: 1 }}>
              <Tab
                sx={{
                  textTransform: "none",
                  fontSize: "20px",
                  fontWeight: "500",
                  lineHeight: "24px",
                  color: "#232323",
                  width: "35%",
                }}
                label={t("employeePolicy.titleEmployPolicy")}
                value="1"
              />
              <Tab
                sx={{
                  textTransform: "none",
                  fontSize: "20px",
                  fontWeight: "500",
                  lineHeight: "24px",
                  color: "#232323",
                  width: "25%",
                }}
                label={t("recruitmentProcess.titleRecruitmentProcess")}
                value="2"
              />
              <Tab
                sx={{
                  textTransform: "none",
                  fontSize: "20px",
                  fontWeight: "500",
                  lineHeight: "24px",
                  color: "#232323",
                  width: "20%",
                }}
                label={t("recruitChildren.titleRecruitChildren")}
                value="3"
              />
              <Tab
                sx={{
                  textTransform: "none",
                  fontSize: "20px",
                  fontWeight: "500",
                  lineHeight: "24px",
                  color: "#232323",
                  width: "20%",
                }}
                label={t("registrationForm.titleRegistrationForm")}
                value="4"
              />
            </TabList>
          </Box>
          <Box pt={7}>
            {/* Tab panels for each section */}
            <TabPanel sx={{ padding: 0 }} value="1">
              <EmployeePolicy></EmployeePolicy>
            </TabPanel>
            <TabPanel sx={{ padding: 0 }} value="2">
              <RecruitmentProcess></RecruitmentProcess>
            </TabPanel>
            <TabPanel sx={{ padding: 0 }} value="3">
              <RecruitChildren></RecruitChildren>
            </TabPanel>
            <TabPanel sx={{ padding: 0 }} value="4">
              <RegistrationForm></RegistrationForm>
            </TabPanel>
          </Box>
        </TabContext>
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
          height: 1200,
          userSelect: "none",
        }}
      ></Box>
    </>
  );
};

export default Recruit;
