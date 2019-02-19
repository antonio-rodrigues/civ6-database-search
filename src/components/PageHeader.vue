<template>
  <div class="hello">
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
a {
  color: #42b983;
}
</style>
