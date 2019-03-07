<template>
  <div class="page-footer">
    <div class="md-layout md-alignment-center-center container">
      <div class="md-layout-item md-size-100">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageFooter"
};
</script>

<style lang="scss">
@import "@/styles/index.scss";

.page-footer {
  & .container {
    min-height: 140px;
    background-color: $color-secondary-ligth;
  }
}
</style>
