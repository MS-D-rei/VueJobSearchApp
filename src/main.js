import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "@/router";
import "@/assets/tailwind.css";

library.add(faSearch);
library.add(faAngleDown);
library.add(faAngleUp);
const pinia = createPinia();

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(pinia)
  .mount("#app");
