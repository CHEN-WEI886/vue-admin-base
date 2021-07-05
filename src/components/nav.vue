<template>
  <div class="nav">
    <el-menu
      router
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      active-text-color="#0166de"
      text-color="#000"
      @select="handleselect"
      :unique-opened="true"
    >
      <div v-for="(item, index) in routerMenu" :key="index">
        <el-submenu :index="index + ''" v-if="item.children">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ item.name }}</span>
          </template>

          <el-menu-item-group>
            <el-menu-item
              v-for="(itm, indx) in item.children"
              :key="indx"
              :index="itm.path + ''"
              >{{ itm.name }}</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item v-else :index="item.path + ''">
          <i class="el-icon-location"></i>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
import apprLawItemsRouter from "../assets/commonJs/apprLawItemsRouter";
import lowItemRouter from "../assets/commonJs/lowItemRouter";
export default {
  data() {
    return {
      routerMenu: [], //路由列表
      activeMenu: "", //侧边栏的高亮
      routerName: "", //路由的类型名字
    };
  },
  created() {
    this.changeImport();
  },
  watch: {
    $route: {
      handler() {
        this.changeImport();
      },
      deep: true,
    },
  },
  methods: {
    changeImport() {
      //改变导入的路由文件，并且指定默认路由显示高亮，兼顾头部路由组件高亮问题
      this.routerName = this.$route.name.split("-")[0];

      //暂时写2个判断，多的封装成方法循环判断
      if (this.routerName == "ApprLawItems") {
        this.routerMenu = apprLawItemsRouter;
      } else if (this.routerName == "Law") {
        this.routerMenu = lowItemRouter;
      }
      this.changeTab();
    },

    changeTab() {
      //这一层判断是为了防止header清除sessionStorage里面的activeMenu过慢导致还能拿到activeMenu里面的值，误判头部导航栏切换是对其他进行印象
      if (
        sessionStorage.getItem("activeMenu") &&
        sessionStorage.getItem("activeMenu").split("-")[0] != this.routerName
      ) {
        console.log("进来了");
        this.activeMenu =
          this.routerMenu[0].path || this.routerMenu[0].children[0].path;
      } else {
        // console.log(111,this.routerMenu[0].path)
        this.activeMenu =
          sessionStorage.getItem("activeMenu") ||
          this.routerMenu[0].path ||
          this.routerMenu[0].children[0].path;
      }
    },
    /**
     *菜单激活回调
     * @param key 返回来的路由name
     */
    handleselect(key, path) {
      // console.log(key,path)
      sessionStorage.setItem("activeMenu", key);
    },
  },
};
</script>

<style lang="less">
.nav {
  position: relative;

  .el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow {
    color: #0166de;
    font-size: 16px;
    font-weight: 600;
  }
  .el-menu {
    border-right: none;
  }
  .el-submenu__title i {
    font-size: 16px;
    font-weight: 600;
  }
  .el-submenu .el-menu-item {
    text-align: center;
  }
  .el-submenu__title span {
    font-size: 16px;
    font-weight: 600;
  }
  .el-menu-item span {
    font-size: 16px;
    font-weight: 600;
  }
  // .el-aside{
  //   // overflow: hidden!important;
  // }
}
</style>