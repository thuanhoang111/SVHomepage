import { Helmet } from "react-helmet-async";

/**
 * DashboardAdmin: A simple component that displays a welcome message
 * for the Sorimachi Vietnam dashboard.
 *
 * This component is designed as a placeholder or landing page for the
 * admin dashboard. It currently displays a static welcome message.
 *
 * @component
 * @returns {JSX.Element} The rendered component containing a welcome message
 */
const DashboardAdmin = (): JSX.Element => {
  return (
    <>
      {/* Sets the document title for the page */}
      <Helmet>
        <title>Dashboard | Admin</title>
      </Helmet>
      // Container for the welcome message
      <div>
        {/* Welcome message for Sorimachi Vietnam */}
        Welcome to Sorimachi Vietnam
      </div>
    </>
  );
};

export default DashboardAdmin;
