import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import JobSearchResultView from "@/views/JobSearchResultsView.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  {
    path: "/jobs/results",
    name: "JobSearchResults",
    component: JobSearchResultView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
