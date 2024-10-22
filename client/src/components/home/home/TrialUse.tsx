import { Box, Grid, Typography } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import RegisterButton from "../button/RegisterButton";

/**
 * TrialUse: A component to display information about trial usage with images, text, and action buttons.
 *
 * This component presents a section with an image, a title, some content, a list of features or benefits, and action buttons.
 * The layout is divided into two main sections: one for the image and the other for text and features.
 *
 * @component
 * @returns {JSX.Element} The rendered TrialUse component.
 */
const TrialUse = (): JSX.Element => {
  // Hook for translation to handle internationalization
  const { t } = useTranslation("home");

  // Define the interface for trial use items
  interface IndexProps {
    id: number;
    title: string;
    path: string;
    content: string;
  }

  return (
    <>
      {/* Main container for the trial use section */}
      <Grid
        maxWidth={{ xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
        sx={{
          boxShadow: 0,
          height: "auto",
          marginX: "auto",
        }}
        px={{ xs: 5, sm: 5, md: 8, lg: 10, xl: 20 }}
        my={6}
        mt={12}
      >
        <Grid
          container
          columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
          spacing={5}
        >
          {/* Section for the image */}
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <Box
              component="img"
              src={t("trialUse.image")}
              alt="homepage_register"
              width={1}
            ></Box>
          </Grid>
          {/* Section for text and features */}
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
            {/* Title */}
            <Typography
              fontSize={40}
              fontWeight={800}
              sx={{ color: "#ff1506" }}
              fontFamily="'Philosopher', sans-serif"
            >
              {t("trialUse.title")}
            </Typography>
            <Box
              width={1}
              component="img"
              src="/images/line.jpg"
              alt="line"
            ></Box>
            {/* Content */}
            <Typography variant="subtitle1">{t("trialUse.content")}</Typography>
            {/* Features/Benefits list */}
            <Grid display="flex" flexDirection="column" gap={1}>
              {t<string, IndexProps[]>("trialUse.introduce", {
                returnObjects: true,
              }).map((item, index) => (
                <Box
                  key={item.content + index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Box display="flex" alignItems="center">
                    {/* Icon for each feature */}
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 11.8623V12.7823C21.9988 14.9388 21.3005 17.037 20.0093 18.7642C18.7182 20.4913 16.9033 21.7548 14.8354 22.3662C12.7674 22.9777 10.5573 22.9042 8.53447 22.1569C6.51168 21.4096 4.78465 20.0284 3.61096 18.2194C2.43727 16.4104 1.87979 14.2704 2.02168 12.1186C2.16356 9.9669 2.99721 7.91866 4.39828 6.27941C5.79935 4.64015 7.69279 3.49772 9.79619 3.02248C11.8996 2.54724 14.1003 2.76467 16.07 3.64234"
                        stroke="#0C5ADB"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 4.78223L12 14.7922L9 11.7922"
                        stroke="#0C5ADB"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#232323" }}
                    fontWeight={400}
                    fontSize={16}
                    lineHeight="30px"
                    textAlign="justify"
                  >
                    {item.content}
                  </Typography>
                </Box>
              ))}
            </Grid>
            {/* Additional information */}
            <Typography
              className="font-inter"
              fontSize={20}
              fontStyle="italic"
              paddingY={2}
              fontWeight={400}
              sx={{ color: "#0C5ADB" }}
            >
              <Trans
                i18nKey={t("trialUse.returnTitle")}
                components={{
                  bold: (
                    <span style={{ fontWeight: "bold", fontStyle: "normal" }} />
                  ),
                }}
              />
            </Typography>
            {/* Action buttons */}
            <Grid
              display="flex"
              width={1}
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              gap={1}
            >
              {t<string, IndexProps[]>("trialUse.button", {
                returnObjects: true,
              }).map((item, index) => (
                <RegisterButton
                  key={item.id + index}
                  title={item.title}
                  path={item.path}
                  color="#0C5ADB"
                  target="_blank"
                ></RegisterButton>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TrialUse;
