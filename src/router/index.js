import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const JobSearchResultsView = () => import("@/views/JobSearchResultsView.vue");
const JobView = () => import("@/views/JobView.vue");
const TeamsView = () => import("@/views/TeamsView.vue");

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
  {
    path: "/teams",
    name: "TeamsView",
    component: TeamsView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0 };
  },
});

export default router;
