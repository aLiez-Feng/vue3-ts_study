import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/home/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/mine",
    name: "Mine",
    component: () =>
      import(/* webpackChunkName: "mine" */ "../views/mine/index.vue"),
    /* webpackChunkName: "about"  代表的是 代码分割依靠的是jsonp ，  加载jsonp的这个js文件的名字就是这里的名字*/
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/profile/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
