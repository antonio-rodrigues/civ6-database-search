<template>
  <Page :header="page.label" :subheader="page.sublabel">
    <div slot="content" class="civ-6">
      <div class="search-tip" @click="onShowInfo">
        <md-icon>info_outlined</md-icon>
        <small>How to?</small>
      </div>
      <Panel v-if="showInfo">
        <h4 slot="title">TIP</h4>
        <p>Example search: America, Galley, Redcoat_disembark...
          <br>
          <small>
            Note: some keys hold `true` or `false` for `1` and `0` values (boolean
            database field types).
          </small>
        </p>
      </Panel>

      <div class="md-layout md-gutter md-alignment-top-space-between">
        <div class="md-layout-item md-medium-size-80 search-container">
          <form action="#">
            <md-content class="coa-vspacing-l">
              <md-field>
                <md-icon class="md-accent">search</md-icon>
                <label>Enter configuration keyword (case sensitive)</label>
                <md-input v-model="keyword"></md-input>
              </md-field>
              <md-button
                class="md-raised md-primary"
                :disabled="!isSearchable"
                @click="searchArtefacts"
              >Search</md-button>
            </md-content>

            <div class="loader" v-if="loading">
              <img src="@/assets/spinner2.gif">
            </div>

            <md-content class="coa-vspacing-l" v-if="!isEmpty">
              <md-field>
                <md-icon class="md-accent">filter</md-icon>
                <label>Type to filter results...</label>
                <md-input v-model="filterQuery"></md-input>
              </md-field>
            </md-content>

            <div class="content" v-if="!loading">
              <div v-for="(artefact, index1) in filteredArtefacts" :key="index1">
                <div
                  class="md-layout md-gutter md-alignment-center-space-between coa-vspacing-m"
                  v-for="(item, index2) in artefact.Rows"
                  :key="index2"
                >
                  <div
                    v-if="index2 === 0"
                    class="md-layout-item md-medium-size-100 coa-vspacing-m item--header"
                  >{{ artefact.Header }}</div>
                  <div
                    v-if="item.Key"
                    class="md-layout-item md-small-size-50 md-xsmall-size-100 item--key"
                  >{{ item.Key }}:</div>
                  <!-- text only -->
                  <div
                    v-if="!item.Key"
                    class="md-layout-item md-medium-size-100 item--value"
                  >{{ item.Value || "null" }}</div>
                  <!-- key/pair text -->
                  <div
                    v-if="item.Key && !item.isLink"
                    class="md-layout-item md-small-size-50 md-xsmall-size-100 item--value"
                  >{{ item.Value || "null" }}</div>
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
                <li v-for="(error, index) of errors" :key="index">{{ error.message }}</li>
              </ul>
            </div>
          </form>
        </div>
        <div class="md-layout-item md-medium-size-20 queries-container">[ query list ]</div>
      </div>
    </div>
  </Page>
</template>

<script lang="js">
import { HTTP, ApiMethod, prepareArtefactsData } from "@/utils";

import PageHeader from "@/components/PageHeader";
import Page from "@/components/Page";
import Panel from "@/components/Panel";

const params = { version: 6, name: "civ6", label: "CIV-6 DATABASE", sublabel: "Search for internal configuration keys" };

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

  methods: {
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
          this.artefacts = results;
          // console.log('> searchArtefacts:', { keyword: self.keyword, results: results })
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
    Panel
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/index.scss";

.civ-6 {
  // margin: 0;
  // padding: $size-s $size-m;
  // background-color: $color-grey-ligth;

  .search-container {
  }
  .queries-container {
  }

  .search-tip {
    display: inline-flex;
    align-items: center;
    color: $color-grey;
    cursor: pointer;

    & .md-icon {
      position: relative;
      left: 10px;
      opacity: 0.5;
    }
  }

  .vue-back-to-top {
    background-color: forestgreen;
    opacity: 0.5;
  }

  .search-container {
    max-width: 800px;
    background-color: rgba(0, 0, 0, 0.03);
    border-radius: 3px;
  }

  .content {
    padding: 30px;
  }

  .errors {
    color: red;
  }

  // .md-layout-item {
  //   border: 1px solid rgba(0,0,0,.12);
  // }

  .item--header {
    color: navy;
    margin-top: $size-m;
    padding-top: $size-s;
    text-align: left;
    font-weight: bold;
    font-size: 1.6rem;
    border-top: 1px solid rgba(0, 0, 0, 0.12);
  }

  .item--key {
    padding: $size-xs;
  }

  .item--value {
    text-align: left;
    font-weight: bold;
  }

  .item--value button {
    margin-left: -8px;
  }

  form {
    margin: 60px 0 100px 0;
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
    .item--key {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .vue-back-to-top {
      right: 25vw;
      opacity: 1;
    }
  }
}
</style>
