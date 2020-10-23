<template>
  <div class="page">
    <div class="md-layout md-alignment-top-space-between page-layout">
      <div
        id="page-top"
        class="md-layout-item md-size-100 coa-vspacing-s page-layout--header"
      >
        <PageHeader :header="header" :subheader="subheader"></PageHeader>
      </div>
      <div class="md-layout-item md-size-100 page-layout--content">
        <slot name="content"></slot>
      </div>
      <div
        id="page-bottom"
        class="md-layout-item md-size-100 page-layout--footer"
      >
        <PageFooter>coa@2020</PageFooter>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";

export default {
  name: "Page",
  props: {
    header: String,
    subheader: String
  },
  components: {
    PageHeader,
    PageFooter
  }
};
</script>

<style lang="scss">
@import "@/styles/index.scss";

.page {
  margin: 0;
  padding: 0;
  min-height: $max-height;
  background-color: $color-white;

  &-layout {
    flex-direction: column;
    min-height: $max-height;

    &--header {
      max-height: $header-height;
    }

    &--content {
      width: 100%;
      min-height: $content-height;
      margin: 0;
      padding: $size-xs $size-m; // default content padding
      background-color: $color-white; // default content bg color
      // overflow: auto;
    }

    &--footer {
      min-height: $footer-height;
      max-height: $footer-height;
    }
  }
}
</style>
