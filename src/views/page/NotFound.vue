<template>
  <div class="page-not-found coa-padding-s">
    <h1 class="md-display-1">{{ pageTitle }}</h1>
    <h4 class="md-title">The page you are trying to access was not found!</h4>
    <img src="@/assets/404.jpg" alt="" />
  </div>
</template>

<script>
const page = { version: 0, name: "NotFound", label: "404 PAGE NOT FOUND" };

export default {
  name: page.name,

  data: () => {
    return {
      pageTitle: `${page.label}`
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
@import "@/styles/index.scss";

.page-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 140px);
  margin: 0;
  background-color: $color-black;
  color: $color-white;
  // background: url('../../assets/404.jpg') center no-repeat;

  h1 {
    color: $color-warn;
  }
}
</style>
