<template>
  <div class="query-list coa-padding-s">
    <div>
      <md-list>
        <md-subheader>LAST QUERIES</md-subheader>
        <div v-if="hasItems">
          <md-list-item
            v-for="(query, index) of queries"
            :key="index"
            @click="onQueryClick($event, query)"
          >
            <div class="md-list-item-text">
              <span>{{ query.keyword }}</span>
              <span>{{ query.filter || "--" }}</span>
            </div>
            <md-button
              class="md-icon-button md-accent md-list-action"
              @click="onRemoveClick($event, index)"
            >
              <md-icon>clear</md-icon>
            </md-button>
          </md-list-item>
        </div>
      </md-list>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "QueryList",
  computed: {
    ...mapGetters([
      "queries" // this.store.state.queries
    ]),
    hasItems() {
      return this.queries && this.queries.length;
    }
  },
  methods: {
    ...mapActions(["removeQuery"]),
    // re-execute search with this keyword
    onQueryClick(ev, row) {
      // emit to event bus
      this.$root.$emit("onReApplyQuery", row);
    },
    // remove query from the list
    onRemoveClick(ev, index) {
      ev.preventDefault();
      ev.stopPropagation();
      this.removeQuery(index); // mapped action
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/index.scss";

.query-list {
  min-height: calc(#{$content-height} - 50px);
  background-color: $color-white;

  & .md-list-item-text span:last-child {
    font-size: 0.7em;
    color: $color-grey;
  }
}
</style>
