<template>
  <div class="page-header">
    <h1 class="md-display-1">{{ title }}</h1>
    <h3 v-if="subHeader" class="md-headline">{{ subHeader }}</h3>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    title: String,
    subHeader: String
  }
};
</script>

<style lang="scss">
// @import "@/styles/index.scss";

.page-header {
  background-color: transparent;
}
</style>
