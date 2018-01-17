<template v-if="loading">
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-flex
          xs12
          sm6
          offset-sm3
          md8
          offset-md2
          text-xs-center
          layout
          align-center
          justify-center
          class="pa-4"
        >
          <v-badge overlap color="green">
            <span slot="badge" >{{item.seats-(item.users.length-1)}}</span>
            <v-avatar
              :tile="tile"
              :size="avatarSize"
              class="grey lighten-4"
            >
              <img v-bind:src="'../'+item.owner.picture" alt="avatar">
            </v-avatar>
          </v-badge>
        </v-flex>
        <v-list two-line>
          <v-list-tile @click="" disabled>
            <v-list-tile-action>
              <v-icon color="indigo">info</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{item.start}} - {{item.end}}</v-list-tile-title>
              <v-list-tile-sub-title>Kohti: {{item.seats-(item.users.length-1)}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="indigo">chat</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.owner.name"></v-list-tile-title>
              <v-list-tile-sub-title>Messenger</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-btn v-if="!subscribed"
                 :loading="loading3"
                 :disabled="loading3"
                 class="white--text"
                 @click="subscribe()" block large color="success">Liitu sõiduga
          </v-btn>
          <v-btn v-if="subscribed"
                 :loading="loading3"
                 :disabled="loading3"
                 class="white--text"
                 @click="unsubscribe()" block large color="primary">Eemalda end sõidult
          </v-btn>
          <v-btn @click="goBack()" block large color="error">Tagasi</v-btn>
        </v-list>
        <v-snackbar
          :timeout="timeout"
          :color="color"
          :multi-line="mode === 'multi-line'"
          :vertical="mode === 'vertical'"
          v-model="snackbar"
        >
          successfully subscribed
          <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
        <login></login>
      </v-card>
    </v-flex>
  </v-layout>

</template>


<script>
  //end-goal: show drive that was in the last view and then at the same time update the view with new data
  import constants from "../assets/constants"
  import {mapState} from 'vuex';
  export default {
    data: () => ({
      tile: false,
      snackbar: false,
      color: 'success',
      mode: 'multi-line',
      timeout: 6000,
      loader: null,
      loading3: false,
      subscribed: false,
      loading: true,
      avatarSize: '150px',
    }),
    asyncData ({store, route}) {
        console.log(route)
      this.id = route.params[0]
      // return the Promise from the action
      store.dispatch('loginToFacebook');
      return store.dispatch('fetchItem', route.params[0])
    },
    computed: mapState({
      item: state => state.item,
    }),
    watch: {
      // call again the method if the route changes
      //'$route': 'fetchData',
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      subscribe() {
        this.loader = 'loading3'
        this.loading = true
        this.$bus.$emit('facebook-login', true)
        /*this.$http.get(constants.serverIp + 'auth/facebook').then(response => {
            console.log(response)
        }, response => {

          this.error = response.toString()
        })*/
        /*this.$http.post(constants.serverIp + 'subscribe', {driveId: this.item._id}).then(response => {
          this.loading = false
          //TODO: replace with store update
          this.subscribed = true
          this.snackbar = true
          this.item = response.body;
        }, response => {
          this.loading = false
          this.error = response.toString()
        });*/
      },
      unsubscribe() {
        this.loader = 'loading3'
        this.snackbar = true
        this.loading = true
        this.subscribed = false
        this.$http.post(constants.serverIp + 'unsubscribe', {driveId: this.item._id, userId: "5a550373afce682023648f4b"}).then(response => {
          this.loading = false
          //TODO: replace with store update
          this.item = response.body;
        }, response => {
          this.loading = false
          this.error = response.toString()
        });
      }
    }
  }
</script>
