import { Box, Grid, Typography } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";

/**
 * CompanyProducts: A component to display information about company products.
 *
 * This component presents details about the company's products with images and a description.
 * It is designed to be responsive and uses a grid layout to structure the content.
 *
 * @component
 * @returns {JSX.Element} The rendered CompanyProducts component
 */

const CompanyProducts = (): JSX.Element => {
  // Hook for translation
  const { t } = useTranslation("home");

  return (
    <>
      {/* Main Container Grid */}
      <Grid
        maxWidth={{ xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
        sx={{
          boxShadow: 0,
          height: "auto",
          marginX: "auto",
        }}
        px={{ xs: 5, sm: 5, md: 8, lg: 10, xl: 20 }}
      >
        {/* Inner Grid for Content Positioning */}
        <Grid
          padding={2}
          position="relative"
          container
          columns={{ xl: 12, lg: 12, ms: 12, sm: 12, xs: 12 }}
        >
          {/* Left Section - Text and Product Images */}
          <Grid
            item
            xl={7}
            lg={7}
            md={12}
            sm={12}
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            paddingX={{ xl: 10, lg: 10, md: 10, sm: 0, xs: 0 }}
          >
            {/* Product Description */}
            <Typography
              sx={{
                fontWeight: "400",
                color: "#232323",
                fontSize: "34px",
                lineHeight: "56px",
                textAlign: "center",
              }}
            >
              <Trans
                i18nKey={t("companyProducts")}
                components={{
                  bold: <strong />,
                  number: (
                    <span
                      style={{
                        color: "#0C5ADB",
                        fontSize: "56px",
                        fontWeight: "700",
                      }}
                    />
                  ),
                }}
              />
            </Typography>
            {/* Grid for Product Images */}
            <Grid
              container
              columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
            >
              {/* FaceFarm Image */}
              <Grid
                item
                xl={6}
                lg={6}
                md={6}
                sm={6}
                xs={6}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  component="img"
                  src="/images/faceFarm.png"
                  width={0.8}
                ></Box>
              </Grid>
              {/* WACA Image */}
              <Grid
                item
                xl={6}
                lg={6}
                md={6}
                sm={6}
                xs={6}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  component="img"
                  src="/images/waca.png"
                  width={0.6}
                  padding={2}
                ></Box>
              </Grid>
            </Grid>
          </Grid>
          {/* Right Section - Map Image */}
          <Grid
            item
            xl={5}
            lg={5}
            md={12}
            sm={12}
            xs={12}
            justifyContent="center"
            display="flex"
          >
            <Box
              component="img"
              src="/images/vietnam_map.png"
              p={3}
              width={0.8}
            ></Box>
          </Grid>
          {/* Background Image */}
          <Box
            component="img"
            src="/images/background_company_products.png"
            width={1}
            position="absolute"
            right={0}
            top={0}
            zIndex={-10}
          ></Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CompanyProducts;
