<template>
  <div class="my-page-unique-name coa-padding-s">
    <h1>Insert your HMTL here!</h1>

    <button @click="onButtonClick">MY BUTTON</button>

    <p>STRING INTERPOLATION: {{ myLabel }}</p>

    <p>List example:</p>
    <ul v-if="items && items.length">
      <li v-for="(item, index) of items" :key="index">{{ item.label }}</li>
    </ul>

    <p>Add image example:</p>
    <img src="@/assets/logo.png" />
    <!-- <img src="@/assets/logo.png"> -->

    <p>Component with props example:</p>
    <LanguageSelector
      :defaultLang="lang"
      @onLanguageChange="onLanguageChange"
    />

    <button class="my-button">SCSS example</button>
    <br />
    <button class="my-button my-button__red">SCSS example</button>
    <br />
    <button class="my-button my-button__blue">SCSS example</button>
    <br />
  </div>
</template>

<script>
// import here any components or libs you need
// import { HTTP, ApiMethod } from "../../utils";
import LanguageSelector from "@/components/LanguageSelector";

// access VueX Redux store with getters
// import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "MyViewName",

  computed: {
    myCalculatedValue() {
      return this.myValue * 1000;
    },
    hasItems: function() {
      return !this.items.length;
    },
    ...mapGetters([
      "myValue" // GET myValue from store.state = { myValue: 123 }
    ])
  },

  data: () => {
    return {
      myLabel: "Default label, replaced on mount() lifecycle hook",
      items: [
        { id: 1, label: "Item label 1" },
        { id: 2, label: "Item label 2" },
        { id: 3, label: "Item label 3" }
      ]
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
  },

  // add here any components you need on your template
  components: {
    LanguageSelector
  }
};
</script>

<style lang="scss" scoped>
/// SCSS quick reference: https://medium.freecodecamp.org/the-complete-guide-to-scss-sass-30053c266b23

/// this is a way to contain styles to a specific page, if we dont want to use "scoped" above
/// Note: "scoped" ==> all styles are specific to this page, and won't bleed outside of it

/// -- Import from global shared styles
/// Variables are prefixed like '$color-xxxx' or '$size-xx'
/// For global padding and vertical spacing, please make use of
/// shared classes at HTML level, ex: '<div class=coa-vspacing-xx />'
/// Note: we use 'coa' prefix so we can distinguish from 'md-xxxx' classes
@import "@/styles/index.scss";

.my-page-unique-name {
  // page shared styles
  margin: 0;
  background-color: $color-white;

  ul > li {
    color: orangered;
  }

  .my-button {
    background-color: $color-grey;
    color: black;

    // you can nest selectors
    &__red {
      background-color: red;
    }
    &__blue {
      background-color: blue;
    }
    &__red,
    &__blue {
      color: white;
      border: 1px solid yellow;
    }
    /// all above are equal to: ".my-button__red {...}" and ".my-button__blue {...}"
  }
}
</style>
