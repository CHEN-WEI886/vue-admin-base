<template>
  <div class="container" :style="`height: ${availHeight}px;`">
    <md-header></md-header>
    <div class="scrollbar-nav" v-if="showNav">
      <md-nav></md-nav>
    </div>
    <div
      class="scrollbar-container"
      ref="centerScroll"
      :style="`width: ${availWidth}px;`"
    >
      <router-view />
    </div>
  </div>
</template>

<script>
import Nav from "../components/nav.vue";
import Header from "./header.vue";

export default {
  components: {
    "md-nav": Nav,
    "md-header": Header,
  },
  data() {
    return {
      availHeight: 600, //可视高度
      availWidth: 0, // 可视宽度
      showNav: "", // 看他是否要展示侧边栏
    };
  },
  created() {
    // console.log(222);
    this.changeNav();
    /** 
      1、window.onresize 动态获取屏幕的可视的高度
      2、用箭头函数，不然this只想会有问题
      3、一开始先执行一次，不然不是当前的高度
      4、getAvailHeight获取屏幕高度，getAvailWidth获取屏幕宽度
     */
    this.getAvailHeight();
    this.getAvailWidth();
    window.addEventListener("resize", () => {
      this.getAvailHeight();
      this.getAvailWidth();
    });
  },
  watch: {
    /* 
      1、判断路由的形式，看他是否要展示侧边栏 noshowNav 的值
    */
    $route: {
      handler() {
        this.changeNav();
        this.getAvailWidth();
      },
      deep: true,
    },
  },
  mounted() {
    this.changeActive();
    this.$router.replace({
      name: this.$router.name,
      query: {...this.$router.query}
    })
  },
  methods: {
    changeActive() {
      //带有侧边栏的组件
      this.$refs.centerScroll.addEventListener( "scroll",() => {
          //去仓库里，实时更新滚动距离
          this.$store.commit(
            "activeDistance",
            this.$refs.centerScroll.scrollTop
          );
        },
        false
      );
    },

    getAvailHeight() {
      //获取可视高度，进行动态绑定
      this.availHeight = document.documentElement.clientHeight;
    },

    changeNav() {
      //改变侧边栏状态
      let routeName = this.$route.name.split("-")[1];
      routeName == "noshowNav" ? (this.showNav = false) : (this.showNav = true);
      localStorage.setItem("showNav", JSON.stringify(this.showNav));
    },
    getAvailWidth() {
      // 减去200 是侧边栏的200，根据下面scrollbar-nav类上面定义的width
      this.showNav = JSON.parse(localStorage.getItem("showNav"));
      let distance = JSON.parse(this.showNav) ? 200 : 0;
      this.availWidth = document.documentElement.clientWidth - distance;
    },
  },
};
</script>

<style lang="less" scope>
.container {
  display: flex;
  // min-width: 1366px;
  padding-top: 66px;
  height: 100%;
  overflow-x: auto;

  .scrollbar-nav {
    height: 100%;
    width: 200px;
    overflow-y: auto;
    overflow-x: hidden;
    border-right: solid 1px #e6e6e6;
  }
  .scrollbar-container {
    height: 100%;
    overflow: auto;
  }
}
</style>