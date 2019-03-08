<template>
  <div class="page-header">
    <div
      class="md-layout md-alignment-center-space-between coa-vspacing-m container"
    >
      <div class="md-layout-item md-size-100 coa-vspacing-s">
        <h1 class="md-display-1 container--header">{{ header }}</h1>
      </div>
      <div class="md-layout-item md-size-100 coa-vspacing-m">
        <h3 v-if="subheader" class="md-headline container--subheader">
          {{ subheader }}
        </h3>
      </div>
    </div>
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
  background-color: $color-grey-ligth;
  padding: $size-s $size-m;

  & h3 {
    margin: 0;
    padding: 0 0 $size-m;
  }

  & .container {
    &--header,
    &--subheader {
      margin: 0;
      padding: 0;
    }

    &--subheader {
      color: $color-grey;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
