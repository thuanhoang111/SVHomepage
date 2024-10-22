import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import DashboardIcon from "@mui/icons-material/Dashboard";
// import DatasetLinkedIcon from "@mui/icons-material/DatasetLinked";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import FeedbackIcon from "@mui/icons-material/Feedback";
import HandshakeIcon from "@mui/icons-material/Handshake";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import LogoutIcon from "@mui/icons-material/Logout";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { authLogout } from "stores/auth/auth-slice";
import { useAppDispatch } from "stores/hooks";
import { getToken } from "utils/auth";

// Menu items configuration
const menu = [
  {
    id: 0,
    name: "Dashboard",
    icon: <DashboardIcon></DashboardIcon>,
    link: "/admin/dashboard",
  },
  {
    id: 1,
    name: "News",
    icon: <NewspaperIcon></NewspaperIcon>,
    link: "/admin/news",
  },
  {
    id: 2,
    name: "Agriculture",
    icon: <AgricultureIcon></AgricultureIcon>,
    link: "/admin/agriculture",
  },
  {
    id: 3,
    name: "Partner",
    icon: <HandshakeIcon></HandshakeIcon>,
    link: "/admin/partner",
  },
  {
    id: 4,
    name: "Cooperative",
    icon: <HolidayVillageIcon></HolidayVillageIcon>,
    link: "/admin/cooperative",
  },
  // {
  //   id: 5,
  //   name: "Link EC",
  //   icon: <DatasetLinkedIcon></DatasetLinkedIcon>,
  //   link: "/admin/linkEc",
  // },
  {
    id: 6,
    name: "Feedback",
    icon: <FeedbackIcon></FeedbackIcon>,
    link: "/admin/feedback",
  },
  {
    id: 7,
    name: "Contact",
    icon: <ContactEmergencyIcon></ContactEmergencyIcon>,
    link: "/admin/contact",
  },
  {
    id: 8,
    name: "Personnel",
    icon: <RecentActorsIcon></RecentActorsIcon>,
    link: "/admin/personnel",
  },
  {
    id: 9,
    name: "Setting",
    icon: <SettingsIcon></SettingsIcon>,
    link: "/admin/setting",
  },
];

/**
 * SideBarAdmin component renders a sidebar with navigation links for an admin panel.
 * It includes a logout button at the end of the list.
 *
 * @component
 * @returns {JSX.Element} The rendered sidebar component.
 */
const SideBarAdmin = (): JSX.Element => {
  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Hook to dispatch actions
  const dispatch = useAppDispatch();

  // Retrieve the refresh token
  const { refresh_token } = getToken();

  return (
    <>
      <List
        sx={{
          width: "100%", // Full width
          maxWidth: 360, // Maximum width of 360px
          bgcolor: "#F9FAFC", // Background color
          paddingRight: 2, // Right padding
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {/* Render menu items */}
        {menu.map((item, index) => (
          <Fragment key={item.id + index}>
            <ListItemButton
              key={item.id + index}
              onClick={() => navigate(item.link)} // Navigate to the link
            >
              {/* Display the icon */}
              <ListItemIcon>{item.icon}</ListItemIcon>
              {/* Display the name */}
              <ListItemText primary={item.name} />
            </ListItemButton>
          </Fragment>
        ))}
        {/* Render logout button */}
        <Fragment>
          <ListItemButton
            onClick={() => {
              dispatch(authLogout(refresh_token)); // Dispatch logout action
            }}
          >
            <ListItemIcon>
              {/* Display logout icon */}
              <LogoutIcon></LogoutIcon>
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </Fragment>
      </List>
    </>
  );
};

export default SideBarAdmin;
