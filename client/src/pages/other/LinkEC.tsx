import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import ImageContent from "components/home/common/ImageContent";
import TitleIcon from "components/home/title/TitleIcon";
import i18n from "i18nextConf";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LinkEC = () => {
  // Declare t to use translation from file translation.json
  const { t } = useTranslation();

  const [linkEcs, setLinkEcs] = useState<any[]>([]);

  // Declare function fetchLinkEc to use call api get all document from linkec collection of database
  const fetchLinkEc = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL_API}/linkEcs/true`
      );
      setLinkEcs(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLinkEc();
  }, []);

  return (
    <>
      <ImageContent title={t("linkEC.titleHeader")}></ImageContent>
      <Grid
        maxWidth={{ xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
        sx={{
          boxShadow: 0,
          height: "auto",
          marginX: "auto",
        }}
        px={{ xs: 5, sm: 5, md: 8, lg: 10, xl: 20 }}
        my={6}
        container
        spacing={4}
      >
        {linkEcs.length > 0 &&
          linkEcs.map((linkEc, index) => (
            <Grid item key={linkEc.Id} container>
              <Grid
                item
                container
                columns={{ xs: 1, sm: 1, md: 1, lg: 9, xl: 9 }}
                spacing={4}
              >
                <Grid item xs={1} sm={1} md={1} lg={4} xl={4}>
                  <Box
                    component="img"
                    src={linkEc.image}
                    alt={
                      i18n.resolvedLanguage === "vi"
                        ? linkEc.vi.name
                        : linkEc.jp.name
                    }
                    width={1}
                    sx={{ objectFit: "cover", userSelect: "none" }}
                  ></Box>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={5} xl={5}>
                  <TitleIcon
                    title={
                      i18n.resolvedLanguage === "vi"
                        ? linkEc.vi.name
                        : linkEc.jp.name
                    }
                    fontSize="38px"
                    fontWeight="bold"
                    lineHeight="46px"
                  ></TitleIcon>
                  <Grid
                    container
                    columns={{ xl: 10, lg: 10, md: 10, sm: 1, xs: 1 }}
                    pt={2.5}
                    rowSpacing={0.5}
                  >
                    <Grid item xs={1} sm={1} md={2} lg={2} xl={2}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {t("linkEC.address")}
                      </Typography>
                    </Grid>
                    <Grid item xs={1} sm={1} md={8} lg={8} xl={8}>
                      <Typography
                        variant="subtitle1"
                        ml={{ xs: 3, sm: 3, md: 0, lg: 0, xl: 0 }}
                      >
                        {i18n.resolvedLanguage === "vi"
                          ? linkEc.vi.address
                          : linkEc.jp.address}
                      </Typography>
                    </Grid>
                    <Grid item xs={1} sm={1} md={2} lg={2} xl={2}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {t("linkEC.phone")}
                      </Typography>
                    </Grid>
                    <Grid item xs={1} sm={1} md={8} lg={8} xl={8}>
                      <Typography
                        variant="subtitle1"
                        ml={{ xs: 3, sm: 3, md: 0, lg: 0, xl: 0 }}
                      >
                        {i18n.resolvedLanguage === "vi"
                          ? linkEc.vi.phone
                          : linkEc.jp.phone}
                      </Typography>
                    </Grid>
                    <Grid item xs={1} sm={1} md={2} lg={2} xl={2}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {t("linkEC.email")}
                      </Typography>
                    </Grid>
                    <Grid item xs={1} sm={1} md={8} lg={8} xl={8}>
                      <Typography
                        variant="subtitle1"
                        ml={{ xs: 3, sm: 3, md: 0, lg: 0, xl: 0 }}
                      >
                        {i18n.resolvedLanguage === "vi"
                          ? linkEc.vi.email
                          : linkEc.jp.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={1} sm={1} md={2} lg={2} xl={2}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {t("linkEC.web")}
                      </Typography>
                    </Grid>
                    <Grid item xs={1} sm={1} md={8} lg={8} xl={8}>
                      <Typography
                        variant="subtitle1"
                        ml={{ xs: 3, sm: 3, md: 0, lg: 0, xl: 0 }}
                      >
                        {i18n.resolvedLanguage === "vi"
                          ? linkEc.vi.url
                          : linkEc.jp.url}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
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

export default LinkEC;
