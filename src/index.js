import Vue from "vue";
import App from "./App.vue";

import Cache from "./classes/Cache";
import Api from "./classes/Api";

window.Cache = Cache;
window.Cache.MINUTE = 60;
window.Cache.HOUR = 60 * 60;
window.Cache.DAY = 60 * 60 * 24;

window.Api = Api;

window.App = window.App || {};
Object.assign(window.App, {
    VERSION: "v1.0.0-alpha.0",

    CACHE: {
        UUID: "UUID",
        TOKEN: "TOKEN",
        MODULES: "MODULES",
        SEMESTER: "SEMESTER",
        STUDIES_COURSES: "STUDIES_COURSES",
        MY_QUESTIONS: "MY_QUESTIONS",
        REPORTS: "REPORTS",
        USER_ME: "USER_ME",
        WALL_OF_FAME: "WALL_OF_FAME"
    }
});

new Vue({
    el: "#app",
    render: h => h(App)
});