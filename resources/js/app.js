require("./bootstrap");
require("./assets/scss/main.scss");
import "vuetify/styles";
import { createApp } from "vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import router from "./router";
import { createStore } from "vuex";
import { createI18n } from "vue-i18n";
import en from "./locales/en";
import ar from "./locales/ar";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faHouse,
    faBowlRice,
    faClockRotateLeft,
    faWallet,
    faPercent,
    faGear,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Font Awesome Library
library.add(
    faHouse,
    faBowlRice,
    faClockRotateLeft,
    faWallet,
    faPercent,
    faGear,
    faMagnifyingGlass
);

// I18n Configurations
const messages = {
    en,
    ar,
};
const store = createStore({
    state: {
        appLanguage: localStorage.getItem("appLanguage") || "en",
    },
    getters: {
        getAppLanguage: (state) => state.appLanguage,
    },
    mutations: {
        setAppLanguage(state, language) {
            state.appLanguage = language;
            localStorage.setItem("appLanguage", language);
        },
    },
});
const i18n = createI18n({
    locale: store.getters.getAppLanguage,
    messages,
});

// Vuetify Configuration
const vuetify = createVuetify({
    components,
    directives,
});

const app = createApp({});
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(store);
app.use(i18n);
app.use(vuetify);
app.mount("#app");
