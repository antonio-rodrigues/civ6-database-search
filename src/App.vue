<template>
  <div class="page-app">
    <vue-scroll-progress-bar height="2px" backgroundColor="linear-gradient(to right, #9abb50, #3646a7)" />
    <back-to-top bottom="50px" right="50px" visibleoffset="200">
      <md-button class="md-icon-button md-raised md-accent btn-to-top">
        <md-icon>expand_less</md-icon>
      </md-button>
    </back-to-top>

    <md-app md-waterfall>
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-avatar class="md-small">
              <img src="@/assets/coa-flag.jpg" alt="avatar">
            </md-avatar>
            <span class="md-title">C-O-A</span>
          </div>

          <div class="md-toolbar-section-end">
            <LanguageSelector
              class="language-selector"
              :defaultLang="lang"
              @onLanguageChange="onLanguageChange"
            />
          </div>
        </div>

        <div class="md-toolbar-row">
          <div class="coa-nav-bar">
            <md-tabs class="md-primary" md-sync-route>
              <md-tab id="tab-home" md-label="Home" to="/"></md-tab>
              <md-tab id="tab-pages-civ-6" md-label="Civ-6" to="/civ/6"></md-tab>
              <md-tab id="tab-pages-civ-5" md-label="Civ-5" to="/civ/5"></md-tab>
              <md-tab id="tab-pages-civ-4" md-label="Civ-4" to="/civ/4"></md-tab>
              <md-tab id="tab-pages-civ-3" md-label="Civ-3" to="/civ/3"></md-tab>
              <md-tab id="tab-pages-civ-2" md-label="Civ-2" to="/civ/2"></md-tab>
              <md-tab id="tab-pages-civ-1" md-label="Civ-1" to="/civ/1"></md-tab>
              <md-tab id="tab-favorites" md-label="About" to="/about"></md-tab>
            </md-tabs>
          </div>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Options</md-toolbar>
        <md-list>
          <md-list-item>
            <md-icon>videogame_asset</md-icon>
            <span class="md-list-item-text">CIV-6</span>
          </md-list-item>
          <md-list-item>
            <md-icon>videogame_asset</md-icon>
            <span class="md-list-item-text">CIV-5</span>
          </md-list-item>
          <md-list-item>
            <md-icon>videogame_asset</md-icon>
            <span class="md-list-item-text">CIV-4</span>
          </md-list-item>
          <md-list-item>
            <md-icon>videogame_asset</md-icon>
            <span class="md-list-item-text">CIV-3</span>
          </md-list-item>
          <md-list-item>
            <md-icon>videogame_asset</md-icon>
            <span class="md-list-item-text">CIV-2</span>
          </md-list-item>
          <md-list-item>
            <md-icon>videogame_asset</md-icon>
            <span class="md-list-item-text">CIV-1</span>
          </md-list-item>
          <md-list-item>
            <md-icon>info</md-icon>
            <span class="md-list-item-text">About</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <keep-alive>
          <router-view/>
        </keep-alive>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import LanguageSelector from "@/components/LanguageSelector";
const DEFAULT_LANG = "en_US";

export default {
  name: "App",
  data: () => ({
    lang: DEFAULT_LANG,
    menuVisible: false
  }),
  methods: {
    onLanguageChange: function(lang) {
      this.lang = lang;
    }
  },
  components: {
    LanguageSelector
  }
};
</script>

<style lang="scss">
@import "@/styles/index.scss";

.progress-bar-container--container {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  opacity: 0.85;
  z-index: 9999;
}

.btn-to-top {
  opacity: 0.40;
}

/// MD overrides
.md-app-content {
  padding: 0 !important;
  margin: 0 !important;
}

/// App styles
.md-app {
  height: 100%;
}

.md-app-toolbar {
  height: 115px;
}

.md-drawer {
  width: 300px;
  max-width: calc(100vw - 125px);
}

.page-app {
  background-color: $color-grey-ligth;
  overflow: hidden;

  .md-avatar {
    border: 1px solid $color-white;
    margin: 0 0 0 $size-s;
  }

  .coa-nav-bar {
    width: 100%;
    max-width: 100%;
  }

  @media (max-width: 425px) {
    /// Make tabs scrollable/swipeable
    .coa-nav-bar {
      overflow: scroll;
    }
  }
}
</style>
