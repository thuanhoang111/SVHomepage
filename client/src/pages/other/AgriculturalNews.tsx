import { Pagination } from "@mui/lab";
import { Box, Button, Grid, Typography } from "@mui/material";
import ImageContent from "components/home/common/ImageContent";
import usePagination from "hooks/usePagination";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const AgriculturalNews = () => {
  // Declare t to use translation from file translation.json
  const { t } = useTranslation();

  // Interface IndexProps declare data type when map data from file translation.json
  interface IndexProps {
    id: number;
    date: string;
    title: string;
    link: string;
  }

  // Declare page to use set current page display
  const [page, setPage] = useState<number>(1);

  // Declare PER_PAGE to use set amount item display every page
  const PER_PAGE = 4;

  // Declare count to use calculate total page
  const count = Math.ceil(
    t<string, IndexProps[]>("agriculturalNews.agriculturalNewsData", {
      returnObjects: true,
    }).length / PER_PAGE
  );

  // Declare _DATA to use set item for current page
  const _DATA = usePagination(
    t<string, IndexProps[]>("agriculturalNews.agriculturalNewsData", {
      returnObjects: true,
    }),
    PER_PAGE
  );

  // Declare function handleChange to use hanlde when click change page display
  const handleChange = (e, p: number) => {
    setPage(p);
    _DATA.jump(p);
  };
  return (
    <>
      <ImageContent title={t("agriculturalNews.titleHeader")}></ImageContent>
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
        <Grid border="10px solid rgba(231, 239, 252, 0.5)" p={2}>
          <Grid
            display="flex"
            flexDirection="column"
            gap={3}
            height={{ xl: 680, lg: 710 }}
          >
            {_DATA &&
              _DATA.currentData().map((item) => (
                <Grid
                  key={item.id}
                  item
                  boxShadow={3}
                  borderRadius={2}
                  sx={{ background: "white" }}
                  container
                  columns={{ xl: 12, lg: 12, md: 1, sm: 1, xs: 1 }}
                  alignItems="center"
                  paddingY={{ xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
                  paddingX={{ xl: 6, lg: 6, md: 6, sm: 6, xs: 1 }}
                  rowSpacing={1}
                >
                  <Grid
                    display="flex"
                    alignItems="center"
                    item
                    xl={2}
                    lg={2}
                    md={1}
                    sm={1}
                    xs={1}
                  >
                    <span style={{ color: "#c0c0c0" }}>
                      <svg
                        style={{ width: "30px", height: "30px" }}
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
                    <Typography pl={1} variant="subtitle1" fontWeight="bold">
                      {item.date}
                    </Typography>
                  </Grid>
                  <Grid item xl={8} lg={8} md={1} sm={1} xs={1}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      fontWeight="bold"
                      textTransform="uppercase"
                      // color="#33B2FF"
                      width={1}
                    >
                      {item.title}
                    </Typography>
                    <Typography fontWeight="bold" textOverflow="ellipsis">
                      {t("agriculturalNews.titleSource")}
                      <span
                        style={{
                          fontStyle: "italic",
                          fontWeight: "initial",
                        }}
                      >
                        {item.link}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xl={2} lg={2} md={1} sm={1} xs={1}>
                    <Button
                      sx={{
                        marginLeft: { xl: 5, lg: 5, md: 5, sm: 5, xs: 0 },
                        fontWeight: "bold",
                      }}
                      href={item.link}
                      target="_blank"
                      variant="outlined"
                      color="success"
                    >
                      {t("agriculturalNews.titleButton")}
                    </Button>
                  </Grid>
                </Grid>
              ))}
          </Grid>
          <Grid container mt={2}>
            <Pagination
              sx={{ marginX: "auto" }}
              count={count}
              size="large"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
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
          height: 1000,
          userSelect: "none",
        }}
      ></Box>
    </>
  );
};

export default AgriculturalNews;
