import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import generatedRoutes from "virtual:generated-pages";
import { setupLayouts } from "virtual:generated-layouts";
import { createHead } from "@unhead/vue";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);
const head = createHead();
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(generatedRoutes),
});
const pinia = createPinia();
app.use(head);
app.use(router);
app.use(pinia);
app.mount("#app");
