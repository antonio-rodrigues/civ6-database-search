<template>
  <div class="page-civ-4">
    <h1 class="md-display-1">{{ pageTitle }}</h1>
    <!-- [ add here specific Civ-version content ] -->
  </div>
</template>

<script>
const page = { version: 4, name: "civ4", label: "CIV-4" };

export default {
  name: page.name,

  data: () => {
    return {
      pageTitle: `${page.label} Page Header`
    };
  },

  // lifecycle: init
  beforeCreate() {
    console.group("[LIFECYCLE]");
    console.log("beforeCreate(): nothing gets called before me");
  },
  created() {
    console.log("created(): computed will be updated");
  },

  // lifecycle: DOM
  beforeMount() {
    console.log(`beforeMount(): this.joke doesn't exist yet`);
  },
  mounted() {
    console.log("mounted(): component did mount");
    this.myLabel = "MyLabel is now updated!!!";
  },

  // Updating (Re-render)
  beforeUpdate() {
    console.log("beforeUpdate(): before the DOM updates");
  },
  updated() {
    console.log("updated(): after DOM updates");
  },

  // Destruction (Teardown)
  beforeDestroy() {
    console.log("beforeDestroy(): that Chuck Norris fixed look...");
  },
  destroyed() {
    console.log("destroyed(): *PAW* You're gone for good!");
    console.groupEnd();
  },

  methods: {
    onButtonClick: function(ev) {
      console.log("YAY! Button was clicked! Event:", { ev });
    },

    onLanguageChange: function(lang) {
      console.log("onLanguageChange:", { lang });
    }
  }
};
</script>

<style lang="scss" scoped>
.page-civ-4 {
  padding: 10px;
  margin: 0;
  background-color: #fff;
}
</style>
