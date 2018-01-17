import Vue from 'vue'
import Vuex from 'vuex'
import driveService from '../services/driveservice';

Vue.use(Vuex)

export function createStore() {
  console.log("createStore")
  return new Vuex.Store({
    state: {
      items: [],
      item: {},
      error: null,
      facebook: {},
    },

    actions: {
      getDrives({commit}) {
        console.log("getDrives")
        return driveService.getItems().then(
          (items) => commit('updateDrive', items),
          (err) => commit('updateError', err)
        );
      },
      fetchItem({commit}, id) {
        console.log("fetchItem")
        return driveService.getItem(id).then(
          (item) => commit('setItem', {id, item}),
          (err) => commit('updateError', err)
        );
      },
      loginToFacebook({commit}) {
        console.log("loginToFacebook")
        return driveService.getFacebookLogin().then(
          (item) => commit('facebookLogin', item),
          (err) => commit('updateError', err)
        );
      },
    },

    mutations: {
      facebookLogin (state, item) {
        state.facebook = item
      },
      setItem (state, {id, item}) {
        //Vue.set(state.items, id, item)
        state.item = item;
        console.log("setItem "+ id, state.item)
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
