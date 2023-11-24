import { createRouter, createWebHistory } from "vue-router";
import VueCookies from "vue-cookies";

const routes = [
  {
    name: "登录",
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
  {
    name: "框架页",
    path: "/home",
    component: () => import("../views/Framework.vue"),
    redirect: "/blog/list",
    children: [
      {
        name: "博客管理",
        path: "/blog/list",
        component: () => import("../views/blog/Blog.vue"),
      },
      {
        name: "分类管理",
        path: "/blog/category",
        component: () => import("../views/blog/BlogCategroy.vue"),
      },
    ],
  },
];

//这里不是通过new来创建，通过createrRouter方法创建，使用的的模式不是通过mode来定义
const router = createRouter({
  routes,
  history: createWebHistory(),
});
router.beforeEach((to, from, next) => {
  const userInfo = VueCookies.get("userInfo");
  //暂未实现将信息放到cookie中，所以下方!userInfo一直为false,导致登录成功无法跳转页面。故将！去除
  if (userInfo && to.path !== "/login") {
    router.push("/login");
  }
  next();
});

export default router;
