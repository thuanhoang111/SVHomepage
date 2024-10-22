import { Button } from "@mui/material";
import { ReactComponent as TouchClickIcon } from "assets/images/TouchClick.svg";
import { useState } from "react";

/**
 * The RegisterButton component renders a customizable button with dynamic styling and an icon.
 *
 * This button component allows for a hover effect, custom title, color, and link destination.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.title - The text to display on the button.
 * @param {string} props.color - The color to apply to the button and icon.
 * @param {string} props.path - The URL to navigate to when the button is clicked.
 * @param {string} props.target - Specifies where to open the linked document (e.g., "_blank").
 *
 * @returns {JSX.Element} The rendered button component with hover effects and icon.
 */
const RegisterButton = ({
  title,
  color,
  path,
  target,
}: {
  title: string;
  color: string;
  path: string;
  target: string;
}): JSX.Element => {
  // State to manage the hover effect
  const [isHovered, setIsHovered] = useState<boolean>(false);

  /**
   * Handles mouse enter event to apply hover effect.
   */
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  /**
   * Handles mouse leave event to remove hover effect.
   */
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Button
      sx={{
        color: color, // Button text color
        display: "flex", // Display flex to align items
        justifyContent: "flex-start", // Align content to the start
        padding: "1px", // Minimal padding
        fontWeight: "bold", // Bold text
        paddingLeft: 3, // Padding on the left
        backgroundColor: "white", // Default background color
        border: "1px dashed", // Dashed border style
        borderRadius: "60px", // Rounded border radius
        maxWidth: 300, // Maximum width of the button
        width: "100%", // Full width button
        "&:hover": {
          backgroundColor: color, // Background color on hover
          color: "white", // Text color on hover
          border: "1px solid", // Solid border on hover
        },
      }}
      startIcon={
        <TouchClickIcon width={16} fill={isHovered ? "#fff" : color} /> // Icon color changes based on hover state
      }
      onMouseEnter={handleMouseEnter} // Handle mouse enter event
      onMouseLeave={handleMouseLeave} // Handle mouse leave event
      href={path} // URL to navigate to
      target={target} // Specifies where to open the link
      rel="noopener noreferrer" // Security feature to prevent malicious behavior
    >
      {title} {/* Display button text */}
    </Button>
  );
};

export default RegisterButton;
