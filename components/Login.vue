<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Facebook Login</v-toolbar-title>
        </v-toolbar>

              <iframe v-bind:srcdoc="facebook" style="width: 100%; position: absolute; height: 100%; border: none">
              </iframe>

      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    asyncData ({store, route}) {
      return store.dispatch('loginToFacebook');
    },
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false
      }
    },
    computed: mapState({
      facebook: state => state.facebook,
    }),
    mounted() {
      this.$bus.$on('facebook-login', function(data){
        console.log("facebook-login");
        this.dialog = data
      }.bind(this))
    }
  }
</script>
