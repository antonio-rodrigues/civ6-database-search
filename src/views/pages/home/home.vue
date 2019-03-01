<template>
  <div class="page-home coa-padding-s">
    <PageHeader title="[ HOMEPAGE ]" />

    <ul v-if="hasItems">
      <li v-for="item of items" :key="item.id">{{ item.label }}</li>
    </ul>
  </div>
</template>

<script lang="js">
// @ is an alias to /src
import PageHeader from "@/components/PageHeader";

export default {
  name: "home",
  computed: {
    items() {
      const arr = [];
      let index = 0;
      while (index < 100) {
        arr.push({ id: index, label: 'Force page scroll ' + index })
        index++
      }
      return arr;
    },
    hasItems() {
      return !!this.items.length;
    }
  },
  components: {
    PageHeader
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/index.scss";

.page-home {
  margin: 0;
  padding: $size-s $size-m;
  background-color: $color-grey-ligth;
}
</style>
