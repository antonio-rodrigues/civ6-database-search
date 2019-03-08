<template>
  <Page id="page-top" :header="page.label" :subheader="page.sublabel">
    <div slot="content" class="civ-6">
      <!--/page content/-->
      <div class="md-layout md-gutter md-alignment-top-space-between">
        <div
          class="md-layout-item md-small-size-100 md-medium-size-70 md-large-size-70 md-xlarge-size-70 coa-vspacing-m search-container"
        >
          <!--/search-form/-->
          <form action="#">
            <div class="md-layout md-gutter md-alignment-top-space-between">
              <div class="md-layout-item md-size-small-100 md-size-medium-50">
                <md-content class="coa-vspacing-l">
                  <md-field>
                    <md-icon class="md-accent">search</md-icon>
                    <label>Keyword (case sensitive)</label>
                    <md-input v-model="keyword"></md-input>
                  </md-field>
                  <md-button
                    class="md-raised md-primary"
                    :disabled="!isSearchable"
                    @click="searchArtefacts"
                    >Search</md-button
                  >
                  <div class="search-tip">
                    <md-icon>info_outlined</md-icon>
                    <md-tooltip md-direction="right"
                      >Example: America, Galley, Redcoat_disembark</md-tooltip
                    >
                  </div>
                  <md-button
                    class="md-icon-button md-primary search-goto-queries"
                    @click="gotoQueries"
                  >
                    <md-icon>list</md-icon>
                  </md-button>
                </md-content>
              </div>
              <div
                class="md-layout-item md-size-small-100 md-size-medium-50"
                v-if="!isEmpty"
              >
                <md-content class="coa-vspacing-l">
                  <md-field>
                    <md-icon class="md-accent">filter</md-icon>
                    <label>Type to filter results...</label>
                    <md-input v-model="filterQuery"></md-input>
                  </md-field>
                </md-content>
              </div>
            </div>
          </form>

          <!--/spinner/-->
          <div class="loader" v-if="loading">
            <img src="@/assets/spinner2.gif" alt="Spinner" />
          </div>

          <!--/results-list/-->
          <div class="content" v-if="!loading">
            <div v-for="(artefact, index1) in filteredArtefacts" :key="index1">
              <!-- artefact: {{ artefact }} -->
              <div
                class="md-layout md-gutter md-alignment-center-space-between coa-vspacing-m"
                v-for="(item, index2) in artefact.Rows"
                :key="index2"
              >
                <div
                  v-if="index2 === 0"
                  class="md-layout-item md-medium-size-100 md-large-size-100 md-xlarge-size-100 coa-vspacing-m item--header"
                >
                  {{ artefact.Header }}
                </div>
                <div
                  v-if="item.Key"
                  class="md-layout-item md-small-size-50 md-xsmall-size-100 item--key"
                >
                  {{ item.Key }}:
                </div>
                <!-- text only -->
                <div
                  v-if="!item.Key"
                  class="md-layout-item md-medium-size-100 item--value"
                >
                  {{ item.Value || "null" }}
                </div>
                <!-- key/pair text -->
                <div
                  v-if="item.Key && !item.isLink"
                  class="md-layout-item md-small-size-50 md-xsmall-size-100 item--value"
                >
                  {{ item.Value || "null" }}
                </div>
                <!-- key/pair link -->
                <div
                  v-if="item.Key && item.isLink"
                  class="md-layout-item md-small-size-50 md-xsmall-size-100 item--value"
                >
                  <button
                    class="mdl-button mdl-js-button mdl-button--primary"
                    @click="searchArtefactsByLink(item.Value)"
                  >
                    {{ item.Value || "null" }}
                    <md-icon>zoom_in</md-icon>
                  </button>
                </div>
              </div>
            </div>

            <ul class="errors" v-if="errors && errors.length">
              <li v-for="(error, index) of errors" :key="index">
                {{ error.message }}
              </li>
            </ul>
          </div>
        </div>
        <div
          class="md-layout-item md-small-size-100 md-medium-size-30 md-large-size-30 md-xlarge-size-30 queries-container"
        >
          <!--/queries-list/-->
          <md-button
            class="md-icon-button md-primary search-goto-top"
            @click="gotoTop"
          >
            <md-icon>expand_less</md-icon>
          </md-button>
          <QueryList id="query-list"></QueryList>
        </div>
      </div>
    </div>
  </Page>
</template>

<script lang="js">
import { HTTP, ApiMethod, prepareArtefactsData } from "@/utils";
import { mapActions } from "vuex";

import PageHeader from "@/components/PageHeader";
import Page from "@/components/Page";
import Panel from "@/components/Panel";
import QueryList from "@/components/QueryList";

const params = { version: 6, name: "civ6", label: "CIV-6 DATABASE", sublabel: "Search for internal configuration keys" };

import ScrollIntoView from "scroll-into-view";

export default {
  name: params.name,
  computed: {
    isSearchable() {
      return this.keyword.length > 2;
    },
    filteredArtefacts: function() {
      const self = this;
      return self.artefacts.filter(artefact => {
        const searchRegex = new RegExp(self.filterQuery, "i");
        return (
          searchRegex.test(artefact.Header) ||
          artefact.Rows.filter(
            i => searchRegex.test(i.Key) || searchRegex.test(i.Value)
          ).length > 0
        );
      });
    },
    filteredCount: function() {
      return this.filteredArtefacts.length > 99
        ? "+99"
        : this.filteredArtefacts.length;
    },
    isEmpty: function() {
      return this.artefacts.length === 0;
    }
  },
  data() {
    return {
      page: params,
      loading: true,
      keyword: "",
      filterQuery: "",
      filterQueryCount: 0,
      artefacts: [],
      errors: [],
      showInfo: false
    };
  },
  created() {
    // on-page-load
    this.loading = false;
  },
  mounted() {
    // subscribe to event bus $emit
    this.$root.$on("onReApplyQuery", keyword => {
      this.keyword = keyword;
      this.searchArtefacts();
    });
  },
  methods: {
    ...mapActions([
      'addQuery' // store.actions.addQuery()
    ]),
    gotoTop: function () {
      ScrollIntoView(document.getElementById('page-top'));
    },
    gotoQueries: function () {
      ScrollIntoView(document.getElementById('query-list'));
    },
    onShowInfo: function() {
      this.showInfo = !this.showInfo;
    },
    searchArtefacts: function() {
      const self = this;
      self.loading = true;

      // endpoint parameters
      const searchQuery = `${ApiMethod}?param=${self.keyword}&language=${
        self.lang
      }`;

      // get some data!
      HTTP.get(searchQuery)
        .then(response => prepareArtefactsData(response.data))
        .then(results => {
          // persist on redux
          if (results.length) {
            self.addQuery(self.keyword); // addQuery === mapped action
          }
          // load data to list
          self.artefacts = results;
          self.loading = false;
        })
        .catch(e => {
          console.error(">> ERROR:", JSON.stringify(e));
          self.errors.push(e);
          self.loading = false;
        });
    },
    searchArtefactsByLink: function(subkey) {
      this.filterQuery = ""; // reset filtered results
      this.keyword = subkey;
      this.searchArtefacts();
    }
  },
  components: {
    Page,
    PageHeader,
    Panel,
    QueryList
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/index.scss";

.civ-6 {
  .search-container,
  .queries-container {
    min-height: calc(#{$content-height} - 60px);
  }

  .search-container {
    max-width: 800px;
    border-right: 2px dotted rgba(0, 0, 0, 0.1);
  }

  .queries-container {
    overflow: auto;
  }

  .search-tip {
    display: inline-flex;
    align-items: center;
    color: $color-grey;
    cursor: pointer;

    & .md-icon {
      position: relative;
      top: 12px;
      left: 10px;
      opacity: 0.4;
    }
  }

  .search-goto-queries,
  .search-goto-top {
    display: none;
    float: right;
  }

  .vue-back-to-top {
    background-color: forestgreen;
    opacity: 0.5;
  }

  .content {
    padding: 30px;
  }

  .errors {
    color: red;
  }

  .item--header {
    color: navy;
    margin-top: $size-m;
    padding-top: $size-s;
    text-align: left;
    font-weight: bold;
    font-size: 1.6rem;
    border-top: 1px solid rgba(0, 0, 0, 0.12);
  }

  .md-layout-item .item--key {
    padding: $size-xs $size-xs $size-xs $size-l;
  }

  .item--value {
    text-align: left;
    font-weight: bold;
  }

  .item--value button {
    margin-left: -8px;
  }

  form {
    margin-top: $size-m;
  }

  .loader {
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    margin-top: $size-l;
  }

  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  @media (max-width: 425px) {
    .content {
      padding: 0;
    }
    .language-selector {
      position: relative;
      top: 0;
      right: 0;
      width: 100%;
      margin-bottom: $size-s;
    }
    .search-container {
      border-right: none;
    }
    .search-goto-queries,
    .search-goto-top {
      display: inline-flex;
    }
    .item--key {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>
