<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-title>Sõidud</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list two-line>
          <template v-for="item in items">
            <v-subheader v-if="item.header" v-text="item.header"></v-subheader>
            <v-divider v-else-if="item.divider" v-bind:inset="item.inset"></v-divider>
            <v-list-tile avatar v-else v-bind:key="item.title" @click="(event) => { showDrive(event, item.driveId) }">
              <v-list-tile-avatar>
                <img v-bind:src="item.avatar">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            avatar: '/static/list/audo.jpg',
            title: 'Kuperjanovi JVP - Tallinn <span class="grey--text text--lighten-1">2 kohta</span>',
            subtitle: "<span class='grey--text text--darken-2'>RMS Kull</span> — 7. Jan 2018",
            driveId: 0
          },
          {divider: true, inset: true},
          {
            avatar: '/static/list/bmw.jpg',
            title: 'Viru JVP - Tallinn <span class="grey--text text--lighten-1">4 kohta</span>',
            subtitle: "<span class='grey--text text--darken-2'>N-SRS Alas</span> — 14. Jan 2018.",
            driveId: 1,
          },
          {divider: true, inset: true},
          {
            avatar: '/static/list/lex.jpg',
            title: 'Vahipataljon - Haapsalu <span class="grey--text text--lighten-1">1 koht</span>',
            subtitle: "<span class='grey--text text--darken-2'>N-SRS Rammu</span> — 7. Jan 2018",
            driveId: 2
          }
        ],
        showDrive: function (event, x) {
          // `this` inside methods points to the Vue instance
          this.$router.push(
            {
              path: '/drive/' + x,
            }
          )
        }
      }
    },
    created () {
      // fetch the data when the view is created and the data is
      // already being observed
      this.fetchData()
    },
    watch: {
      // call again the method if the route changes
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        this.loading = true
        this.$http.get('/static/responses/list.json').then(response => {
          this.loading = false
          this.items = response.body;
        }, response => {
          this.loading = false
          this.error = response.toString()
        });

      }
    }
  }

</script>
