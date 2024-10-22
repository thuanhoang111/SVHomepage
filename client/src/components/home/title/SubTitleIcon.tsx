import { Box, Grid } from "@mui/material";

/**
 * SubTitleIcon: A component for rendering a subtitle with an accompanying icon.
 *
 * This component displays a subtitle with an optional icon next to it. The icon is a fixed image, and the subtitle can be customized with different font styles.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.title - The subtitle text to be displayed.
 * @param {string} props.fontSize - The font size for the subtitle text (default is "16px").
 * @param {string} props.fontWeight - The font weight for the subtitle text (default is "400").
 * @param {string} props.lineHeight - The line height for the subtitle text (default is "1.5").
 * @param {string} [props.fontFamily="'Philosopher', sans-serif"] - The font family for the subtitle text (default is "'Philosopher', sans-serif").
 *
 * @returns {JSX.Element} The rendered SubTitleIcon component.
 */
function SubTitleIcon({
  title,
  fontSize,
  fontWeight,
  lineHeight,
  fontFamily = "'Philosopher', sans-serif",
}: {
  title: string;
  fontSize: any;
  fontWeight: any;
  lineHeight: any;
  fontFamily?: string;
}): JSX.Element {
  return (
    <>
      {/* Container for the subtitle and icon */}
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
            src="/images/sub_title.png"
            alt="sub_title"
            width={1}
            minWidth={32}
          ></Box>
        </Box>
        {/* Subtitle text */}
        <h2
          style={{
            lineHeight,
            fontWeight,
            fontSize,
            fontStyle: "normal",
            color: "#232323",
            textAlign: "left",
            margin: 0,
            alignItems: "center",
            fontFamily,
          }}
        >
          {title}
        </h2>
      </Grid>
    </>
  );
}

export default SubTitleIcon;
