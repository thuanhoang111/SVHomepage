import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { authVerified } from "stores/auth/auth-slice";
import { useAppDispatch } from "stores/hooks";

/**
 * Verify: A component used to verify a user's email or login based on URL parameters.
 * It dispatches an action to verify the user upon component mount.
 *
 * @component
 * @returns {null} This component does not render any UI.
 */
const Verify = (): null => {
  // Retrieve 'id' and 'loginString' from the URL parameters
  const { id, loginString } = useParams<{
    id?: string;
    loginString?: string;
  }>();

  // Redux dispatch function
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Dispatch an action to verify the user with the provided 'id' and 'loginString'
    dispatch(authVerified({ userId: id, loginString }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This component does not render any UI
  return null;
};

export default Verify;
