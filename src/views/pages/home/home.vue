<template>
  <Page :header="data.label" subheader="sub-title description">
    <div slot="content" class="home">
      <p>[ HOMEPAGE ]</p>
      <ul v-if="hasItems">
        <li v-for="item of items" :key="item.id">{{ item.label }}</li>
      </ul>
    </div>
  </Page>
</template>

<script>
import Page from "@/components/Page";
const page = { version: 0, name: "name", label: "Home" };

export default {
  name: page.name,

  data: () => {
    return {
      data: page
    };
  },

  computed: {
    items() {
      const arr = [];
      let index = 0;
      while (index < 100) {
        arr.push({ id: index, label: "Force page scroll " + index });
        index++;
      }
      return arr;
    },
    hasItems() {
      return !!this.items.length;
    }
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

.home {
}
</style>
