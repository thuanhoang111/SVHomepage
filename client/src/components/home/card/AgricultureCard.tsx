import { Box, Grid, Typography } from "@mui/material";
import { Agriculture } from "models/agriculture";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

/**
 * The AgricultureCard component displays a card with agricultural information, including an image, date, author, title, and description.
 *
 * This component is used to present individual agriculture items and allows navigation to detailed views.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {Agriculture} props.item - An object containing agriculture data with fields for images, titles, descriptions, dates, and authors.
 *
 * @returns {JSX.Element} The rendered card component with agricultural content.
 */
const AgricultureCard = ({ item }: { item: Agriculture }): JSX.Element => {
  // Use to translate content from agricultureJapan file
  const { i18n, t } = useTranslation("agricultureJapan");

  // Handle page navigation
  const navigate = useNavigate();

  return (
    <Grid
      onClick={() => navigate(`/agricultureJp/detail/${item._id}`)} // Navigate to detailed view on click
      sx={{ cursor: "pointer" }} // Cursor changes to pointer on hover
      display="flex" // Use flexbox for layout
      flexDirection="column" // Stack items vertically
      gap={0.5} // Space between child elements
      item // Indicates this is a grid item
      xl={6}
      lg={6}
      md={6}
      sm={12}
      xs={12} // Responsive grid sizing
    >
      <Box
        component="img"
        src={
          process.env.REACT_APP_URL_API +
          "/" +
          (i18n.resolvedLanguage === "vi" ? item.vi.poster : item.jp.poster) // Dynamic image URL based on language
        }
        borderRadius={1.5} // Rounded corners for the image
        width={1} // Full width of the grid item
        height={220} // Fixed height for the image
        alt={i18n.resolvedLanguage === "vi" ? item.vi.title : item.jp.title} // Alt text based on language
      ></Box>
      <Typography
        fontSize={14} // Font size for the date and author
        fontStyle="italic" // Italic text style
        fontWeight={400} // Font weight
        color="rgba(0, 0, 0, 0.4)" // Light gray color
        className="class-author" // CSS class for styling
      >
        {item.day && i18n.resolvedLanguage === "vi"
          ? moment(item.day).format("DD.MM.YYYY") // Format date based on language
          : moment(item.day).format("YYYY.MM.DD")}
        <span
          style={{
            paddingLeft: 10, // Space between date and author
            fontSize: 16, // Font size for the author
            fontStyle: "normal", // Normal text style
            fontWeight: 500, // Font weight for the author
            color: "#0C5ADB", // Color for the author text
          }}
        >
          {/* Translated author label */}
          {t("author")}
          {/* Author name based on language */}
          {i18n.resolvedLanguage === "vi" ? item.vi.author : item.jp.author}
        </span>
      </Typography>
      <Typography
        fontWeight={500} // Font weight for the title
        fontSize={22} // Font size for the title
        className="class-description-agriculture" // CSS class for styling
      >
        {/* Title based on language */}
        {i18n.resolvedLanguage === "vi" ? item.vi.title : item.jp.title}
      </Typography>
      <Typography
        color="#232323" // Dark color for the description
        fontSize={16} // Font size for the description
        fontWeight={400} // Font weight for the description
        className="class-description" // CSS class for styling
      >
        {/* Description based on language */}
        {i18n.resolvedLanguage === "vi"
          ? item.vi.description
          : item.jp.description}
      </Typography>
    </Grid>
  );
};

export default AgricultureCard;
