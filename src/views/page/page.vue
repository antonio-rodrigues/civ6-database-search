<template>
  <RenderPage :civVersion="selectedCivVersion" />
</template>

<script>
import RenderPage from "@/components/RenderPage";

export default {
  name: "Page",
  data: () => ({
    menuVisible: false,
    selectedCivVersion: 6 // default
  }),
  mounted() {
    // set civ version from router path
    const path = this.$route.path;
    this.selectedCivVersion = !path ? 6 : parseInt(path.split("/")[2]); // ==> /civ/1
    console.log("path:", { path, selectedCivVersion: this.selectedCivVersion });
  },
  components: {
    RenderPage
  }
};
</script>

<style lang="scss" scoped>
.md-app {
  min-height: 100vh;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 300px;
  max-width: calc(100vw - 125px);
}
</style>
