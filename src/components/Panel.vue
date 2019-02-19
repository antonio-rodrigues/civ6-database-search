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
.panel {
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.12);
}
.title {
  color: orangered;
  opacity: 0.8; /// match md-warn color
  border-bottom: 1px dashed orangered;
}
</style>
