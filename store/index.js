import Vue from 'vue'
import Vuex from 'vuex'
import driveService from '../services/driveservice';

Vue.use(Vuex)

export function createStore() {
  console.log("createStore")
  return new Vuex.Store({
    state: {
      items: [],
      error: null,
    },

    actions: {
      getDrives({commit}) {
        console.log("getDrives")
        return driveService.getItems().then(
          (items) => commit('updateDrive', items),
          (err) => commit('updateError', err)
        );
      },
    },

    mutations: {
      setItem (state, {id, item}) {
        Vue.set(state.items, id, item)
      },
      updateDrive(state, payload) {
        console.log(payload)
        state.items = payload;
      },
      updateError(state, payload) {
        console.log(payload)
        state.error = payload;
      }
    },

    getters: {}
  })
}
