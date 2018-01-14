<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-title>Sõidud</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <drive-list></drive-list>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    asyncData ({store, route}) {
      return store.dispatch('getDrives');
    }
  }
</script>
