import "./assets/main.scss";

import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faComments, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Hls from "hls.js";

library.add(faComments);
library.add(faHeart);
library.add(faChevronLeft);
library.add(faChevronRight);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
