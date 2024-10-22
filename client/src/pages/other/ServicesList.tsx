import { Box, Grid, Link, Typography } from "@mui/material";
import ImageContent from "components/home/common/ImageContent";
import TitleIcon from "components/home/title/TitleIcon";
import { useTranslation } from "react-i18next";

const ServicesList = () => {
  // Declare t to use translation from file translation.json
  const { t } = useTranslation();

  // Interface IndexProps declare data type when map data from file translation.json
  interface IndexProps {
    id: number;
    title: string;
    link: string;
    target: string;
    image: string;
    download: object;
  }

  return (
    <>
      <ImageContent title={t("servicesList.titleHeader")} />
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
        <Grid container gap={12.5}>
          <Grid
            item
            container
            columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
            spacing={6}
          >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TitleIcon
                title={t("servicesList.agricultural.title")}
                fontSize="30px"
                fontWeight="400"
                lineHeight="36px"
              ></TitleIcon>
              <Typography textAlign="justify" variant="subtitle1" mt={1}>
                {t("servicesList.agricultural.content")}
              </Typography>
            </Grid>
            {t<string, IndexProps[]>(
              "servicesList.agricultural.agriculturals",
              { returnObjects: true }
            ).map((item, index) => (
              <Grid
                key={item.id + index}
                item
                marginX={10}
                container
                columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
                {index % 2 === 0 ? (
                  <>
                    <Grid
                      item
                      xl={8}
                      lg={8}
                      md={8}
                      sm={8}
                      xs={8}
                      columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
                      container
                      position="relative"
                    >
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.title}
                        width={1}
                      ></Box>
                      {item.download && (
                        <Grid
                          item
                          position="absolute"
                          bottom={{ xl: 42, lg: 35, md: 24, sm: 10, xs: 4 }}
                          container
                          xl={6}
                          lg={6}
                          md={6}
                          sm={6}
                          xs={6}
                          columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
                          paddingRight={{
                            xl: 9,
                            lg: 8,
                            md: 6,
                            sm: 3,
                            xs: 2,
                          }}
                          paddingLeft={{
                            xl: 6.5,
                            lg: 5,
                            md: 4,
                            sm: 2,
                            xs: 1.5,
                          }}
                          spacing={1}
                        >
                          <Grid
                            item
                            xl={6}
                            lg={6}
                            md={6}
                            sm={6}
                            xs={6}
                            justifyContent="center"
                            alignItems="center"
                            display="flex"
                          >
                            <a
                              href="https://apps.apple.com/vn/app/facefarm-nh%E1%BA%ADt-k%C3%BD-s%E1%BA%A3n-xu%E1%BA%A5t/id6443934488?itsct=apps_box_badge&amp;itscg=30200"
                              style={{
                                display: "inline-block",
                                overflow: "hidden",
                              }}
                            >
                              <img
                                src="/images/app_store.png"
                                alt="Download on the App Store"
                                style={{
                                  width: "100%",
                                  height: "auto",
                                }}
                              />
                            </a>
                          </Grid>
                          <Grid
                            item
                            xl={6}
                            lg={6}
                            md={6}
                            sm={6}
                            xs={6}
                            justifyContent="center"
                            alignItems="center"
                            display="flex"
                          >
                            <a
                              href="https://play.google.com/store/apps/details?id=ffvn.app.ffvn&hl=en&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
                              style={{
                                display: "inline-block",
                                overflow: "hidden",
                              }}
                            >
                              <img
                                alt="Get it on Google Play"
                                src="/images/google_play.png"
                                style={{
                                  width: "100%",
                                  height: "auto",
                                }}
                              />
                            </a>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                    <Grid
                      item
                      xl={4}
                      lg={4}
                      md={4}
                      sm={4}
                      xs={4}
                      display="flex"
                      justifyContent="center"
                    >
                      <Grid
                        display="flex"
                        flexDirection="row"
                        gap={1}
                        alignItems="center"
                      >
                        <Box
                          width={40}
                          height={40}
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
                        <Typography variant="h6" maxWidth="85%">
                          <Link
                            href={item.link}
                            target={item.target}
                            rel="noopener noreferrer"
                          >
                            {item.title}
                          </Link>
                        </Typography>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid
                      item
                      xl={4}
                      lg={4}
                      md={4}
                      sm={4}
                      xs={4}
                      display="flex"
                      justifyContent="center"
                    >
                      <Grid
                        display="flex"
                        flexDirection="row"
                        gap={1}
                        alignItems="center"
                      >
                        <Box
                          width={40}
                          height={40}
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
                        <Typography variant="h6" maxWidth="85%">
                          <Link
                            href={item.link}
                            target={item.target}
                            rel="noopener noreferrer"
                          >
                            {item.title}
                          </Link>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.title}
                        width={1}
                      ></Box>
                    </Grid>
                  </>
                )}
              </Grid>
            ))}
          </Grid>
          {/* <Grid
            item
            container
            direction="row-reverse"
            columns={{ xs: 1, sm: 1, md: 8, lg: 9, xl: 9 }}
            spacing={8}
          >
            <Grid item xs={1} sm={1} md={3} lg={3} xl={3}>
              <Box
                component="img"
                src={ServicesList_2}
                alt="Background"
                sx={{ objectFit: "cover", height: "auto", width: 1 }}
              ></Box>
            </Grid>
            <Grid item xs={1} sm={1} md={5} lg={6} xl={6}>
              <TitleIcon
                title="Dịch vụ SMB"
                fontSize="30px"
                fontWeight="400"
                lineHeight="36px"
              ></TitleIcon>
              <Typography variant="subtitle1" mt={1}>
                Các phần mềm kế toán luôn luôn là công cụ hiệu quả nhất để kiểm
                soát và duy trì hoạt động cho “bộ não tài chính” trong doanh
                nghiệp, bởi chúng được sử dụng để phục vụ các nhu cầu quản lý kế
                toán như báo cáo công nợ khách hàng chi tiết và chính xác, báo
                cáo số lượng hàng hóa nhập – xuất – tồn kho, liệt kê danh sách
                khách hàng và các mối quan hệ với công ty.
              </Typography>
              <Grid display="flex" pt={2.5} flexDirection="column" gap={2}>
                <Grid
                  display="flex"
                  flexDirection="row"
                  gap={1}
                  alignItems="center"
                >
                  <Box
                    width={40}
                    height={40}
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
                  <Typography maxWidth="85%">
                    <Link href="/" target="_blank" rel="noopener noreferrer">
                      Phần mềm Tính lương
                    </Link>
                  </Typography>
                </Grid>
                <Grid
                  display="flex"
                  flexDirection="row"
                  gap={1}
                  alignItems="center"
                >
                  <Box
                    width={40}
                    height={40}
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
                  <Typography maxWidth="85%">
                    <Link href="/" target="_blank" rel="noopener noreferrer">
                      Phần mềm Bán hàng
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            columns={{ xs: 1, sm: 1, md: 8, lg: 9, xl: 9 }}
            spacing={8}
          >
            <Grid item xs={1} sm={1} md={3} lg={3} xl={3}>
              <Box
                component="img"
                src={ServicesList_3}
                alt="Background"
                sx={{ objectFit: "cover", height: "auto", width: 1 }}
              ></Box>
            </Grid>
            <Grid item xs={1} sm={1} md={5} lg={6} xl={6}>
              <TitleIcon
                title="Dịch vụ bán lẻ"
                fontSize="30px"
                fontWeight="400"
                lineHeight="36px"
              ></TitleIcon>
              <Typography variant="subtitle1" mt={1}>
                Nhờ sự phát triển của “cuộc cách mạng công nghiệp 4.0”. Đối với
                các doanh nghiệp thương mại, các chủ cửa hàng, phần mềm bán hàng
                như một công cụ hỗ trợ hoàn hảo với rất nhiều tính năng vượt
                trội.
              </Typography>
              <Grid display="flex" pt={2.5} flexDirection="column" gap={2}>
                <Grid
                  display="flex"
                  flexDirection="row"
                  gap={1}
                  alignItems="center"
                >
                  <Box
                    width={40}
                    height={40}
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
                  <Typography maxWidth="85%">
                    <Link href="/" target="_blank" rel="noopener noreferrer">
                      Giải pháp quản lý chuỗi cửa hàng
                    </Link>
                  </Typography>
                </Grid>
                <Grid
                  display="flex"
                  flexDirection="row"
                  gap={1}
                  alignItems="center"
                >
                  <Box
                    width={40}
                    height={40}
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
                  <Typography maxWidth="85%">
                    <Link href="/" target="_blank" rel="noopener noreferrer">
                      Cửa hàng số
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid> */}
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
          height: 900,
          userSelect: "none",
        }}
      ></Box>
    </>
  );
};

export default ServicesList;
