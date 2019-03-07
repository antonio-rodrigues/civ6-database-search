<template>
  <div class="query-list coa-padding-s">
    <h3>LAST QUERIES</h3>
    <div v-if="hasItems">
      <md-chips
        v-model="queryList"
        md-clickable
        md-deletable
        @md-click="onQueryClick"
        @md-delete="onRemoveClick"
      ></md-chips>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  name: "QueryList",
  computed: {
    queryList() {
      return this.$store.getters.queries;
    },
    hasItems() {
      return this.queryList && this.queryList.length;
    }
  },
  methods: {
    onQueryClick(str, index) {
      console.log(`>> onQueryClick: ${JSON.stringify(str)}, index: ${index}`);
      // this.$store.dispatch("addQuery", str);
      // TODO: call parent method to re-execute given search
    },
    onRemoveClick(str, index) {
      console.log(`>> onRemoveClick: ${JSON.stringify(str)}, index: ${index}`);
      this.$store.dispatch("removeQuery", str);
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/index.scss";

.query-list {
  background-color: $color-grey-ligth;
  border-left: 2px solid $color-primary-dark;
}
</style>
