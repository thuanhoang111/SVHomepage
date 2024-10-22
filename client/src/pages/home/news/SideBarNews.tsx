import { Box, Grid, Typography } from "@mui/material";
import api from "apis/api";
import { Year } from "models/year";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * SideBarNews: A component that displays a sidebar with a list of years.
 * It fetches the available years from an API and displays them with a dynamic style based on the selected year.
 * The component uses `useParams` to determine the current year from the URL and highlights the active year.
 *
 * @component
 * @returns {JSX.Element} The rendered sidebar with a list of years.
 */
const SideBarNews = (): JSX.Element => {
  const { t } = useTranslation("news");

  // Retrieves the selected year from the URL parameters
  const { year } = useParams<{ year?: string }>();

  // State variable to store the list of years
  const [years, setYears] = useState<any[]>([]);

  /**
   * Fetches the list of years from the API and updates the state.
   * Handles errors by displaying an error message using `toast`.
   */
  const getAllYear = async () => {
    await api
      .getAllYear()
      .then((response) => {
        if (response.status === 200) {
          setYears(response.data.years);
        }
      })
      .catch((error: any) => {
        toast.error(error.response.data.error.message);
      });
  };

  // Fetches the list of years when the component mounts
  useEffect(() => {
    getAllYear();
  }, []);

  // Marks the current year as active based on URL parameter
  years?.map((item) => {
    item.active = false;
    if (String(item.year) === year) {
      item.active = true;
    }
    return item;
  });

  return (
    <>
      <Grid p={4} sx={{ background: "#F9FAFC" }}>
        <Typography
          color="#062D6E"
          gutterBottom
          variant="h6"
          sx={{ fontWeight: "bold" }}
        >
          {t("time")}
        </Typography>
        <Grid sx={{ display: "flex", flexDirection: "row" }}>
          <Box height={3} width={90} sx={{ background: "#287FF9" }}></Box>
          <Box height={3} width={1} sx={{ background: "#EAEAEA" }}></Box>
        </Grid>
        <Grid sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          {years.length > 0 &&
            years.map((year, index) => (
              <ListItemYear
                item={year}
                key={year._id}
                years={years}
              ></ListItemYear>
            ))}
        </Grid>
      </Grid>
    </>
  );
};

export default SideBarNews;

/**
 * ListItemYear: A subcomponent used to display individual year items in the sidebar.
 * Each item is displayed as a link with dynamic styling based on hover and active states.
 * It handles mouse enter and leave events to toggle hover effects and sets the active state when clicked.
 *
 * @param {Object} props - The props object.
 * @param {any} props.item - The year item to be displayed.
 * @param {Object[]} props.years - The list of all year items.
 * @returns {JSX.Element} The rendered year item as a clickable link.
 */
const ListItemYear = ({
  item,
  years,
}: {
  item: any;
  years: Year[];
}): JSX.Element => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <NavLink
      to={`/news/${item.year}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        years.map((year: any) => (year.active = false));
        item.active = true;
      }}
      style={{
        display: "flex",
        borderBottom: "solid",
        borderWidth: 2,
        paddingLeft: 0,
        position: "relative",
        height: 50,
        borderRadius: 0,
        borderColor: "#EAEAEA",
        alignItems: "center",
      }}
    >
      <span
        style={{
          paddingRight: "10px",
          opacity: `${hover || item.active ? "1" : "0"}`,
          transition: "all 0.5s ease",
          position: "absolute",
          left: 0,
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.75 12.75L13.5 9L9.75 5.25M4.5 12.75L8.25 9L4.5 5.25"
            stroke="#287FF9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <Typography
        sx={{
          position: "absolute",
          paddingLeft: 1,
          left: 0,
          color: `${hover || item.active ? "#287FF9" : "gray"}`,
          transform: `${hover || item.active ? "translateX(20px)" : ""}`,
          transition: "all 0.5s ease",
        }}
      >
        {item.year}
      </Typography>
      <Box
        sx={{
          borderRadius: 100,
          transition: "all 0.5s ease",
          background: `${hover || item.active ? "#287FF9" : "gray"}`,
          display: "flex",
          color: "white",
          justifyContent: "center",
          alignItems: "center",
          width: 24,
          height: 24,
          position: "absolute",
          right: 5,
        }}
      >
        <Typography
          color="white"
          sx={{
            fontSize: 12,
          }}
        >
          {item.totalNews}
        </Typography>
      </Box>
    </NavLink>
  );
};
