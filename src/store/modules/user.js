import { login, getUserInfo, userInfo } from "@/api/user";
import {setTokenTime} from '@/utils/auth'
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
  },
  actions: {
    async getToken(context, data) {
      const res = await login(data);
      context.commit("getToken", res);
      setTokenTime();
    },
    async getUserInfo(context) {
      const res = await getUserInfo();
      const user = await userInfo(res.userId);
      context.commit("setUserInfo", { ...res, ...user });
    },
    logout(context) {
      context.commit("getToken", "");
      context.commit("setUserInfo", {});
    },
  },
};
