import { Box, Button, Grid, Stack } from "@mui/material";
import { ReactComponent as TouchClickIcon } from "assets/images/TouchClick.svg";
import ImageContent from "components/home/common/ImageContent";
import TitleIcon from "components/home/title/TitleIcon";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const StyledButton = (props) => {
  // Declare isHovered1 to use set hover when mouse enter or mouse leave button
  const [isHovered1, setIsHovered1] = useState<boolean>(false);

  // Declare isHovered3 to use set hover when mouse enter or mouse leave button
  const [isHovered2, setIsHovered2] = useState<boolean>(false);

  // Declare function handleMouseEnter1 to use handle when mouse enter
  const handleMouseEnter1 = () => {
    setIsHovered1(true);
  };

  // Declare function handleMouseLeave1 to use handle when mouse leave
  const handleMouseLeave1 = () => {
    setIsHovered1(false);
  };

  // Declare function handleMouseEnter2 to use handle when mouse enter
  const handleMouseEnter2 = () => {
    setIsHovered2(true);
  };

  // Declare function handleMouseLeave2 to use handle when mouse leave
  const handleMouseLeave2 = () => {
    setIsHovered2(false);
  };

  return (
    <>
      <Grid
        mt={0.5}
        container
        columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
        rowSpacing={5}
        columnSpacing={3}
      >
        <Grid
          item
          xs={1}
          sm={1}
          md={1}
          lg={1}
          xl={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box
            component="img"
            src={props.image1}
            sx={{
              width: "auto",
              height: "60px",
              objectFit: "cover",
            }}
            mb={0.5}
          ></Box>
          <Button
            sx={{
              color: "#0BA31A",
              display: "flex",
              padding: "15px",
              backgroundColor: "white",
              border: "1px dashed",
              borderRadius: "60px",
              width: "100%",
              "&:hover": {
                backgroundColor: "#0BA31A",
                color: "white",
                border: "1px solid",
              },
            }}
            startIcon={
              <TouchClickIcon fill={isHovered1 ? "#fff" : "#0BA31A"} />
            }
            onMouseEnter={handleMouseEnter1}
            onMouseLeave={handleMouseLeave1}
            href={props.href1}
            target="_blank"
            rel="noopener noreferrer"
          >
            <b>{props.title1}</b>
          </Button>
          <Box component="img" src={props.qRCode1} alt="QR Code" mt={3}></Box>
        </Grid>
        <Grid
          item
          xs={1}
          sm={1}
          md={1}
          lg={1}
          xl={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box
            component="img"
            src={props.image2}
            sx={{
              width: "auto",
              height: "60px",
              objectFit: "cover",
            }}
            mb={0.5}
          ></Box>
          <Button
            sx={{
              color: "#0944A4",
              display: "flex",
              padding: "15px",
              backgroundColor: "white",
              border: "1px dashed",
              borderRadius: "60px",
              width: "100%",
              "&:hover": {
                backgroundColor: "#0944A4",
                color: "white",
                border: "1px solid",
              },
            }}
            startIcon={
              <TouchClickIcon fill={isHovered2 ? "#fff" : "#0944A4"} />
            }
            onMouseEnter={handleMouseEnter2}
            onMouseLeave={handleMouseLeave2}
            href={props.href2}
            target="_blank"
            rel="noopener noreferrer"
          >
            <b>{props.title2}</b>
          </Button>
          <Box component="img" src={props.qRCode2} alt="QR Code" mt={3}></Box>
        </Grid>
      </Grid>
    </>
  );
};

const Register = () => {
  // Declare t to use translation from file translation.json
  const { t } = useTranslation();

  return (
    <>
      <ImageContent title={t("register.titleHeader")} />
      <Grid
        maxWidth={{ xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
        sx={{
          boxShadow: 0,
          height: "auto",
          marginX: "auto",
          userSelect: "none",
        }}
        px={{ xs: 5, sm: 5, md: 8, lg: 10, xl: 20 }}
        my={10}
      >
        <Grid
          container
          direction="row-reverse"
          columns={{ xs: 1, sm: 1, md: 1, lg: 12, xl: 12 }}
          spacing={8}
        >
          <Grid
            item
            xs={1}
            sm={1}
            md={1}
            lg={4}
            xl={4}
            justifyContent="center"
            alignItems="center"
            display="flex"
          >
            <Box
              component="img"
              src="/images/dang_ky_su_dung.png"
              alt="Background"
              sx={{
                width: 1,
                objectFit: "cover",
                userSelect: "none",
              }}
            ></Box>
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={8} xl={8}>
            <Stack spacing={10}>
              <Grid>
                <TitleIcon
                  title={t("register.agricultural.title")}
                  fontSize="30px"
                  fontWeight="400"
                  lineHeight="36px"
                ></TitleIcon>
                <StyledButton
                  href1={t("register.agricultural.diary.link")}
                  href2={t("register.agricultural.accounting.link")}
                  image1="/images/logo_faceFarm.png"
                  image2="/images/logo_waca.png"
                  title1={t("register.agricultural.diary.title")}
                  title2={t("register.agricultural.accounting.title")}
                  qRCode1="/images/QRCode_FF.png"
                  qRCode2="/images/QRCode_WACA.png"
                />
              </Grid>
              {/* <Grid>
                <TitleIcon
                  title="Đăng ký sử dụng dịch vụ SMB"
                  fontSize="30px"
                  fontWeight="400"
                  lineHeight="36px"
                ></TitleIcon>
                <StyledButton
                  href1="/"
                  href2="/"
                  image1={logo_salary_calculation}
                  image2={logo_sell_products}
                  title1="Phần mềm Tính lương"
                  title2="Phần mềm Bán hàng"
                />
              </Grid>
              <Grid>
                <TitleIcon
                  title="Đăng ký sử dụng dịch vụ Bán lẻ"
                  fontSize="30px"
                  fontWeight="400"
                  lineHeight="36px"
                ></TitleIcon>
                <StyledButton
                  href1="/"
                  href2="/"
                  image1={logo_salary_calculation}
                  image2={logo_sell_products}
                  title1="Quản lý chuỗi cửa hàng"
                  title2="Cửa hàng số"
                />
              </Grid> */}
            </Stack>
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

export default Register;
