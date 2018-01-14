import Vue from 'vue';
import constants from '../assets/constants'

export default {
  getItems() {
    console.log("getItems")
    return new Promise((resolve, reject) => {
      Vue.http.get(constants.serverIp + 'drive').then((resp) => {
        const drives = resp.body;
        resolve(drives);
      });
    });
  },
};
