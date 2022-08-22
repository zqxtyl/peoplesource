import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import createVuexPersisted from 'vuex-persistedstate'
import permission from './modules/permission'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permission
  },
  getters,
  plugins:[
    createVuexPersisted({
      reducer(state){
        //console.log(state,'state')
        return {
          user:{
            token:state.user.token
          }
        }
      } 
    })
  ]
})

export default store
