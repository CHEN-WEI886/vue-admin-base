<template>
  <div id="app" v-loading.fullscreen.lock="$store.state.loadShow">
    <div>
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isLogin: '', // 是否登录
    };
  },
  mounted(){
    // console.log(this.$route)
    // this.isLogin = this.$route.name
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
