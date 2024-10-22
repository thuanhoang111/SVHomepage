import { Box, Typography } from "@mui/material";

/**
 * TitleIconCenter: A component that displays a centered title with an accompanying icon.
 *
 * This component renders an icon image centered above a title. The title is also centered and allows customization of its color.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title text to be displayed.
 * @param {string} [props.color="black"] - The color of the title text (default is black).
 *
 * @returns {JSX.Element} The rendered TitleIconCenter component.
 */
const TitleIconCenter = ({
  title,
  color = "black",
}: {
  title: string;
  color?: string;
}): JSX.Element => {
  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Box component="img" src="/images/title.png" alt="title"></Box>
      </Box>
      <Typography
        mt={1}
        textAlign="center"
        variant="h2"
        fontSize={32}
        fontWeight={700}
        lineHeight="36px"
        fontFamily="'Philosopher', sans-serif"
        sx={{ color: color }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default TitleIconCenter;
