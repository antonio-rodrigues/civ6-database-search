<template>
  <div class="page-civ-6 coa-padding-s">
    <PageHeader
      title="CIV-6 DATABASE"
      subHeader="Search for internal configuration keys"
    />

    <LanguageSelector
      class="language-selector"
      :defaultLang="lang"
      @onLanguageChange="onLanguageChange"
    />

    <md-content md-tag>
      <h4 slot="title">TIP</h4>
      <p>
        Example search: America, Galley, Redcoat_disembark...<br />
        <small
          >Note: some keys hold `true` or `false` for `1` and `0` values
          (boolean database field types).</small
        >
      </p>
    </md-content>

    <!-- <Panel>
      <h4 slot="title">TIP</h4>
      <p>
        Example search: America, Galley, Redcoat_disembark...<br />
        <small
          >Note: some keys hold `true` or `false` for `1` and `0` values
          (boolean database field types).</small
        >
      </p>
    </Panel> -->

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
          >Search</md-button
        >
      </md-content>

      <div class="loader" v-if="loading">
        <img src="@/assets/spinner2.gif" />
      </div>

      <md-content class="coa-vspacing-m" v-if="!isEmpty">
        <md-field>
          <md-icon class="md-accent">filter</md-icon>
          <label>Type to filter results...</label>
          <md-input v-model="filterQuery"></md-input>
        </md-field>
      </md-content>

      <div class="content" v-if="!loading">
        <div v-for="(artefact, index1) in filteredArtefacts" :key="index1">
          <div
            class="mdl-grid"
            v-for="(item, index2) in artefact.Rows"
            :key="index2"
          >
            <div
              class="mdl-cell mdl-cell--12-col item--header"
              v-if="index2 === 0"
            >
              {{ artefact.Header }}
            </div>
            <div
              class="mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet mdl-cell--1-col-phone item--key"
            >
              {{ item.Key }}
            </div>
            <div
              class="mdl-cell mdl-cell--10-col mdl-cell--5-col-tablet mdl-cell--3-col-phone item--value"
              v-if="!item.isLink"
            >
              {{ item.Value }}
            </div>
            <div
              class="mdl-cell mdl-cell--10-col mdl-cell--5-col-tablet mdl-cell--3-col-phone item--value"
              v-if="item.isLink"
            >
              <button
                class="mdl-button mdl-js-button mdl-button--primary"
                @click="searchArtefactsByLink(item.Value)"
              >
                {{ item.Value }}
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
    </form>
  </div>
</template>

<script lang="js">
import { HTTP, ApiMethod, prepareArtefactsData } from "@/utils";

import PageHeader from "@/components/PageHeader";
import Panel from "@/components/Panel";
import LanguageSelector from "@/components/LanguageSelector";

const DEFAULT_LANG = "en_US";
const page = { version: 6, name: "civ6", label: "CIV-6" };

export default {
  name: page.name,

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
      lang: DEFAULT_LANG,
      loading: true,
      keyword: "",
      filterQuery: "",
      filterQueryCount: 0,
      artefacts: [],
      errors: []
    };
  },

  created() {
    // on-page-load
    this.loading = false;
  },

  methods: {
    onLanguageChange: function(lang) {
      this.lang = lang;
      if (this.keyword && this.keyword.length) {
        // auto-repeat-search with selected lang
        this.filterQuery = ""; // TODO: reset filtered results?
        this.searchArtefacts();
      }
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
    PageHeader,
    Panel,
    LanguageSelector
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/index.scss";

.page-civ-6 {
  margin: 0;
  padding: $size-s $size-m;
  background-color: $color-white;

  .language-selector {
    position: absolute;
    top: $size-s;
    right: 0;
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

  .item--header {
    color: navy;
    text-align: left;
    font-weight: bold;
    font-size: 1.6rem;
    /* border-top: 1px solid rgba(0,0,0,.12); */
    padding-top: 20px;
  }

  .item--key {
    text-align: right;
  }

  .item--value {
    text-align: left;
    font-weight: bold;
    padding-left: 10px;
  }

  .item--value button {
    margin-top: -8px;
    margin-left: -16px;
  }

  form {
    margin: 60px 0 100px 0;
  }

  .loader {
    margin-top: 40px;
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

  @media (max-width: 416px) {
    .content {
      padding: 0;
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
