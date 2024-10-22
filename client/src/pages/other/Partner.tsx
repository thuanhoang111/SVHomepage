import { Box, Button, Grid } from "@mui/material";
import { ReactComponent as TouchClickIcon } from "assets/images/TouchClick.svg";
import ImageContent from "components/home/common/ImageContent";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const StyledButton = (props) => {
  // Declare isHovered to use set hover when mouse enter or mouse leave button
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Declare function handleMouseEnter to use handle mouse enter button
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Declare function handleMouseLeave to use handle mouse leave button
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Button
      sx={{
        color: "#0944A4",
        display: "flex",
        padding: "15px 35px",
        backgroundColor: "white",
        border: "1px dashed",
        borderRadius: "60px",
        alignItems: "center",
        justifyItems: "center",
        "&:hover": {
          backgroundColor: "#0944A4",
          color: "white",
          border: "1px solid",
        },
      }}
      startIcon={<TouchClickIcon fill={isHovered ? "#fff" : "#0944A4"} />}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      href={props.href}
      target="_blank"
    >
      <b>{props.title}</b>
    </Button>
  );
};
const Partner = () => {
  // Declare t to use translation from file translation.json
  const { t } = useTranslation();

  return (
    <>
      <ImageContent title={t("partner.titleHeader")}></ImageContent>
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
          spacing={8}
          columns={{ xs: 1, sm: 1, md: 1, lg: 12, xl: 12 }}
        >
          <Grid item xs={1} sm={1} md={1} lg={8} xl={4}>
            <Box
              component="img"
              src="/images/doi_tac.png"
              alt="img_partner"
              sx={{
                width: 1,
                userSelect: "none",
              }}
            ></Box>
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={4} xl={8}>
            <Grid
              container
              columnSpacing={2}
              rowSpacing={8}
              columns={{ xl: 10, lg: 12, md: 12, sm: 12, xs: 12 }}
            >
              <Grid
                item
                xl={1}
                display={{
                  xl: "block",
                  lg: "none",
                  md: "none",
                  sm: "none",
                  xs: "none",
                }}
              ></Grid>
              <Grid item xl={4} lg={12} md={6} sm={12} xs={12}>
                <StyledButton
                  href="https://www.mard.gov.vn/"
                  title={t("partner.titleAgricultural")}
                />
              </Grid>
              <Grid item xl={4} lg={12} md={6} sm={12} xs={12}>
                <StyledButton
                  href="https://vca.org.vn/"
                  title={t("partner.titleCooperative")}
                />
              </Grid>
              <Grid
                item
                md={3}
                xl={3}
                display={{
                  xl: "block",
                  lg: "none",
                  md: "block",
                  sm: "none",
                  xs: "none",
                }}
              ></Grid>
              <Grid item xl={4} lg={12} md={6} sm={12} xs={12}>
                <StyledButton
                  href="https://www.sorimachi.co.jp/"
                  title={t("partner.titleHightech")}
                />
              </Grid>
              <Grid
                item
                md={3}
                xl={3}
                display={{
                  xl: "block",
                  lg: "none",
                  md: "block",
                  sm: "none",
                  xs: "none",
                }}
              ></Grid>
              <Grid
                item
                xl={1}
                display={{
                  xl: "block",
                  lg: "none",
                  md: "none",
                  sm: "none",
                  xs: "none",
                }}
              ></Grid>
              <Grid item xl={4} lg={12} md={6} sm={12} xs={12}>
                <StyledButton
                  href="https://www.s-giken.co.jp/"
                  title={t("partner.titleGiken")}
                />
              </Grid>
              <Grid item xl={4} lg={12} md={6} sm={12} xs={12}>
                <StyledButton
                  href="https://sorimachi-keiei.co.jp/"
                  title={t("partner.titleKeiei")}
                />
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
          height: 500,
          userSelect: "none",
        }}
      ></Box>
    </>
  );
};
export default Partner;
