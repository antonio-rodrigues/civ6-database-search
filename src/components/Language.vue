<template>
  <div class="select-style">
    <select v-model="selectedLanguage" @change="onChangeLanguage">
      <option v-for="language in languages" :key="language.value" :value="language.value">
        {{ language.name }}
      </option>
    </select>
  </div>
</template>

<script>
module.exports = {
  name: 'Language',
  props: {
    defaultLang: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      selectedLanguage: '',
      languages: [
        {value: 'pt_BR', name: 'Portuguese (Brazil)'},
        {value: 'es_ES', name: 'Español'},
        {value: 'en_US', name: 'English (US)'},
        {value: 'fr_FR', name: 'Français'},
        {value: 'de_DE', name: 'Deutsch'},
        {value: 'it_IT', name: 'Italian'},
        {value: 'ja_JP', name: 'Japanese'},
        {value: 'zh_Hans_CN', name: 'Chinese (Simplified)'},
        {value: 'zh_Hant_HK', name: 'Chinese (Traditional)'},
        {value: 'ko_KR', name: 'Korean'},
        {value: 'pl_PL', name: 'Polish'},
        {value: 'ru_RU', name: 'Russian'}
      ]
    }
  },
  mounted () {
    // set default lang, if prop available
    if (this.defaultLang.length && !this.selectedLanguage.length) {
      this.selectedLanguage = this.defaultLang
    }
  },
  methods: {
    onChangeLanguage (e) {
      this.$emit('onLanguageChange', e.target.value)
    }
  }
}
</script>
<style scoped>
  .select-style {
    width: 180px;
    border-radius: 3px;
    overflow: hidden;
  }
  .select-style select {
    border: 1px solid #ccc;
  }
  .select-style select:focus {
    outline: none;
  }
</style>
