import { login, getUserInfo, userInfo } from "@/api/user";
export default {
  namespaced: true,
  state: {
    token: "",
    userInfo: {},
  },
  mutations: {
    getToken(state, payload) {
      state.token = payload;
    },
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    logout(state) {
      state.token = null;
    },
  },
  actions: {
    async getToken(context, data) {
      const res = await login(data);
      context.commit("getToken", res);
    },
    async getUserInfo(context) {
      const res = await getUserInfo();
      const user = await userInfo(res.userId);
      context.commit("setUserInfo", { ...res, ...user });
    },
    logout(context) {
      context.commit("logout");
    },
  },
};
