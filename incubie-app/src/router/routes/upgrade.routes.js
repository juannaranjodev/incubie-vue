export const upgradeRoutes = {
  path: "upgrade",
  name: "upgrade",
  components: {
    default: () => import("@/views/upgrade/Upgrade.vue")
  }
};