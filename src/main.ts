import "./assets/main.scss";

import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faComments, faHeart } from "@fortawesome/free-regular-svg-icons";

library.add(faComments);
library.add(faHeart);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
