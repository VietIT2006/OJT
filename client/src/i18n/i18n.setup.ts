import en from "./en.json"
import vi from "./vi.json"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
    en: {
        translation: en,
    },
    vi: {
        translation: vi
    }
};

i18n.use(initReactI18next).init({
    lng: localStorage.getItem("language") || "vi",
    resources,
})

export default i18n;