<template>
  <v-app>

    <v-content>

      <v-slide-y-transition mode="out-in">
        <router-view></router-view>
      </v-slide-y-transition>

    </v-content>

    <v-footer :fixed="fixed" app>
      <v-card-text style="height: 0px; position: relative">
        <router-link v-if="$route.fullPath == '/'" :to="'add'">
          <v-btn
            absolute
            dark
            fab
            top
            right
            color="pink"
          >
            <v-icon>add</v-icon>
          </v-btn>
        </router-link>
        <router-link v-if="$route.fullPath != '/'" :to="'/'">
          <v-btn
            absolute
            dark
            fab
            top
            right
            color="red"
          >
            <v-icon>undo</v-icon>
          </v-btn>
        </router-link>
      </v-card-text>
    </v-footer>
  </v-app>
</template>

<script>
  import Meta from 'mixins/meta'
  import { mapState } from 'vuex';
  export default {
    mixins: [Meta],
    data () {
      return {
        fixed: false,

        title: 'Vuetify.js'
      };
    },
    computed: mapState({
      error: state => state.error,
    }),
  }
</script>


