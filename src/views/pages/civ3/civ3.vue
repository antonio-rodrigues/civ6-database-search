<template>
  <Page :header="data.label" subheader="sub-title description">
    <div slot="content" class="civ-3">
      <p>[ add here specific Civ#{{ data.version }} content ]</p>
    </div>
  </Page>
</template>

<script>
import Page from "@/components/Page";
const page = { version: 3, name: "civ3", label: "CIV-3" };

export default {
  name: page.name,

  data: () => {
    return {
      data: page
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
    console.groupEnd();
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
  },

  methods: {
    getPageHeader() {
      return this.pageTitle;
    },
    onButtonClick: function(ev) {
      console.log("YAY! Button was clicked! Event:", { ev });
    },

    onLanguageChange: function(lang) {
      console.log("onLanguageChange:", { lang });
    }
  },
  components: {
    Page
  }
};
</script>

<style lang="scss" scoped>
// @import "@/styles/index.scss";

.civ-3 {
}
</style>
