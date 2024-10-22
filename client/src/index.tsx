import "bootstrap/dist/css/bootstrap.css";
import i18n from "i18nextConf";
import LayoutAdmin from "layouts/LayoutAdmin";
// import LayoutAgriculture from "layouts/LayoutAgriculture";
import LayoutAuthentication from "layouts/LayoutAuthentication";
import LayoutHome from "layouts/LayoutHome";
import LayoutNews from "layouts/LayoutNews";
import RequiredAuth from "pages/auth/RequiredAuth";
import { Suspense, lazy, useLayoutEffect } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "stores/configureStore";
import App from "./App";
import "./index.css";
const FaceFarmProductionLogPage = lazy(
  () => import("pages/home/product/FaceFarmProductionLog")
);
const WACACooperativeAccountantPage = lazy(
  () => import("pages/home/product/WACACooperativeAccountant")
);
const CompliancePrinciplesPage = lazy(
  () => import("pages/home/company/CompliancePrinciples")
);
const ContactPage = lazy(() => import("pages/home/Contact"));
const MessagePage = lazy(() => import("pages/home/company/Message"));
const OverviewPage = lazy(() => import("pages/home/company/Overview"));
const PersonnelPage = lazy(() => import("pages/home/company/Personnel"));
const PhilosophyPage = lazy(() => import("pages/home/company/Philosophy"));
const RecruitPage = lazy(() => import("pages/home/recruit/Recruit"));
const SorimachiGroupPage = lazy(
  () => import("pages/home/company/SorimachiGroup")
);
const SpecialPage = lazy(() => import("pages/home/company/Special"));
const NewsPage = lazy(() => import("pages/home/news/News"));
const NewsDetailsPage = lazy(() => import("pages/home/news/NewsDetails"));
// const AgriculturePage = lazy(
//   () => import("pages/home/agriculture/Agriculture")
// );
// const AgricultureDetailsPage = lazy(
//   () => import("pages/home/agriculture/AgricultureDetails")
// );
const HomePage = lazy(() => import("pages/home/Home"));
const NotFoundPage = lazy(() => import("pages/home/NotFound"));
const SDGsPage = lazy(() => import("pages/home/SDGs"));
const OffshoreServicesPage = lazy(
  () => import("pages/home/service/OffshoreServices")
);
const VietnamMarketPage = lazy(
  () => import("pages/home/service/VietnamMarket")
);
const SignUpPage = lazy(() => import("pages/auth/SignUp"));
const SignInPage = lazy(() => import("pages/auth/SignIn"));
const ForgotPasswordPage = lazy(() => import("pages/auth/ForgotPassword"));
const ResetPasswordPage = lazy(() => import("pages/auth/ResetPassword"));
const VerifyPage = lazy(() => import("pages/auth/Verify"));
const UnAuthorizePage = lazy(() => import("pages/auth/UnAuthorize"));
const DashboardAdminPage = lazy(() => import("pages/admin/DashboardAdmin"));
const PartnerAdminPage = lazy(() => import("pages/admin/PartnerAdmin"));
const ContactAdminPage = lazy(() => import("pages/admin/contact/ContactAdmin"));
const ContactModeAdminPage = lazy(
  () => import("pages/admin/contact/ContactModeAdmin")
);
const FeedbackAdminPage = lazy(
  () => import("pages/admin/feedback/FeedbackAdmin")
);
const FeedbackModeAdminPage = lazy(
  () => import("pages/admin/feedback/FeedbackModeAdmin")
);
const CooperativeAdminPage = lazy(() => import("pages/admin/CooperativeAdmin"));
const NewsAdminPage = lazy(() => import("pages/admin/news/NewsAdmin"));
const NewsModeAdminPage = lazy(() => import("pages/admin/news/NewsModeAdmin"));
const NewsReviewAdminPage = lazy(
  () => import("pages/admin/news/NewsReviewAdmin")
);
const AgricultureAdminPage = lazy(
  () => import("pages/admin/agriculture/AgricultureAdmin")
);
const AgricultureModeAdminPage = lazy(
  () => import("pages/admin/agriculture/AgricultureModeAdmin")
);
const AgricultureReviewAdminPage = lazy(
  () => import("pages/admin/agriculture/AgricultureReviewAdmin")
);
const TagAdminPage = lazy(() => import("pages/admin/agriculture/TagAdmin"));
const PersonnelAdminPage = lazy(
  () => import("pages/admin/personnel/PersonnelAdmin")
);
const PersonnelModeAdminPage = lazy(
  () => import("pages/admin/personnel/PersonnelModeAdmin")
);
const SettingAdminPage = lazy(() => import("pages/admin/SettingAdmin"));

// Wrapper component to reset scroll position on route change
const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

// Set base language from URL path
const { pathname } = window.location;
let lang = "/";
if (pathname !== "/") lang += pathname.split("/")[1];

// Configure router with routes and layout components
const container = document.getElementById("root") as HTMLElement;
const router = createBrowserRouter(
  [
    {
      element: (
        <Wrapper>
          <Outlet />
        </Wrapper>
      ),
      children: [
        {
          element: <LayoutHome />,
          children: [
            {
              path: "/",
              element: <HomePage />,
            },
            {
              path: "/sdgs",
              element: <SDGsPage />,
            },
            {
              path: "/news",
              element: <LayoutNews />,
              children: [
                {
                  path: "/news/:year",
                  element: <NewsPage />,
                },
                {
                  path: "/news/:year/:id",
                  element: <NewsDetailsPage />,
                },
              ],
            },
            {
              path: "/company",
              element: <Outlet />,
              children: [
                {
                  path: "/company/message",
                  element: <MessagePage />,
                },
                {
                  path: "/company/special",
                  element: <SpecialPage />,
                },
                {
                  path: "/company/overview",
                  element: <OverviewPage />,
                },
                {
                  path: "/company/philosophy",
                  element: <PhilosophyPage />,
                },
                {
                  path: "/company/sorimachiTechGroup",
                  element: <SorimachiGroupPage />,
                },
                {
                  path: "/company/compliancePrinciples",
                  element: <CompliancePrinciplesPage />,
                },
                {
                  path: "/company/personnel",
                  element: <PersonnelPage />,
                },
              ],
            },
            {
              path: "/recruit",
              element: <RecruitPage />,
            },
            {
              path: "/contact",
              element: <ContactPage />,
            },
            {
              path: "/product",
              element: <Outlet />,
              children: [
                {
                  path: "/product/wACACooperativeAccountant",
                  element: <WACACooperativeAccountantPage />,
                },
                {
                  path: "/product/faceFarmProductionLog",
                  element: <FaceFarmProductionLogPage />,
                },
              ],
            },
            {
              path: "/services",
              element: <Outlet />,
              children: [
                {
                  path: "/services/vietnamMarket",
                  element: <VietnamMarketPage />,
                },
                {
                  path: "/services/offshoreServices",
                  element: <OffshoreServicesPage />,
                },
              ],
            },
            // {
            //   path: "/agricultureJp",
            //   element: <LayoutAgriculture/>,
            //   children: [
            //     {
            //       path: "/agricultureJp/",
            //       element: <AgriculturePage/>,
            //     },
            //     {
            //       path: "/agricultureJp/:tag",
            //       element: <AgriculturePage/>,
            //     },
            //     {
            //       path: "/agricultureJp/detail/:id",
            //       element: <AgricultureDetailsPage/>,
            //     },
            //   ],
            // },
            {
              path: "/*",
              element: <NotFoundPage />,
            },
          ],
        },
        {
          path: "/admin",
          element: <Outlet />,
          children: [
            {
              path: "/admin/auth",
              element: <LayoutAuthentication />,
              children: [
                {
                  path: "/admin/auth/signup",
                  element: <SignUpPage />,
                },
                {
                  path: "/admin/auth/signin",
                  element: <SignInPage />,
                },
                {
                  path: "/admin/auth/forgotPassword",
                  element: <ForgotPasswordPage />,
                },
                {
                  path: "/admin/auth/resetPassword/:id/:resetString",
                  element: <ResetPasswordPage />,
                },
                {
                  path: "/admin/auth/verify/:id/:loginString",
                  element: <VerifyPage />,
                },
              ],
            },
            {
              path: "/admin/auth/unauthorize",
              element: <UnAuthorizePage />,
            },
            {
              element: <RequiredAuth allowPermissions={["admin"]} />,
              children: [
                {
                  element: <LayoutAdmin />,
                  children: [
                    {
                      path: "/admin/dashboard",
                      element: <DashboardAdminPage />,
                    },
                    {
                      path: "/admin/partner",
                      element: <PartnerAdminPage />,
                    },
                    {
                      path: "/admin/cooperative",
                      element: <CooperativeAdminPage />,
                    },
                    {
                      path: "/admin/contact",
                      element: <Outlet />,
                      children: [
                        {
                          path: "/admin/contact/",
                          element: <ContactAdminPage />,
                        },
                        {
                          path: "/admin/contact/:mode/:id",
                          element: <ContactModeAdminPage />,
                        },
                        {
                          path: "/admin/contact/:mode",
                          element: <ContactModeAdminPage />,
                        },
                      ],
                    },
                    {
                      path: "/admin/feedback",
                      element: <Outlet />,
                      children: [
                        {
                          path: "/admin/feedback/",
                          element: <FeedbackAdminPage />,
                        },
                        {
                          path: "/admin/feedback/:mode/:id",
                          element: <FeedbackModeAdminPage />,
                        },
                        {
                          path: "/admin/feedback/:mode",
                          element: <FeedbackModeAdminPage />,
                        },
                      ],
                    },
                    {
                      path: "/admin/news",
                      element: <Outlet />,
                      children: [
                        {
                          path: "/admin/news/",
                          element: <NewsAdminPage />,
                        },
                        {
                          path: "/admin/news/:mode/:id",
                          element: <NewsModeAdminPage />,
                        },
                        {
                          path: "/admin/news/:mode",
                          element: <NewsModeAdminPage />,
                        },
                        {
                          path: "/admin/news/review/:id",
                          element: <NewsReviewAdminPage />,
                        },
                      ],
                    },
                    {
                      path: "/admin/agriculture",
                      element: <Outlet />,
                      children: [
                        {
                          path: "/admin/agriculture/",
                          element: <AgricultureAdminPage />,
                        },
                        {
                          path: "/admin/agriculture/:mode/:id",
                          element: <AgricultureModeAdminPage />,
                        },
                        {
                          path: "/admin/agriculture/:mode",
                          element: <AgricultureModeAdminPage />,
                        },
                        {
                          path: "/admin/agriculture/review/:id",
                          element: <AgricultureReviewAdminPage />,
                        },
                        {
                          path: "/admin/agriculture/tag",
                          element: <TagAdminPage />,
                        },
                        {
                          path: "/admin/agriculture/tag/:mode",
                          element: <TagAdminPage />,
                        },
                        {
                          path: "/admin/agriculture/tag/:mode/:id",
                          element: <TagAdminPage />,
                        },
                      ],
                    },
                    {
                      path: "/admin/personnel",
                      element: <Outlet />,
                      children: [
                        {
                          path: "/admin/personnel/",
                          element: <PersonnelAdminPage />,
                        },
                        {
                          path: "/admin/personnel/:mode/:id",
                          element: <PersonnelModeAdminPage />,
                        },
                        {
                          path: "/admin/personnel/:mode",
                          element: <PersonnelModeAdminPage />,
                        },
                      ],
                    },
                    {
                      path: "/admin/setting",
                      element: <Outlet />,
                      children: [
                        {
                          path: "/admin/setting/",
                          element: <SettingAdminPage />,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  { basename: lang }
);

createRoot(container).render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <HelmetProvider>
        <Suspense fallback={<p />}>
          <App>
            <RouterProvider router={router} />
          </App>
          <ToastContainer />
        </Suspense>
      </HelmetProvider>
    </I18nextProvider>
  </Provider>
);
