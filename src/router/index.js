import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const JobSearchResultsView = () => import("@/views/JobSearchResultsView.vue");
const JobView = () => import("@/views/JobView.vue");

// /* webpackChunkName: "jobs" */ is for making chunk of lazy loading in webpack, Not Vite.
// const JobSearchResultsView = () => import(/* webpackChunkName: "jobs" */"@/views/JobSearchResultsView.vue");
// const JobView = () => import(/* webpackChunkName: "jobs" */"@/views/JobView.vue");

const routes = [
  { path: "/", name: "Home", component: HomeView },
  {
    path: "/jobs/results",
    name: "JobSearchResults",
    component: JobSearchResultsView,
  },
  {
    path: "/jobs/results/:id",
    name: "JobView",
    component: JobView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
