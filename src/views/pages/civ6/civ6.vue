<template>
  <Page :header="settings.label" subheader="sub-title description">
    <div slot="content" class="civ-6">
      <p>[ add here specific Civ#{{ settings.version }} content ]</p>
    </div>
  </Page>
</template>

<script>
/* eslint no-console: 0 */
import Page from "@/components/Page";
const settings = { version: 6, name: "civ6", label: "CIV-6" };

export default {
  name: settings.name,

  data: () => {
    return {
      settings
    };
  },

  // lifecycle: init
  beforeCreate() {
    console.group(`${settings.label} [LIFECYCLE]`);
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

.civ-6 {
}
</style>
