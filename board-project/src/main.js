import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

createApp(App).use(store).mount("#app");

window.Kakao.init("83f7e75f2bfbf882a1220285f7e4d003");
