import ContactFooter from "components/home/common/ContactFooter";
import ContactHeader from "components/home/common/ContactHeader";
import NavigationBar from "components/home/common/NavigationBar";
import { Outlet } from "react-router-dom";

/**
 * LayoutHome: A component for rendering the main layout of the home page.
 *
 * This component sets up the layout for the home page, including a contact header, navigation bar, main content area, and a contact footer. It uses the `Outlet` component to render nested routes, allowing for dynamic content to be displayed within the layout.
 *
 * @component
 * @returns {JSX.Element} The rendered LayoutHome component with header, navigation, main content, and footer.
 */
const LayoutHome = (): JSX.Element => {
  return (
    <>
      {/* Renders the contact header */}
      <ContactHeader />
      {/* Renders the navigation bar */}
      <NavigationBar />
      {/* Renders nested routes or main content */}
      <Outlet />
      {/* Renders the contact footer */}
      <ContactFooter />
    </>
  );
};

export default LayoutHome;
