import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Grid } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { popoverClasses } from "@mui/material/Popover";
import { alpha, styled } from "@mui/material/styles";
import api from "apis/api";
import { Fragment, MouseEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SideBar from "./SideBar";

/**
 * StyledMenu: Custom styled menu component using Material-UI's Menu component.
 *
 * @component
 * @param {MenuProps} props - Props to be passed to the Menu component.
 * @returns {JSX.Element} The styled menu component.
 */
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0} // Removes default shadow
    anchorOrigin={{
      vertical: "bottom", // Menu opens from bottom
      horizontal: "left", // Menu opens from left
    }}
    transformOrigin={{
      vertical: "top", // Menu transforms from top
      horizontal: "left", // Menu transforms from left
    }}
    {...props} // Passes additional props
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6, // Menu border radius
    marginTop: theme.spacing(1), // Margin at the top
    minWidth: 280, // Minimum width
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)" // Text color for light mode
        : theme.palette.grey[300], // Text color for dark mode
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px", // Custom shadow
    "& .MuiMenu-list": {
      padding: "8px 4px", // Padding inside the menu list
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18, // Icon font size
        color: "white", // Icon color
        // color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5), // Margin to the right of the icon
      },
      backgroundColor: "transparent", // Default background color
      "&:hover": {
        backgroundColor: "#0C5ADB", // Background color on hover
        borderRadius: 2, // Rounded corners on hover
        color: "white", // Text color on hover
      },
      "&:active": {
        color:
          theme.palette.mode === "light"
            ? "rgb(55, 65, 81)" // Text color for light mode when active
            : theme.palette.grey[300], // Text color for dark mode when active
        backgroundColor: alpha(
          theme.palette.primary.main, // Background color for active state
          theme.palette.action.selectedOpacity // Opacity for active state
        ),
      },
    },
  },
}));

/**
 * MenuCustome: A custom menu component that displays a button and optionally a dropdown menu.
 *
 * This component handles button clicks to navigate or open a dropdown menu with sub-menu items.
 * It also manages hover states to show and hide the dropdown menu.
 *
 * @component
 * @param {Object} item - The menu item data, including optional sub-menus.
 * @param {number} item.id - The unique identifier for the menu item.
 * @param {string} item.name - The display name of the menu item.
 * @param {string} item.path - The path to navigate to when the item is clicked.
 * @param {Array} [item.subMenus] - The optional array of sub-menu items.
 *
 * @returns {JSX.Element} The custom menu component with button and dropdown menu.
 */
const MenuCustome = ({
  item,
}: {
  item: { id: number; name: string; path: string; subMenus?: Array<any> };
}): JSX.Element => {
  // Hook to programmatically navigate
  const navigate = useNavigate();

  // State to track if the mouse is hovering over the menu
  let currentlyHovering = false;

  // State to manage anchor element for the dropdown menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Boolean state to determine if the menu is open
  const open = Boolean(anchorEl);

  // Handles button click to open or close the dropdown menu
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Closes the dropdown menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Sets hover state to true
  function handleHover() {
    currentlyHovering = true;
  }

  // Sets hover state to false and closes the dropdown menu if not hovering
  function handleCloseHover() {
    currentlyHovering = false;
    setTimeout(() => {
      if (!currentlyHovering) {
        handleClose();
      }
    }, 50);
  }

  return (
    <>
      {/* Button to trigger menu or navigate */}
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableElevation
        endIcon={item.subMenus && <KeyboardArrowDownIcon />}
        onClick={(e) => {
          // Navigate if no subMenus, otherwise open the dropdown menu
          if (!item?.subMenus) {
            item.id === 6 ? window.open(item?.path) : navigate(item?.path);
          } else {
            handleClick(e);
          }
        }}
        onMouseOver={handleClick}
        onMouseLeave={handleCloseHover}
        sx={{
          paddingX: "10px !important",
          color: item.id === 6 ? "white" : "black",
          textTransform: "none",
          fontWeight: 600,
          fontSize: 16,
          backgroundColor: item.id === 6 ? "#52b69a" : "",
          "&:hover": {
            color: "black",
            backgroundColor:
              item.id === 6 ? "#52b69a88" : "rgba(25, 118, 210, 0.04)",
          },
        }}
      >
        {item?.name}
      </Button>
      {/* Dropdown menu for items with sub-menus */}
      {item.subMenus && (
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
            onMouseEnter: handleHover,
            onMouseLeave: handleCloseHover,
            style: { pointerEvents: "auto" },
          }}
          disableScrollLock
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{
            [`&.${popoverClasses.root}`]: { pointerEvents: "none" },
            left: open ? "" : "-5000px !important",
          }}
        >
          {/* Render sub-menu items */}
          {item?.subMenus &&
            item?.subMenus.map((subItem, subIndex) => {
              return (
                <MenuItem
                  key={item.id + subItem.id}
                  onClick={() => {
                    navigate(item.path + subItem.path);
                    handleClose();
                  }}
                  disableRipple
                >
                  {/* SVG icon for sub-menu item */}
                  <span style={{ marginRight: 10 }}>
                    <svg
                      width="7"
                      height="7"
                      viewBox="0 0 7 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="3.5" cy="3.5" r="3.5" fill="#A7A7A7" />
                    </svg>
                  </span>
                  {subItem.name}
                </MenuItem>
              );
            })}
        </StyledMenu>
      )}
    </>
  );
};

/**
 * NavigationBar: A navigation bar component displaying a logo, menu items, and a sidebar with action buttons.
 *
 * This component fetches year data from an API and renders a navigation bar with a logo, menu items, and action buttons
 * on the right side. It includes responsive design to adapt to different screen sizes.
 *
 * @component
 * @returns {JSX.Element} The navigation bar with logo, menu items, and sidebar buttons.
 */
const NavigationBar = (): JSX.Element => {
  // Hook for translation
  const { t } = useTranslation("common");

  // Interface for menu items and sidebar items
  interface IndexProps {
    id: number;
    name: string;
    path: string;
    subMenus: any;
  }

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // State to store years fetched from API
  const [years, setYears] = useState<any[]>([]);

  // Function to fetch all years from the API
  const getAllYear = async () => {
    await api
      .getAllYear()
      .then((response) => {
        if (response.status === 200) setYears(response.data.years);
      })
      .catch((error: any) => {
        toast.error(error.response.data.error.message);
      });
  };

  useEffect(() => {
    getAllYear(); // Fetch years on component mount
  }, []);

  // Sidebar button configurations
  const sideBarRight = [
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6M22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6M22 6L12 13L2 6"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#00B900",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 15C4 15 5 14 8 14C11 14 13 16 16 16C19 16 20 15 20 15V3C20 3 19 4 16 4C13 4 11 2 8 2C5 2 4 3 4 3V15ZM4 15V22"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#E31700",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 11L11 2C11.7956 2 12.5587 2.31607 13.1213 2.87868C13.6839 3.44129 14 4.20435 14 5V9H19.66C19.9499 8.99672 20.2371 9.0565 20.5016 9.17522C20.7661 9.29393 21.0016 9.46873 21.1919 9.68751C21.3821 9.90629 21.5225 10.1638 21.6033 10.4423C21.6842 10.7207 21.7035 11.0134 21.66 11.3L20.28 20.3C20.2077 20.7769 19.9654 21.2116 19.5979 21.524C19.2304 21.8364 18.7623 22.0055 18.28 22H7M7 11V22M7 11H4C3.46957 11 2.96086 11.2107 2.58579 11.5858C2.21071 11.9609 2 12.4696 2 13V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H7"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "#2200E3",
    },
  ];

  return (
    <AppBar
      sx={{
        backgroundColor: "#ffffff !important",
        textAlign: "center",
        paddingY: 1,
        height: "60px",
        marginTop: "35px",
      }}
    >
      <Grid
        maxWidth={{ xs: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
        px={{ xs: 5, sm: 5, md: 8, lg: 10, xl: 20 }}
        sx={{
          marginX: "auto",
        }}
        container
        position="relative"
      >
        <Grid
          item
          xs={12}
          width={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection="row"
        >
          {/* SideBar visibility based on screen size */}
          <Grid
            display={{
              xl: "none",
              lg: "none",
              md: "block",
              sm: "block",
              xs: "block",
            }}
          >
            <SideBar></SideBar>
          </Grid>
          {/* Logo with navigation to home */}
          <Link to="/">
            <Box
              component="img"
              sx={{
                width: {
                  xl: 200,
                  lg: 150,
                  md: 200,
                  sm: 200,
                  xs: 200,
                },
                height: "auto",
              }}
              src="/images/SORIMACHI_VIETNAM.png"
            />
          </Link>
          {/* Menu items visible on larger screens */}
          <Grid
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "none",
                lg: "block",
                xl: "block",
              },
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  sm: "none",
                  md: "none",
                  lg: "flex",
                  xl: "flex",
                },
                columnGap: 2,
              }}
            >
              {t<string, IndexProps[]>("navigationBar.navItems", {
                returnObjects: true,
              }).map((item, index) => (
                <Fragment key={item.id + index}>
                  <MenuCustome item={item}></MenuCustome>
                </Fragment>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      {/* Sidebar action buttons */}
      <Grid
        display="flex"
        flexDirection="column"
        gap={0.5}
        top={5}
        right={5}
        position="absolute"
      >
        {t<string, IndexProps[]>("navigationBar.sideBarRight", {
          returnObjects: true,
        }).map((item, index) => (
          <Button
            key={item.id + index}
            variant="contained"
            onClick={() =>
              navigate(
                item.path === "/news" ? `/news/${years[0]?.year}` : item.path
              )
            }
            sx={{ bgcolor: sideBarRight[index].color, textTransform: "none" }}
            startIcon={sideBarRight[index].icon}
          >
            {item.name}
          </Button>
        ))}
      </Grid>
    </AppBar>
  );
};

export default NavigationBar;
