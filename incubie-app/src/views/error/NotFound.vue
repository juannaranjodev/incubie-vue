<template>
  <v-card light>
    <v-alert
      value="true"
      class="mb-4"
      type="error">
      404 Not Found
    </v-alert>
    <v-card-text>
      The requested resource was not found.
    </v-card-text>
    <v-card-actions>
      <v-btn :to="{ name: 'root' }">Continue</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Unauthorized'
}
</script>
