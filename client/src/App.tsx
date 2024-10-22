import "@fontsource/inter";
import KeyboardControlKeyIcon from "@mui/icons-material/KeyboardControlKey";
import { useEffect, useState } from "react";
import ScrollToTop from "react-scroll-to-top";
import { authRefreshToken, authUpdateUser } from "stores/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "stores/hooks";
import { getToken, logout } from "utils/auth";
import "./App.module.css";

/**
 * Main application component that handles user authentication and provides UI elements.
 *
 * @component
 * @param {React.ReactNode} children - The child components to be rendered within this component.
 * @returns {JSX.Element} The rendered `App` component with authentication logic and a scroll-to-top button.
 */
function App({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Update user information or handle token refresh based on the current user state
    if (user && user._id) {
      const { access_token } = getToken();
      dispatch(
        authUpdateUser({
          user: user,
          accessToken: access_token,
        })
      );
    } else {
      const { refresh_token } = getToken();
      if (refresh_token) {
        dispatch(authRefreshToken(refresh_token));
      } else {
        dispatch(
          authUpdateUser({
            user: undefined,
            accessToken: null,
          })
        );
        logout();
      }
    }
  }, [dispatch, user]);

  const [hover, setHover] = useState(false);
  const { pathname } = window.location;

  useEffect(() => {
    // Redirect to Vietnamese version if the current path is the root
    if (pathname === "/") window.location.replace("/vi/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {children}
      <ScrollToTop
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        smooth
        component={
          <KeyboardControlKeyIcon
            sx={{
              fontSize: 25,
              color: "white",
              transform: hover ? "translateY(-10px)" : "",
              transition: "all 0.5s ease",
            }}
          />
        }
        style={{
          width: 50,
          height: 50,
          zIndex: 20,
          right: "0px !important",
          background: hover
            ? "linear-gradient(-223.36deg, #0C5ADB 51.17%, #1052C0 51.18%)"
            : "linear-gradient(223.36deg, #0C5ADB 51.17%, #1052C0 51.18%)",
        }}
      />
    </>
  );
}

export default App;
