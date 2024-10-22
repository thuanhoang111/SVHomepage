import { Box, Grid, Typography } from "@mui/material";
import TitleIcon from "components/home/title/TitleIcon";
import { useTranslation } from "react-i18next";

/**
 * RecruitmentProcess: A component that displays the recruitment process details.
 * It shows a list of processes with associated images, titles, descriptions, and additional content.
 *
 * @component
 * @returns {JSX.Element} The rendered recruitment process details.
 */
const RecruitmentProcess = (): JSX.Element => {
  const { t } = useTranslation("recruit");

  // Interface for process items with title, content, additional content array, and image properties
  interface IndexProps {
    title: string;
    content: string;
    contentArr: any;
    image: string;
  }

  return (
    <>
      <Box display="flex" flexDirection="column" gap={4}>
        {/* Maps through the recruitment process items and displays them in alternating row directions */}
        {t<string, IndexProps[]>("recruitmentProcess.process", {
          returnObjects: true,
        }).map((item, index) => (
          <Grid
            key={item.title + index}
            direction={index % 2 === 0 ? "row-reverse" : "row"}
            container
            columns={{ xs: 1, sm: 1, md: 7, lg: 9, xl: 9 }}
            spacing={8}
          >
            {/* Image section of the process */}
            <Grid item xs={1} sm={1} md={3} lg={4} xl={4}>
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                sx={{
                  width: 1,
                }}
              ></Box>
            </Grid>
            {/* Title and content section of the process */}
            <Grid item xs={1} sm={1} md={4} lg={5} xl={5}>
              <TitleIcon
                title={item.title}
                fontSize="30px"
                fontWeight="600"
                lineHeight="36px"
              ></TitleIcon>
              <Typography variant="subtitle1" textAlign="justify" mt={1}>
                {item?.content}
              </Typography>
              {/* Additional content list */}
              <Box display="flex" flexDirection="column" gap={1.5}>
                {item.contentArr &&
                  item.contentArr.map((text: any, textIndex: number) => (
                    <Grid
                      key={text.text + textIndex}
                      display="flex"
                      flexDirection="row"
                      gap={1}
                      alignItems="center"
                    >
                      <Box
                        width={40}
                        height={40}
                        minWidth={40}
                        borderRadius="100px"
                        sx={{
                          background: "#E7EFFC",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {/* Checkmark icon */}
                        <svg
                          width="16"
                          height="12"
                          viewBox="0 0 16 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.6673 1L5.50065 10.1667L1.33398 6"
                            stroke="#0C5ADB"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Box>
                      <Typography variant="subtitle1" textAlign="justify">
                        {text.text}
                      </Typography>
                    </Grid>
                  ))}
              </Box>
            </Grid>
          </Grid>
        ))}
      </Box>
    </>
  );
};

export default RecruitmentProcess;
