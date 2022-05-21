import { createApp } from "vue";
import App from "./App.vue";
import Toaster from "@meforma/vue-toaster";
const app = createApp(App);

app.use(Toaster);
app.mount('#app');
