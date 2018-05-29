import { HTTP, ApiMethod } from "../../utils";
import LanguageSelector from "@/components/LanguageSelector";
import { prepareArtefactsData } from "./search.utils";

const DEFAULT_LANG = "en_US";

export default {
  name: "Search",
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
    LanguageSelector
  }
};
