import { Box, Grid } from "@mui/material";

/**
 * TitleIcon: A component for displaying a title with an icon.
 *
 * This component renders a title with an accompanying icon. The icon is a fixed image, and the title can be customized with different font styles.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.title - The title text to be displayed.
 * @param {string} props.fontSize - The font size for the title text (default is "24px").
 * @param {string} props.fontWeight - The font weight for the title text (default is "700").
 * @param {string} props.lineHeight - The line height for the title text (default is "1.2").
 *
 * @returns {JSX.Element} The rendered TitleIcon component.
 */
function TitleIcon({
  title,
  fontSize,
  fontWeight,
  lineHeight,
}: {
  title: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
}): JSX.Element {
  return (
    <>
      {/* Container for the title and icon */}
      <Grid
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {/* Icon image */}
        <Box>
          <Box
            component="img"
            src="/images/title.png"
            alt="title"
            width={1}
            minWidth={32}
          ></Box>
        </Box>
        {/* Title text */}
        <h2
          style={{
            lineHeight: lineHeight,
            fontWeight: fontWeight,
            fontSize: fontSize,
            fontStyle: "normal",
            color: "#232323",
            textAlign: "left",
            margin: 0,
            alignItems: "center",
            fontFamily: "'Philosopher', sans-serif",
          }}
        >
          {title}
        </h2>
      </Grid>
    </>
  );
}

export default TitleIcon;
