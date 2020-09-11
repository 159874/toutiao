import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

const TOKEN_KEY = 'user_token'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      setItem(TOKEN_KEY, user)
    }
  },
  actions: {},
  modules: {}
})
