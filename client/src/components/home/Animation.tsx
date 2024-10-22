import { Box } from "@mui/material";
import { motion } from "framer-motion";

/**
 * Animation: A component that displays a horizontal animation effect.
 *
 * This component renders a horizontal animation where a small dot moves from left to right within a container. The animation is continuous and uses a predefined easing function.
 *
 * @component
 * @returns {JSX.Element} The rendered Animation component.
 */
const Animation = (): JSX.Element => {
  return (
    <>
      <Box
        borderRadius={100}
        width={76}
        height={6}
        sx={{ background: "#E7EFFC", mx: "auto" }}
      >
        <motion.div
          animate={{
            translateX: [0, 70, 0], // Animates the horizontal position of the dot
          }}
          transition={{
            duration: 10, // Duration of one complete animation cycle
            ease: "easeInOut", // Easing function for smooth animation
            times: [0, 0.2, 0.5, 0.2, 0.2], // Timing function for the animation steps
            repeatDelay: 0, // Delay before repeating the animation
            repeat: Infinity, // Repeat the animation infinitely
          }}
        >
          <Box
            width={6}
            height={6}
            position="relative"
            borderRadius={100}
            sx={{ background: "#0C5ADB" }} // Color of the moving dot
          ></Box>
        </motion.div>
      </Box>
    </>
  );
};

export default Animation;
