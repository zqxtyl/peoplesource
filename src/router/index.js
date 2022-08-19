import Vue from "vue";
import Router from "vue-router";
// 引入多个模块的规则
import approvalsRouter from "./modules/approvals";
import departmentsRouter from "./modules/departments";
import employeesRouter from "./modules/employees";
import permissionRouter from "./modules/permission";
import attendancesRouter from "./modules/attendances";
import salarysRouter from "./modules/salarys";
import settingRouter from "./modules/setting";
import socialRouter from "./modules/social";
import importModule from './modules/import'
Vue.use(Router);

/* Layout */
import Layout from "@/layout";
//静态路由
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

// 动态路由：准备好项目所有动态路由
export const asyncRoutes = [
  approvalsRouter,
  departmentsRouter,
  employeesRouter,
  permissionRouter,
  attendancesRouter,
  salarysRouter,
  settingRouter,
  socialRouter,
  importModule
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }), // 管理滚动行为 如果出现滚动 切换就让 让页面回到顶部
    routes: [...constantRoutes, ...asyncRoutes], // 临时合并所有的路由
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
