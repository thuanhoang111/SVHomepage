import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { NewsLanguage } from "models/news";
import moment from "moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

/**
 * The NewsCard component displays a card with news information, including an image, title, date, description,
 * and a link to detailed news content.
 *
 * This component is used to present individual news items and supports hover effects for better user interaction.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {NewsLanguage} props.item - An object containing news data with fields for images, titles, descriptions, and dates.
 * @param {string} [props.year] - The year of the news item.
 * @param {string} props.date - The date of the news item.
 * @param {string} props.id - The ID of the news item.
 * @param {Object} props.display - An object containing responsive display settings.
 *
 * @returns {JSX.Element} The rendered news card component with news content.
 */
const NewsCard = ({
  item,
  year,
  date,
  id,
  display,
}: {
  item: NewsLanguage;
  year?: string;
  date: Date;
  id?: string;
  display: any;
}): JSX.Element => {
  // Destructure display properties for responsive design
  const { xl, lg, md, sm, xs } = display;

  // State to handle hover effect
  const [hover, setHover] = useState<boolean>(false);

  // Translation hook for multi-language support
  const { t, i18n } = useTranslation("news");

  // State for styling hover effect
  const [style, setStyle] = useState<any>({
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    transition: "all 0.3s ease",
    background: "#287FF9",
  });

  /**
   * Timer function to handle hover effect transitions.
   * It changes the style to create a fading effect when hovering over the card.
   */
  const timer = () => {
    setStyle({
      position: "absolute",
      top: 0,
      width: "100%",
      height: "100%",
      opacity: 0.2,
      transition: "all 0.3s ease",
      background: "#287FF9",
    });
    setTimeout(() => {
      setStyle({
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%",
        opacity: 0,
        transition: "all 0.3s ease",
        background: "#287FF9",
      });
    }, 400);
  };

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      {/* NavLink for navigating to the detailed news page */}
      <NavLink to={`/news/${year}/${id}`} style={{ textDecoration: "none" }}>
        <Card
          onMouseEnter={() => {
            setHover(true);
            timer();
          }}
          onMouseLeave={() => setHover(false)}
          sx={{
            border: "0px",
            borderRadius: 0,
            boxShadow: 0,
            cursor: "pointer",
            background: "#F9FAFC",
            height: "100%",
            maxHeight: 500,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box position="relative">
            {/* CardMedia for displaying news image */}
            <CardMedia
              component="img"
              height="230"
              image={
                item.poster
                  ? process.env.REACT_APP_URL_API + "/" + item.poster
                  : "/images/Image_Not_Found.png"
              }
              alt={item.title}
            />
            {/* Date box overlay on the image */}
            <Box
              position="absolute"
              width={94}
              height={23}
              borderRadius={100}
              sx={{
                background: "#287FF9",
                top: 218,
                left: 18,
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body2" color="white">
                {date && i18n.resolvedLanguage === "vi"
                  ? moment(date).format("DD.MM.YYYY")
                  : moment(date).format("YYYY.MM.DD")}
              </Typography>
            </Box>
            {/* Hover effect box */}
            <Box
              sx={{
                width: "100%",
                height: "230px",
                position: "absolute",
                top: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "5%",
                  height: "5%",
                  background: "#287FF9",
                  transform: hover ? "scale(20)" : "scale(1)",
                  transition: "all 0.4s ease",
                  transitionDelay: "100ms",
                  opacity: hover ? 0.5 : 0,
                }}
              ></Box>
            </Box>
          </Box>
          <Box position="relative" height={1}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                height: 1,
                justifyContent: "space-between",
                position: "relative",
                padding: 0,
                pt: 2,
              }}
            >
              <Box
                height={1}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                padding={2}
              >
                {/* News title */}
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  color="#062D6E"
                  className="class-title"
                  sx={{
                    textAlign: "left",
                    fontWeight: "700",
                    lineHeight: "26px",
                    textTransform: "uppercase",
                  }}
                >
                  {item.title}
                </Typography>
                {/* News description */}
                <Typography
                  className="class-description"
                  variant="body1"
                  color="text.secondary"
                  sx={{ textAlign: "left", paddingTop: "8px" }}
                >
                  {item.description}
                </Typography>
              </Box>
              <Grid>
                <Divider
                  variant="middle"
                  sx={{ borderColor: "gray", borderWidth: 1 }}
                />
                {/* Card actions with hover effect */}
                <CardActions
                  sx={{
                    marginLeft: 1,
                  }}
                >
                  <Button
                    size="small"
                    color="primary"
                    sx={{
                      transform: `${hover ? "translateX(35px)" : ""}`,
                      transition: "all 0.5s ease",
                    }}
                  >
                    {t("detail")}
                  </Button>
                  <Box
                    border="1px solid #287FF9"
                    sx={{
                      transform: `${hover ? "translateX(-60px)" : ""}`,
                      transition: "all 0.5s ease",
                    }}
                    width={26}
                  ></Box>
                </CardActions>
              </Grid>
            </CardContent>
            {/* Hover effect overlay */}
            <Box sx={style}></Box>
          </Box>
        </Card>
      </NavLink>
    </Grid>
  );
};

export default NewsCard;
