import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import StarBorder from "@mui/icons-material/StarBorder";
import {
  Avatar,
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

// Anchor type
type Anchor = "top" | "left" | "bottom" | "right";

/**
 * SideBar: A sidebar component that uses a swipeable drawer to display navigation items.
 *
 * This component includes a menu icon to toggle the sidebar visibility and a swipeable drawer
 * that contains a logo and a list of navigation items. The sidebar can be positioned on the left
 * and toggled open or closed using the menu icon.
 *
 * @component
 * @returns {JSX.Element} The sidebar with a menu icon and a swipeable drawer.
 */

const SideBar = (): JSX.Element => {
  // Use to translate content from the "common" translation file
  const { t } = useTranslation("common");

  // Declare interface IndexProps to type navigation items
  interface IndexProps {
    id: number;
    name: string;
    path: string;
    subMenus: any;
  }

  // State to manage the open/close status of the drawer
  const [state, setState] = React.useState<any>({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  /**
   * Toggles the drawer open or closed based on the anchor and open status.
   *
   * @param anchor - The position of the drawer (top, left, bottom, right)
   * @param open - Boolean to indicate if the drawer should be open or closed
   * @returns A function to handle the event
   */
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      // Prevent the drawer from toggling when Tab or Shift keys are pressed
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      // Update the state to open or close the drawer
      setState({ ...state, [anchor]: open });
    };

  /**
   * Returns the drawer content based on the anchor position.
   *
   * @param anchor - The position of the drawer (top, left, bottom, right)
   * @returns JSX.Element - The content of the drawer
   */
  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 300 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* Logo image linked to the home page */}
      <Link onClick={toggleDrawer(anchor, false)} to="/">
        <Box
          component="img"
          sx={{
            width: 220,
            height: "auto",
            m: 4,
          }}
          src="/images/SORIMACHI_VIETNAM.png"
        />
      </Link>
      <Divider />
      {/* Render navigation items from translation file */}
      {t<string, IndexProps[]>("navigationBar.navItems", {
        returnObjects: true,
      }).map((item, index) => (
        <ItemList
          key={item.id}
          onClick={toggleDrawer(anchor, false)}
          item={item}
        ></ItemList>
      ))}
    </Box>
  );

  return (
    <>
      {/* Menu icon to open the sidebar */}
      <IconButton onClick={toggleDrawer("left", true)}>
        <MenuIcon sx={{ fontSize: 30 }}></MenuIcon>
      </IconButton>
      {/* Swipeable drawer for the sidebar */}
      <SwipeableDrawer
        anchor={"left"} // Position of the drawer
        open={state["left"]} // Open status of the drawer
        onClose={toggleDrawer("left", false)} // Close drawer handler
        onOpen={toggleDrawer("left", true)} // Open drawer handler
      >
        {/* Drawer content */}
        {list("left")}
      </SwipeableDrawer>
    </>
  );
};

/**
 * ItemList: A component to display a navigation item with optional sub-menus.
 *
 * This component displays a navigation item, which can be either a single link or a collapsible
 * list of sub-menus. The component handles navigation and toggling of the sub-menus.
 *
 * @component
 * @param {Object} props - The component props
 * @param {Object} props.item - The navigation item object
 * @param {function} props.onClick - The function to handle click events
 * @returns {JSX.Element} The rendered navigation item with optional sub-menus
 */
const ItemList = ({
  item,
  onClick,
}: {
  item: any;
  onClick: Function;
}): JSX.Element => {
  // Hook to programmatically navigate
  const navigate = useNavigate();

  // State to manage the collapse of sub-menus
  const [open, setOpen] = useState<boolean>(false);

  /**
   * Handles the click event on the main item to toggle sub-menus and navigate.
   *
   * @param {string} childPath - The path to navigate to
   */
  const handleClick = (childPath: string) => {
    // Toggle the sub-menus open/closed state
    setOpen(!open);
    // Navigate to the child path
    navigate(childPath);
  };

  /**
   * Handles the navigation event for both main and sub-menu items.
   *
   * @param {string} path - The path to navigate to
   */
  const handleNavigate = (path: string) => {
    // Call the onClick function passed as a prop
    onClick();
    // Navigate to the specified path
    navigate(path);
  };

  return (
    <>
      {item.subMenus ? ( // Check if the item has sub-menus
        <>
          {/* Main item button that toggles the sub-menus */}
          <ListItemButton onClick={() => handleClick(item.childPath)}>
            <ListItemIcon>
              {/* Icon for the main item */}
              <StarBorder />
            </ListItemIcon>
            {/* Display item name */}
            <ListItemText primary={item.name} />
            {/* Toggle icon */}
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {/* Collapsible list of sub-menus */}
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.subMenus.map((subItem: any, subIndex: number) => (
                <ListItemButton
                  onClick={() => handleNavigate(`${item.path}${subItem.path}`)} // Handle sub-menu navigation
                  key={subItem.id}
                  sx={{ pl: 4 }} // Padding for sub-menu items
                >
                  <ListItemIcon>
                    {/* Icon for sub-menu item */}
                    <Avatar sizes="small" src="/images/img_navBar.png" />
                  </ListItemIcon>
                  {/* Display sub-menu item name */}
                  <ListItemText primary={subItem.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </>
      ) : (
        // Main item button for items without sub-menus
        <ListItemButton onClick={() => handleNavigate(item.path)}>
          <ListItemIcon>
            {/* Icon for the main item */}
            <StarBorder />
          </ListItemIcon>
          {/* Display item name */}
          <ListItemText primary={item.name} />
        </ListItemButton>
      )}
    </>
  );
};

export default SideBar;
