import { Grid } from "@mui/material";
import FooterAdmin from "components/admin/FooterAdmin";
import HeaderAdmin from "components/admin/HeaderAdmin";
import SideBarAdmin from "components/admin/SideBarAdmin";
import { Outlet } from "react-router-dom";

/**
 * LayoutAdmin: Provides a responsive admin dashboard layout with a header, sidebar, content area, and footer.
 *
 * Uses Material-UI's Grid system:
 * - Sidebar (`SideBarAdmin`): 2 columns wide with a background color.
 * - Content area (`Outlet`): 10 columns wide with padding.
 *
 * @returns {JSX.Element} The complete layout with header, sidebar, content area, and footer.
 */
const LayoutAdmin = (): JSX.Element => {
  return (
    <>
      {/* Header component */}
      <HeaderAdmin />
      <Grid container columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
        {/* Sidebar component with fixed width */}
        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} bgcolor="#F9FAFC">
          <SideBarAdmin />
        </Grid>
        {/* Main content area with padding */}
        <Grid
          padding="80px 80px 120px 80px"
          item
          xl={10}
          lg={10}
          md={10}
          sm={10}
          xs={10}
        >
          <Outlet />
        </Grid>
      </Grid>
      {/* Footer component */}
      <FooterAdmin />
    </>
  );
};

export default LayoutAdmin;
