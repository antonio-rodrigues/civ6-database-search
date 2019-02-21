<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button
              class="md-icon-button"
              @click="menuVisible = !menuVisible"
            >
              <md-icon>menu</md-icon>
            </md-button>

            <span class="md-title">C-O-A</span>
          </div>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button">
              <md-icon>more_vert</md-icon>
            </md-button>
          </div>
        </div>

        <div class="md-toolbar-row">
          <md-tabs class="md-primary">
            <md-tab id="tab-home" md-label="Home" to="/"></md-tab>
            <md-tab id="tab-pages-civ-6" md-label="Civ.6" to="/civ/6"></md-tab>
            <md-tab id="tab-pages-civ-5" md-label="Civ.5" to="/civ/5"></md-tab>
            <md-tab id="tab-pages-civ-4" md-label="Civ.4" to="/civ/4"></md-tab>
            <md-tab
              id="tab-pages-civ-3"
              md-label="Civ.3"
              to="/civ/3"
              replace
            ></md-tab>
            <md-tab
              id="tab-pages-civ-2"
              md-label="Civ.2"
              to="/civ/2"
              replace
            ></md-tab>
            <md-tab
              id="tab-pages-civ-1"
              md-label="Civ.1"
              to="/civ/1"
              replace
            ></md-tab>
            <md-tab id="tab-favorites" md-label="About" to="/about"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0"
          >Navigation</md-toolbar
        >

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    menuVisible: false
  }),
  methods: {}
};
</script>

<style lang="scss">
@import "@/styles/index.scss";

.md-app {
  min-height: 100vh;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 300px;
  max-width: calc(100vw - 125px);
}
</style>
