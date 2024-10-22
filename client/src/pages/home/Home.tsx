import "@fontsource/inter";
import BreakingNew from "components/home/home/BreakingNew";
import CompanyProducts from "components/home/home/CompanyProducts";
import CustomerFeedback from "components/home/home/CustomerFeedback";
import CustomersCooperate from "components/home/home/CustomersCooperate";
import DevelopmentFigures from "components/home/home/DevelopmentFigures";
import ImageCarousel from "components/home/home/ImageCarousel";
import PartnerLogo from "components/home/home/PartnerLogo";
import ServiceList from "components/home/home/ServiceList";
import TrialUse from "components/home/home/TrialUse";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

/**
 * Home: The main component for the home page.
 * It displays various sections of the home page including
 * an image carousel, service list, development figures, trial use section,
 * latest news, customer cooperation, customer feedback, company products,
 * and partner logos. The component sets the page title using Helmet and
 * utilizes the translation hook for localization.
 *
 * @component
 * @returns {JSX.Element} The rendered home page component
 */
const Home = (): JSX.Element => {
  // Translation hook for localization
  const { t } = useTranslation("common");

  return (
    <>
      <Helmet>
        <title>{t("appName")}</title>
      </Helmet>
      {/* Carousel showcasing images */}
      <ImageCarousel />
      {/* List of services offered */}
      <ServiceList />
      {/* Section displaying development figures */}
      <DevelopmentFigures />
      {/* Section for trial use offers */}
      <TrialUse />
      {/* Latest breaking news */}
      <BreakingNew />
      {/* Customers who cooperate with the company */}
      <CustomersCooperate />
      {/* Customer feedback and testimonials */}
      <CustomerFeedback />
      {/* Products offered by the company */}
      <CompanyProducts />
      {/* Logos of partners */}
      <PartnerLogo />
    </>
  );
};

export default Home;
