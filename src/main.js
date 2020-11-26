import { createApp } from "vue";
import "./scss/index.scss";

import App from "./App.vue";
import BaseButton from "./share/BaseButton.vue";

const app = createApp(App);

app.component("base-button", BaseButton);

app.mount("#movie-app");
