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
            <span slot="badge" v-html="item.seats"></span>
            <v-avatar
              :tile="tile"
              :size="avatarSize"
              class="grey lighten-4"
            >
              <img v-bind:src="item.owner.picture" alt="avatar">
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
              <v-list-tile-sub-title>Kohti: {{item.seats}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="indigo">chat</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.name"></v-list-tile-title>
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
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
  import constants from "../assets/constants"
  export default {
    data: () => ({
      slider: 150,
      tile: false,
      item: null,
      snackbar: false,
      color: 'success',
      mode: 'multi-line',
      timeout: 6000,
      loader: null,
      loading3: false,
      subscribed: false,
      loading: true
    }),
    asyncData ({store, route}) {
      // return the Promise from the action
      return store.dispatch('fetchItem', route.params.id)
    },
    computed: {
      avatarSize () {
        return `${this.slider}px`
      },
      // display the item from store state.
      item () {
        return this.$store.state.items[this.$route.params.id]
      }
    },
    beforeRouteEnter (to, from, next) {
      this.fetchData(function () {
        next()
      })
    },
    created () {
      // fetch the data when the view is created and the data is
      // already being observed

    },
    watch: {
      // call again the method if the route changes
      '$route': 'fetchData',
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    },
    methods: {
      fetchData (done) {
        this.loading = true
        this.$http.get(constants.serverIp + "drive/" + this.$route.params[0] + '').then(response => {
          this.loading = false
          this.item = response.body;
          console.log(response.body)
          done()
        }, response => {
          this.loading = false
          this.error = response.toString()
          done()
        });

      },
      goBack() {
        this.$router.go(-1)
      },
      subscribe() {
        this.loader = 'loading3'
        this.snackbar = true
        this.loading = true
        this.subscribed = true
        this.$http.post('posturl').then(response => {
          this.loading = false
          this.item = response.body;
        }, response => {
          this.loading = false
          this.error = response.toString()
        });
      },
      unsubscribe() {
        this.loader = 'loading3'
        this.snackbar = true
        this.loading = true
        this.subscribed = false
        this.$http.post('posturl').then(response => {
          this.loading = false
          this.item = response.body;
        }, response => {
          this.loading = false
          this.error = response.toString()
        });
      }
    }
  }
</script>
