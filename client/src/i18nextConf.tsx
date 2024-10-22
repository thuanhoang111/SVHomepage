import agricultureJapanJP from "assets/locales/jp/agricultureJapan.json";
import commonJP from "assets/locales/jp/common.json";
import compliancePrinciplesJP from "assets/locales/jp/compliancePrinciples.json";
import contactJP from "assets/locales/jp/contact.json";
import faceFarmProductionLogJP from "assets/locales/jp/faceFarmProductionLog.json";
import homeJP from "assets/locales/jp/home.json";
import messageJP from "assets/locales/jp/message.json";
import newsJP from "assets/locales/jp/news.json";
import notFoundPageJP from "assets/locales/jp/notFoundPage.json";
import offshoreServicesJP from "assets/locales/jp/offshoreServices.json";
import overviewJP from "assets/locales/jp/overview.json";
import personnelJP from "assets/locales/jp/personnel.json";
import philosophyJP from "assets/locales/jp/philosophy.json";
import recruitJP from "assets/locales/jp/recruit.json";
import sdgsJP from "assets/locales/jp/sdgs.json";
import sorimachiGroupJP from "assets/locales/jp/sorimachiGroup.json";
import specialJP from "assets/locales/jp/special.json";
import vietnamMarketJP from "assets/locales/jp/vietnamMarket.json";
import wACACooperativeAccountantJP from "assets/locales/jp/wACACooperativeAccountant.json";
import agricultureJapanVI from "assets/locales/vi/agricultureJapan.json";
import commonVI from "assets/locales/vi/common.json";
import compliancePrinciplesVI from "assets/locales/vi/compliancePrinciples.json";
import contactVI from "assets/locales/vi/contact.json";
import faceFarmProductionLogVI from "assets/locales/vi/faceFarmProductionLog.json";
import homeVI from "assets/locales/vi/home.json";
import messageVI from "assets/locales/vi/message.json";
import newsVI from "assets/locales/vi/news.json";
import notFoundPageVI from "assets/locales/vi/notFoundPage.json";
import offshoreServicesVI from "assets/locales/vi/offshoreServices.json";
import overviewVI from "assets/locales/vi/overview.json";
import personnelVI from "assets/locales/vi/personnel.json";
import philosophyVI from "assets/locales/vi/philosophy.json";
import recruitVI from "assets/locales/vi/recruit.json";
import sdgsVI from "assets/locales/vi/sdgs.json";
import sorimachiGroupVI from "assets/locales/vi/sorimachiGroup.json";
import specialVI from "assets/locales/vi/special.json";
import vietnamMarketVI from "assets/locales/vi/vietnamMarket.json";
import wACACooperativeAccountantVI from "assets/locales/vi/wACACooperativeAccountant.json";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

/**
 * Configures i18next for localization in Japanese and Vietnamese.
 *
 * @description
 * - **`lang`**: Determines the language from the URL.
 * - **`fallbackLng`**: Defaults to Vietnamese if the detected language is unavailable.
 * - **`resources`**: Holds translation data for each language.
 * - **`interpolation.escapeValue`**: React handles escaping, so this is disabled.
 * - **`react.transKeepBasicHtmlNodesFor`**: Preserves specific HTML tags in translations.
 */
const lang = window.location.pathname.split("/")[1];

const fallbackLng = ["vi"];

const resources = {
  jp: {
    common: commonJP,
    news: newsJP,
    faceFarmProductionLog: faceFarmProductionLogJP,
    wACACooperativeAccountant: wACACooperativeAccountantJP,
    personnel: personnelJP,
    message: messageJP,
    compliancePrinciples: compliancePrinciplesJP,
    sdgs: sdgsJP,
    special: specialJP,
    philosophy: philosophyJP,
    overview: overviewJP,
    sorimachiGroup: sorimachiGroupJP,
    recruit: recruitJP,
    contact: contactJP,
    notFoundPage: notFoundPageJP,
    offshoreServices: offshoreServicesJP,
    vietnamMarket: vietnamMarketJP,
    home: homeJP,
    agricultureJapan: agricultureJapanJP,
  },
  vi: {
    common: commonVI,
    news: newsVI,
    faceFarmProductionLog: faceFarmProductionLogVI,
    wACACooperativeAccountant: wACACooperativeAccountantVI,
    personnel: personnelVI,
    message: messageVI,
    compliancePrinciples: compliancePrinciplesVI,
    sdgs: sdgsVI,
    special: specialVI,
    philosophy: philosophyVI,
    overview: overviewVI,
    sorimachiGroup: sorimachiGroupVI,
    recruit: recruitVI,
    contact: contactVI,
    notFoundPage: notFoundPageVI,
    offshoreServices: offshoreServicesVI,
    vietnamMarket: vietnamMarketVI,
    home: homeVI,
    agricultureJapan: agricultureJapanVI,
  },
};

i18n
  .use(Backend) // load translations using http (default assets/locals/vi/translations)
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    resources,
    fallbackLng, // fallback language is vi.
    lng: lang,
    interpolation: {
      escapeValue: false, // no need for react. it escapes by default
    },
    react: {
      transKeepBasicHtmlNodesFor: ["br", "strong", "i"],
    },
  });
export default i18n;
