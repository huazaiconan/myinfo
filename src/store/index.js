import Vue from 'vue'
import Vuex from 'Vuex'
Vue.use(Vuex)
const SET_ADD = 'add/SET_ADD'
const store = new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    getCount (state) {
      return state.count
    }
  },
  mutations: {
    [SET_ADD] (state, count) {
      state.count += count
    }
  },
  actions: {
    toAdd ({ commit }, count) {
      commit('add', count)
    }
  }
})
export default store
