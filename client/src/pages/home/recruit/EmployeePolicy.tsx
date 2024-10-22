import { Box, Grid, Typography } from "@mui/material";
import TitleIcon from "components/home/title/TitleIcon";
import { useTranslation } from "react-i18next";

/**
 * EmployeePolicy: A component that displays the employee policy details in a visually appealing format.
 * The policies are fetched using `react-i18next` for translations and are displayed in alternating row directions.
 *
 * @component
 * @returns {JSX.Element} The rendered component with employee policy details.
 */
const EmployeePolicy = (): JSX.Element => {
  // Provides translation functions for the 'recruit' namespace
  const { t } = useTranslation("recruit");

  // Interface for the props used in the mapping
  interface IndexProps {
    title: string;
    content: string;
    contentArr: any;
    image: string;
  }

  return (
    <>
      <Box display="flex" flexDirection="column" gap={4}>
        {t<string, IndexProps[]>("employeePolicy.policy", {
          returnObjects: true,
        }).map((item, index) => (
          <Grid
            key={item.title + index}
            direction={index % 2 === 0 ? "row-reverse" : "row"}
            container
            columns={{ xs: 1, sm: 1, md: 7, lg: 9, xl: 9 }}
            spacing={8}
          >
            {/* Image section */}
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
            {/* Content section */}
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
              <Box display="flex" flexDirection="column" gap={1.5}>
                {item.contentArr.map((text: any, textIndex: number) => (
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

export default EmployeePolicy;
