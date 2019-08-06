<template>
  <v-toolbar
    dark
    color="secondary"
    class="actions">
    <v-toolbar-items>
      <v-btn
        :to="{ name: 'company/home' }"
        exact
        flat
        ripple>Company
      </v-btn>
      <v-btn
        :to="{ name: 'company/members' }"
        flat
        ripple>Members
      </v-btn>
      <v-btn
        :to="{ name: 'company/billing' }"
        flat
        ripple>Billing
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'CompanyToolbar'
}
</script>
