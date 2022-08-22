
import router,{asyncRoutes,constantRoutes} from "@/router";
export default {
  namespaced: true,
  state: {
    routes: [],
    points:[]
  },
  mutations: {
    setRoles(state,routes){
        state.routes=[...constantRoutes,...routes]
    },
    setPoint(state,payload){
      state.points=payload
    }
  },
  actions: {
    permissionAction(context,roles) {
      const routes = asyncRoutes.filter((item) => {
        // console.log(item.meta.id);
        console.log(roles);
        return roles.menus.includes(item.meta.id);
      });
      // console.log(routes);
      context.commit('setRoles',routes)
      router.addRoutes([
        ...routes,
        { path: "*", redirect: "/404", hidden: true },
      ]);
    },
    getPoint(context,points){
      context.commit('setPoint',points)
    }
  },
};
