<template>
  <div id="app" v-loading.fullscreen.lock="$store.state.loadShow">
    <md-header></md-header>
    <div>
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Header from "./components/header.vue";
export default {
  name: "App",
  components: {
    "md-header": Header,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="less" scope>
#app {
  min-width: 1366px;
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #fff;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #d5d5d5 !important;
    border-radius: 4px !important;
  }
}
</style>
