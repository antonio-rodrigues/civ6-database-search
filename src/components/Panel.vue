<template>
  <div class="md-elevation-1 coa-padding-s panel">
    <!-- title slot -->
    <div class="title">
      <slot name="title"></slot>
    </div>
    <!-- arbitrary content slot -->
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/index.scss";

.panel {
  padding: $size-s $size-m;
  background-color: $color-secondary-ligth;
  opacity: 0.8;
}
.title {
  color: $color-info;
  border-bottom: 1px dashed $color-info;
}
</style>
