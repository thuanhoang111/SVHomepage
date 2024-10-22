import { Box, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

/**
 * ImageCarousel: A component that displays a carousel of slogans with a fade transition effect.
 *
 * This component showcases a rotating list of slogans that fade in and out. It updates based on the current language.
 *
 * @component
 * @returns {JSX.Element} The rendered ImageCarousel component.
 */
const ImageCarousel = (): JSX.Element => {
  // Hook for translation
  const { t, i18n } = useTranslation("home");

  interface IndexProps {
    slogan: string;
  }

  // Fetching slogans for the image carousel from translation JSON
  let names = t<string, IndexProps[]>("imageCarousel", {
    returnObjects: true,
  });

  // State to store new name
  const [newName, setNewName] = useState<string>(names[0].slogan);

  useEffect(() => {
    // Update slogans when the language changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    names = t<string, IndexProps[]>("imageCarousel", {
      returnObjects: true,
    });
    setNewName(names[0].slogan);
  }, [i18n.resolvedLanguage]);

  // Function to shuffle and update the slogan
  const shuffle = useCallback(
    (index: number) => {
      setNewName(names[index]?.slogan);
    },
    // Dependency on language change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i18n.resolvedLanguage]
  );

  useEffect(() => {
    let i = 0;
    const intervalID = setInterval(() => {
      if (i === names.length) i = 0;
      shuffle(i);
      timer();
      i++;
    }, 4200); // Time interval for the carousel
    return () => clearInterval(intervalID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffle]);

  const [style, setStyle] = useState<any>({
    opacity: 1,
    transition: "all 1s ease",
  });

  // Timer function to handle the fade effect
  const timer = () => {
    setStyle({
      opacity: 1,
      transition: "all 1s ease",
    });
    setTimeout(() => {
      setStyle({
        opacity: 0,
        transition: "all 0.1s ease",
      });
    }, 4000); // Fade out after 4 seconds
  };

  return (
    <>
      <Box mt={12} position="relative">
        {/* Main background image */}
        <Box
          width={1}
          component="img"
          src="/images/main.jpg"
          alt="Main Background"
        ></Box>
        <Box
          position="absolute"
          top={0}
          left={0}
          width={1}
          height={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            border="1px dashed #FFFFFF"
            borderRadius={100}
            padding={0.5}
            width={1}
            maxWidth={{ xl: 0.7, lg: 0.85, md: 0.9, sm: 1, xs: 1 }}
          >
            <Box
              bgcolor="#FFFFFFD9"
              borderRadius={100}
              padding={{ xl: 2, lg: 2, md: 1.5, sm: 1, xs: 1 }}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width={1}
                className="font-inter"
                style={style}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={2}
                >
                  <Typography
                    textAlign="center"
                    fontFamily="'Philosopher', sans-serif"
                    sx={{
                      fontSize: { xl: 35, lg: 30, md: 25, sm: 18, xs: 15 },
                      fontWeight: 400,
                      color: "#232323",
                    }}
                  >
                    <Trans
                      i18nKey={newName}
                      components={{
                        blue: <span style={{ color: "#0C5ADB" }} />,
                        pink: <span style={{ color: "#F22587" }} />,
                      }}
                    />
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ImageCarousel;
