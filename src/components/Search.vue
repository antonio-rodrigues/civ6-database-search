<template>
  <div class="search">

    <h3>CIV 6 DATABASE SEARCH</h3>
    <h4>[ explain purpose here ]</h4>

    <form action="#">
      <div class="mdl-grid search-container">
        <div class="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--4-col-phone">
            <label class="mdl-button mdl-js-button mdl-button--icon" for="sample6">
              <i class="material-icons">search</i>
            </label>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: 90%">
            <input class="mdl-textfield__input" type="text" id="keyword" v-model="keyword">
            <label class="mdl-textfield__label" for="keyword">Enter keyword</label>
          </div>
        </div>
        <div class="mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet mdl-cell--4-col-phone">
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" :disabled="!isSearchable" @click="searchArtifacts" style="margin-top:12px;">Search</button>
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
            <input class="mdl-textfield__input" type="text" v-model="searchQuery" id="searchQuery">
            <label class="mdl-textfield__label" for="searchQuery">Filter results</label>
          </div>
        </div>
        <div class="mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet mdl-cell--4-col-phone">
          <span class="mdl-badge" :data-badge="filteredCount" style="margin-top:16px;">Found</span>
        </div>
      </div>

      <div class="content" v-if="!loading">
        <div v-for="(artifact, index1) in filteredArtifacts" :key="index1">
          <div class="mdl-grid" v-for="(item, index2) in artifact.items" :key="index2">
            <div class="mdl-cell mdl-cell--12-col item--header" v-if="index2 === 0">{{ artifact.header }}</div>
            <div class="mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet mdl-cell--1-col-phone item--key">{{ item.key }}</div>
            <div class="mdl-cell mdl-cell--10-col mdl-cell--5-col-tablet mdl-cell--3-col-phone item--value">{{ item.value }}</div>
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

<script>
// import { HTTP } from '../shared/http-common'

const MOCKUP_DATA = [
  {
    header: '_ModifierArguments_',
    items: [
      { key: 'ModifierId', value: 'REDCOAT_DISEMBARK' },
      { key: 'Name', value: 'Ignore' },
      { key: 'Type', value: 'ARGTYPE_IDENTITY' },
      { key: 'Value', value: '1' },
      { key: 'Extra', value: 'NULL' },
      { key: 'SecondExtra', value: 'NULL' }
    ]
  },
  {
    header: '_UnitAbilityModifiers_',
    items: [
      { key: 'UnitAbilityType', value: 'ABILITY_GREAT_EXPLORER' },
      { key: 'ModifierId', value: 'REDCOAT_DISEMBARK' }
    ]
  }
]

export default {
  name: 'Search',
  computed: {
    isSearchable () {
      return this.keyword.length > 0
    },
    filteredArtifacts: function () {
      var self = this
      return self.artifacts.filter(artefact => {
        var searchRegex = new RegExp(self.searchQuery, 'i')
        return (
          searchRegex.test(artefact.header) ||
          artefact.items.filter(i => searchRegex.test(i.key) || searchRegex.test(i.value)).length > 0
        )
      })
    },
    filteredCount: function () {
      return (this.filteredArtifacts.length > 99 ? '+99' : this.filteredArtifacts.length)
    },
    isEmpty: function () {
      return this.artifacts.length === 0
    }
  },

  data () {
    return {
      loading: true,
      keyword: '',
      searchQuery: '',
      searchQueryCount: 0,
      artifacts: [],
      errors: []
    }
  },

  created () {
    // on-page-load
    this.loading = false
  },

  methods: {
    searchArtifacts: function () {
      this.loading = true
      // http://www.acloudfor4.com/civ6sql/api/search/artifacts/keyword (some webservice returning JSON...)
      // HTTP.get(`artifacts/${this.keyword}`)
      //   .then(response => {
      //     // TODO: use map(), filter(), reduce() as you like to model your data...
      //     this.artifacts = response
      //     this.loading = false
      //   })
      //   .catch(e => {
      //     this.errors.push(e)
      //     this.loading = false
      //   })

      // [MOCKUP] simulate network load......
      setTimeout(() => {
        this.artifacts = MOCKUP_DATA
        console.log('> searchArtifacts():', {keyword: this.keyword, data: MOCKUP_DATA})
        this.loading = false
      }, 1000)
    }
  }
}
</script>

<!-- "scoped" attribute: limit CSS to this component only -->
<style scoped>
  .mdl-cell {
    /* border: 1px solid black; */
  }
  .search-container {
    max-width: 800px;
    background-color: rgba(0,0,0,.03);
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
  }
  form {
    margin-bottom: 100px;
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
</style>
