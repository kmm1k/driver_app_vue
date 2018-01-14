<template>
  <div>
    <v-list two-line>
      <template v-for="item in items">
        <v-subheader v-if="item.header" v-text="item.header"></v-subheader>
        <v-list-tile @click="(event) => { showDrive(event, item._id) }">
          <v-list-tile-avatar>
            <img v-bind:src="item.owner.picture">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{item.start}} - {{item.end}}: <span class="grey--text text--lighten-1">{{item.seats-(item.users.length-1)}} kohta</span>
            </v-list-tile-title>
            <v-list-tile-sub-title><span class='grey--text text--darken-2'>{{item.owner.name}}</span> — {{item.date}}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
      </template>
    </v-list>
    <v-btn @click="updateList" color="primary">Update</v-btn>

  </div>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    methods: {
      updateList: function () {
        this.$store.dispatch('getDrives');
      }
    },
    computed: mapState({
      items: state => state.items,
    }),
  }

</script>
