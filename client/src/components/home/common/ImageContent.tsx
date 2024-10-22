import { Box, Grid, Typography } from "@mui/material";

/**
 * ImageContent component renders a header section with a background image and a centered title.
 * The component is designed to display a background image with a title overlay on top.
 * The title is positioned centrally and styled to stand out against the background image.
 *
 * @param {Object} props - The component props
 * @param {string} props.title - The title to display on the header
 *
 * @returns {JSX.Element} The rendered ImageContent component
 */
const ImageContent = ({ title }: { title: string }): JSX.Element => {
  return (
    <>
      <Grid mt={12} container sx={{ position: "relative", height: 200 }}>
        <Box
          component="img"
          alt={title}
          src="/images/Background_Header.png"
          sx={{
            width: 1,
            objectFit: "cover",
            height: 1,
            backgroundPosition: "center",
          }}
        ></Box>
        <Grid position="absolute" display="flex" top="55.5%" width={1}>
          <Typography
            variant="h4"
            width={{ xl: 1200, lg: 1050, md: 800, sm: 550, xs: 400 }}
            sx={{
              fontFamily: "'Philosopher', sans-serif",
              textAlign: "center",
              fontWeight: "bold",
              color: "#FFFFFF",
              textTransform: "uppercase",
              mx: "auto",
            }}
          >
            {title}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ImageContent;
