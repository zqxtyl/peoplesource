const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.userInfo.username, // 对于用户名快捷访问
  userId: (state) => state.user.userInfo.userId,
  staffPhoto: (state) => state.user.userInfo.staffPhoto, // 头像快捷访问
  companyId: (state) => state.user.userInfo.companyId, // 建立对于公司ID的快捷访问
};
export default getters;
