<template>
  <v-list dense>
    <v-list-tile disabled>
      <v-list-tile-title>My Account</v-list-tile-title>
    </v-list-tile>
    <v-list-tile disabled>
      <v-list-tile-title>Settings</v-list-tile-title>
    </v-list-tile>
    <v-list-tile :to="{ name: 'logout' }">
      <v-list-tile-title>Log Out</v-list-tile-title>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  name: 'UserOptionsMenu'
}
</script>
