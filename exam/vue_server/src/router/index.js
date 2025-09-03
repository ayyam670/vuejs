import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import BoardList from "../views/BoardList.vue";
import BoardInfo from "../views/BoardInfo.vue";
import BoardForm from "../views/BoardForm.vue";

const routes = [
  {
    path: "/",
    name: "MainView",
    component: MainView,
  },
  {
    path: "/list",
    name: "BoardList",
    component: BoardList,
  },
  {
    path: "/info/:no",
    name: "BoardInfo",
    component: BoardInfo,
    props: true,
  },
  {
    path: "/form",
    name: "BoardForm",
    component: BoardForm,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
