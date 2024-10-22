import Cookies from "js-cookie";

const accessTokenKey = "access_token";
const refreshTokenKey = "refresh_token";
const objCookies = {
  expires: 30,
  domain: process.env.COOKIE_DOMAIN,
};

/**
 * Saves or removes tokens from cookies.
 *
 * @function saveToken
 * @param {string} access_token - The access token to save.
 * @param {string} refresh_token - The refresh token to save.
 * If either token is missing, the function removes both tokens from cookies.
 */
export const saveToken = (access_token: any, refresh_token: any) => {
  if (access_token && refresh_token) {
    Cookies.set(accessTokenKey, access_token, {
      ...objCookies,
    });
    Cookies.set(refreshTokenKey, refresh_token, {
      ...objCookies,
    });
  } else {
    Cookies.remove(accessTokenKey, {
      ...objCookies,
      path: "/",
      domain: process.env.COOKIE_DOMAIN,
    });
    Cookies.remove(refreshTokenKey, {
      ...objCookies,
      path: "/",
      domain: process.env.COOKIE_DOMAIN,
    });
  }
};

/**
 * Retrieves tokens from cookies.
 *
 * @function getToken
 * @returns {Object} An object containing the access and refresh tokens.
 */
export const getToken = () => {
  const access_token = Cookies.get(accessTokenKey);
  const refresh_token = Cookies.get(refreshTokenKey);

  return {
    access_token,
    refresh_token,
  };
};

/**
 * Logs out by removing tokens from cookies.
 *
 * @function logout
 */
export const logout = () => {
  const access_token = Cookies.get(accessTokenKey);
  if (access_token) {
    Cookies.remove(accessTokenKey, {
      ...objCookies,
      path: "/",
      domain: process.env.COOKIE_DOMAIN,
    });
    Cookies.remove(refreshTokenKey, {
      ...objCookies,
      path: "/",
      domain: process.env.COOKIE_DOMAIN,
    });
  }
};
