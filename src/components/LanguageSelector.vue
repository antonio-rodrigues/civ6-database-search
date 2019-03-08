<template>
  <div class="select-style coa-padding-s">
    <div v-if="label" class="select-label">{{ label }}</div>
    <select v-model="selectedLanguage" @change="onChangeLanguage">
      <option
        v-for="language in languages"
        :key="language.value"
        :value="language.value"
        >{{ language.name }}</option
      >
    </select>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LanguageSelector",
  props: {
    defaultLang: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      selectedLanguage: "",
      languages: [
        { value: "pt_BR", name: "Portuguese (Brazil)" },
        { value: "es_ES", name: "Español" },
        { value: "en_US", name: "English (US)" },
        { value: "fr_FR", name: "Français" },
        { value: "de_DE", name: "Deutsch" },
        { value: "it_IT", name: "Italian" },
        { value: "ja_JP", name: "Japanese" },
        { value: "zh_Hans_CN", name: "Chinese (Simplified)" },
        { value: "zh_Hant_HK", name: "Chinese (Traditional)" },
        { value: "ko_KR", name: "Korean" },
        { value: "pl_PL", name: "Polish" },
        { value: "ru_RU", name: "Russian" }
      ]
    };
  },
  mounted() {
    // set default lang, if prop available
    if (this.defaultLang.length && !this.selectedLanguage.length) {
      this.selectedLanguage = this.defaultLang;
    }
  },
  methods: {
    ...mapActions(["setLocale"]),
    onChangeLanguage(e) {
      // event bus; consume anywhere with this.$on() or <Component @onLanguageChange="doFoo" />
      this.$emit("onLanguageChange", e.target.value);
      this.setLocale(e.target.value);
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/styles/index.scss";

.select-style {
  width: 250px;
  overflow: hidden;
  z-index: 999;
}
.select-label {
  font-size: 1em;
  color: $color-text;
}
.select-style select {
  width: 230px;
  font-size: 1em;
  background-color: $color-primary-light;
}
.select-style select:focus {
  outline: none;
}
</style>
