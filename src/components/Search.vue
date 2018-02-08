<template>
  <div class="search">

    <h3>CIV 6 DATABASE</h3>
    <h4>Search for internal configuration keys</h4>

    <Language
      class="language-selector"
      :defaultLang="lang"
      @onLanguageChange="onLanguageChange"
    />

    <p>
      Example search: America, Galley, Redcoat_disembark...
      <br />
      <small>Note: some keys hold `true` or `false` for `1` and `0` values (boolean database field types).</small>
    </p>

    <form action="#">
      <div class="mdl-grid search-container">
        <div class="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--4-col-phone">
          <label class="mdl-button mdl-js-button mdl-button--icon" for="sample6">
            <i class="material-icons">search</i>
          </label>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: 90%">
            <input class="mdl-textfield__input" type="text" id="keyword" v-model="keyword">
            <label class="mdl-textfield__label" for="keyword">Enter configuration keyword (case sensitive)</label>
          </div>
        </div>
        <div class="mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet mdl-cell--4-col-phone">
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" :disabled="!isSearchable" @click="searchArtefacts"
            style="margin-top:12px;">Search</button>
        </div>
      </div>

      <div class="loader" v-if="loading">
        <img src="../assets/spinner2.gif" />
      </div>

      <div class="mdl-grid search-container" v-if="!loading && !isEmpty">
        <div class="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--4-col-phone">
          <label class="mdl-button mdl-js-button mdl-button--icon" for="sample6">
            <i class="material-icons">search</i>
          </label>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: 90%">
            <input class="mdl-textfield__input" type="text" v-model="filterQuery" id="filterQuery">
            <label class="mdl-textfield__label" for="filterQuery">Filter results</label>
          </div>
        </div>
        <div class="mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet mdl-cell--4-col-phone">
          <span class="mdl-badge" :data-badge="filteredCount" style="margin-top:16px;">Found</span>
        </div>
      </div>

      <div class="content" v-if="!loading">
        <div v-for="(artefact, index1) in filteredArtefacts" :key="index1">
          <div class="mdl-grid" v-for="(item, index2) in artefact.Rows" :key="index2">
            <div class="mdl-cell mdl-cell--12-col item--header" v-if="index2 === 0">{{ artefact.Header }}</div>
            <div class="mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet mdl-cell--1-col-phone item--key">{{ item.Key }}</div>
            <div class="mdl-cell mdl-cell--10-col mdl-cell--5-col-tablet mdl-cell--3-col-phone item--value" v-if="!item.isLink">{{ item.Value }}</div>
            <div class="mdl-cell mdl-cell--10-col mdl-cell--5-col-tablet mdl-cell--3-col-phone item--value" v-if="item.isLink">
              <button class="mdl-button mdl-js-button mdl-button--primary" @click="searchArtefactsByLink(item.Value)">
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

    <back-to-top text="Back to top" visibleOffset="300"></back-to-top>
  </div>
</template>

<script>
import { HTTP, ApiMethod } from '../shared/http-common'
import BackToTop from 'vue-backtotop'
import Language from './Language'

const DEFAULT_LANG = 'en_US'

const appendLinkToValue = (item) => {
  // add link where appropriate
  return item.Rows.map(row => Object.assign(row, { isLink: row.Value.indexOf('_') >= 0 }))
}

const prepareArtefactsData = (artefacts) => {
  // Flatten all data nodes
  return Promise.all(
    artefacts.Data.map(item => appendLinkToValue(item))
  ).then(results => {
    return [...artefacts.Data, ...artefacts.Pedia, ...artefacts.Text]
  }).catch(reason => reason)
}

export default {
  name: 'Search',
  computed: {
    isSearchable () {
      return this.keyword.length > 2
    },
    filteredArtefacts: function () {
      var self = this
      return self.artefacts.filter(artefact => {
        var searchRegex = new RegExp(self.filterQuery, 'i')
        return (
          searchRegex.test(artefact.Header) ||
          artefact.Rows.filter(i => searchRegex.test(i.Key) || searchRegex.test(i.Value)).length > 0
        )
      })
    },
    filteredCount: function () {
      return (this.filteredArtefacts.length > 99 ? '+99' : this.filteredArtefacts.length)
    },
    isEmpty: function () {
      return this.artefacts.length === 0
    }
  },

  data () {
    return {
      lang: DEFAULT_LANG,
      loading: true,
      keyword: '',
      filterQuery: '',
      filterQueryCount: 0,
      artefacts: [],
      errors: []
    }
  },

  created () {
    // on-page-load
    this.loading = false
  },

  methods: {
    onLanguageChange: function (lang) {
      this.lang = lang
      if (this.keyword && this.keyword.length) {
        // auto-repeat-search with selected lang
        this.filterQuery = '' // TODO: reset filtered results?
        this.searchArtefacts()
      }
    },
    searchArtefacts: function () {
      const self = this
      self.loading = true

      // endpoint parameters
      const searchQuery = `${ApiMethod}?param=${self.keyword}&language=${self.lang}`

      // get some data!
      HTTP.get(searchQuery)
        .then(response => prepareArtefactsData(response.data))
        .then(results => {
          this.artefacts = results
          // console.log('> searchArtefacts:', { keyword: self.keyword, results: results })
          self.loading = false
        })
        .catch(e => {
          console.error('>> ERROR:', JSON.stringify(e))
          self.errors.push(e)
          self.loading = false
        })
    },
    searchArtefactsByLink: function (subkey) {
      this.filterQuery = '' // reset filtered results
      this.keyword = subkey
      this.searchArtefacts()
    }
  },
  components: {
    Language,
    BackToTop
  }
}
</script>

<!-- "scoped" attribute: limit CSS to this component only -->
<style scoped>
  .language-selector {
    position: absolute;
    top: 10px;
    right: 0;
  }
  .vue-back-to-top {
    background-color: forestgreen;
    opacity: .5;
  }

  .mdl-cell {
    /* border: 1px solid black; */
  }

  .search-container {
    max-width: 800px;
    background-color: rgba(0, 0, 0, .03);
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
</style>
