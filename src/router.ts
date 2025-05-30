import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Slide from "./components/Slide.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:slideIndex(\\d+)?",
    name: "Slide",
    component: Slide,
    props: (route: { params: { slideIndex?: string } }) => ({
      slideIndex: Number(route.params.slideIndex) || 0,
    }),
  },
  {
    path: "/example",
    name: "Todo App",
    component: () => import("./example/TodoApp.vue"),
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
