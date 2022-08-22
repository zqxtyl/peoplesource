import {getUserDetailInfoApi, getUserInfoApi, login} from '@/api/user';
import { setTokenTime } from '@/utils/auth';
import {resetRouter} from '@/router'

const getDefaultState = () => {
  return {
    token:'',
    userInfo:{}
  }
}

const state = getDefaultState()

const mutations = {
  SETTOKEN(state,paylod){
    state.token=paylod
    setTokenTime()
  },
  GETUSERINFO(state,info){
    state.userInfo=info
  }
}

const actions = {
 async setToken(context,payload){
    const data = await login(payload)
    console.log(data)
    context.commit('SETTOKEN',data)
  },
  async  getUserInfo(context){
   const UserBaseInfo =await getUserInfoApi()
   const UserDetailInfo = await getUserDetailInfoApi(UserBaseInfo.userId)
   context.commit('GETUSERINFO',{...UserBaseInfo,...UserDetailInfo})
   // action 通过return将数据传递出去，类似permission中的then
   return UserBaseInfo
  },
  // 退出
  logout(context){
    context.commit('SETTOKEN','')
    context.commit('GETUSERINFO',{})
    resetRouter()
    context.commit('permission/setRoles',[],{root:true})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

