<template>
  <div class="page-header">
    <div
      class="md-layout md-gutter md-alignment-center-space-between container"
    >
      <div class="md-layout-item md-medium-size-50">
        <h1 class="md-display-1">{{ header }}</h1>
      </div>
      <div class="md-layout-item md-medium-size-50">
        <slot name="options"></slot>
      </div>
    </div>
    <h3 v-if="subheader" class="md-headline">{{ subheader }}</h3>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    header: String,
    subheader: String
  }
};
</script>

<style lang="scss">
@import "@/styles/index.scss";

.page-header {
  background-color: transparent;

  & h3 {
    margin: 0;
    padding: 0 0 $size-m;
  }
  & .container {
    // background-color: $color-secondary-ligth;
  }
}
</style>
