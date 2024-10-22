import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  styled,
  Typography
} from "@mui/material";
import ImageContent from "components/home/common/ImageContent";
import React from "react";
import { useTranslation } from "react-i18next";

const ButtonCustome = styled(Button)({
  textTransform: "none",
});

const FrequentlyQuestions = () => {
  // Declare t to use translation from file translation.json
  const { t } = useTranslation();

  // Interface IndexProps declare data type when map data from file translation.json
  interface IndexProps {
    id: number;
    question: string;
    answer: string;
    title: string;
    color: string;
    questions: any;
  }

  // Declare refs to use set root element when click button title scroll view to root
  const refs = t<string, IndexProps[]>(
    "frequentlyQuestions.frequentlyQuestions",
    { returnObjects: true }
  ).reduce((acc, value) => {
    acc[value.id] = React.createRef();
    return acc;
  }, {});

  // Declare expanded to use set display or hidden details question
  const [expanded, setExpanded] = React.useState<string | false>(false);

  // Declare function handleChange to use handle click diplay or hidden details question
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  // Declare function handleClickToElement to use handle when click button title scroll view to
  const handleClickToElement = (id) => {
    window.scrollTo(0, refs[id].current.offsetTop - 100);
  };

  return (
    <>
      <ImageContent title={t("frequentlyQuestions.titleHeader")}></ImageContent>
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
        <Grid
          container
          columns={{ xs: 1, sm: 1, md: 2, lg: 4, xl: 4 }}
          spacing={2}
        >
          {/* {frequenlyQuestionsData &&
            frequenlyQuestionsData.map((item) => (
              <Grid key={item.id} item xs={1} sm={1} md={1} lg={1} xl={1}>
                <ButtonCustome
                  sx={{
                    border: `1px dashed ${item.color}`,
                    paddingX: 4,
                    borderRadius: 100,
                    width: 1,
                    height: 60,
                  }}
                  onClick={() => handleClickToElement(item.id)}
                >
                  <svg
                    width="29"
                    height="36"
                    viewBox="0 0 29 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.9806 17.511C26.1806 15.611 23.7806 14.311 21.2806 13.811C20.1806 13.511 19.0806 13.311 17.9806 13.211C20.7806 9.91103 20.2806 4.91103 16.9806 2.11103C13.6806 -0.688973 8.68064 -0.188973 5.88064 3.11103C3.08064 6.41103 3.58064 11.411 6.88064 14.211C7.48064 14.711 8.08064 15.111 8.68064 15.311V17.511L7.08064 16.011C5.68063 14.611 3.38064 14.611 1.88064 16.011C0.480635 17.411 0.380635 19.611 1.78063 21.011L6.38064 26.411C6.58064 27.811 7.08064 29.111 7.78063 30.311C8.28063 31.211 8.98064 32.111 9.68064 32.811V34.711C9.68064 35.311 10.0806 35.711 10.6806 35.711H24.2806C24.7806 35.711 25.2806 35.211 25.2806 34.711V32.111C27.1806 29.811 28.1806 26.911 28.1806 24.011V18.211C28.2806 17.811 28.1806 17.611 27.9806 17.511ZM5.98063 8.11103C5.98063 4.81103 8.68063 2.21103 11.9806 2.31103C15.2806 2.31103 17.8806 5.01103 17.7806 8.31103C17.7806 10.111 16.9806 11.711 15.5806 12.811V7.81103C15.5296 6.9444 15.1489 6.13013 14.5168 5.53514C13.8846 4.94016 13.0488 4.60952 12.1806 4.61103C10.3806 4.51103 8.78063 6.01103 8.78063 7.81103V13.011C7.08064 12.011 6.08063 10.111 5.98063 8.11103ZM26.2806 23.911C26.3806 26.511 25.4806 29.011 23.7806 31.011C23.5806 31.211 23.3806 31.411 23.3806 31.711V33.811H11.7806V32.411C11.7806 32.111 11.5806 31.811 11.3806 31.611C10.6806 31.011 10.0806 30.311 9.58064 29.411C8.98063 28.411 8.58064 27.211 8.38064 26.011C8.38064 25.811 8.28064 25.611 8.18064 25.411L3.38064 19.711C3.08064 19.411 2.88064 19.011 2.88064 18.511C2.88064 18.111 3.08064 17.611 3.38064 17.311C4.08064 16.711 5.08064 16.711 5.78063 17.311L8.68064 20.211V23.211L10.5806 22.211V7.81103C10.6806 7.11103 11.2806 6.51103 12.0806 6.61103C12.7806 6.61103 13.4806 7.11103 13.4806 7.81103V19.311L15.4806 19.711V15.111C15.5806 15.011 15.6806 15.011 15.7806 14.911C16.4806 14.911 17.1806 15.011 17.8806 15.111V20.211L19.4806 20.511V15.311L20.6806 15.611C21.1806 15.711 21.6806 15.911 22.1806 16.111V21.111L23.7806 21.411V16.811C24.6806 17.211 25.4806 17.811 26.1806 18.511L26.2806 23.911Z"
                      fill={item.color}
                    />
                  </svg>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color={item.color}
                    pl={1}
                  >
                    {item.content}
                  </Typography>
                </ButtonCustome>
              </Grid>
            ))} */}
          <Grid item xs={1} sm={1} md={2} lg={4} xl={4}>
            <Grid
              container
              direction="row-reverse"
              columns={{ xs: 1, sm: 1, md: 1, lg: 12, xl: 12 }}
              spacing={8}
            >
              <Grid item xs={1} sm={1} md={1} lg={4} xl={4}>
                <Box
                  component="img"
                  src="/images/question.png"
                  alt="Background"
                  sx={{
                    width: 1,
                    objectFit: "cover",
                    height: "auto",
                    userSelect: "none"
                  }}
                ></Box>
              </Grid>
              <Grid item xs={1} sm={1} md={2} lg={8} xl={8}>
                <Grid container direction="column" spacing={5}>
                  {t<string, IndexProps[]>(
                    "frequentlyQuestions.frequentlyQuestions",
                    { returnObjects: true }
                  ).map((item, index) => (
                    <Grid item key={item.id} ref={refs[item.id]}>
                      <Typography variant="h4" fontWeight="bold">
                        <span
                          style={{
                            color: `${item.color}`,
                            fontSize: "50px",
                            fontWeight: "600",
                          }}
                        >
                          Q&A
                        </span>{" "}
                        {item.title}
                      </Typography>
                      <Grid container direction="column" spacing={{}}>
                        {item.questions.map((itemChild, indexChild) => (
                          <Grid key={itemChild.childId} item>
                            <Accordion
                              expanded={
                                expanded ===
                                `panel${item.id}${itemChild.childId}`
                              }
                              onChange={handleChange(
                                `panel${item.id}${itemChild.childId}`
                              )}
                              sx={{
                                boxShadow: 0,
                                backgroundColor: "transparent",
                              }}
                            >
                              <AccordionSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography
                                  variant="h6"
                                  fontStyle="italic"
                                  fontWeight="bold"
                                >
                                  <span
                                    style={{
                                      color: `${item.color}`,
                                      fontSize: "32px",
                                      fontWeight: "400",
                                    }}
                                  >
                                    Q.
                                  </span>{" "}
                                  {itemChild.question}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography px={4} variant="subtitle1">
                                  <span
                                    style={{
                                      color: "blue",
                                      fontSize: "28px",
                                      fontWeight: "400",
                                    }}
                                  >
                                    A.
                                  </span>{" "}
                                  {itemChild.answer}
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box
        component="img"
        src="/images/Background_Message.png"
        alt="Background"
        sx={{
          width: 1,
          zIndex: -10,
          position: "absolute",
          top: 315,
          height: "800px",
          userSelect: "none"
        }}
      ></Box>
      {/* <CardMedia
        component="img"
        src={BackgroundQuestions}
        alt="Background"
        sx={{
          width: 1,
          zIndex: -10,
          position: "absolute",
          top: 1300,
          height: "auto",
        }}
      ></CardMedia> */}
    </>
  );
};

export default FrequentlyQuestions;
