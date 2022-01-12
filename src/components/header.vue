<template>
  <div class="header">
    <div class="left" title="广东省华荣公寓出租管理系统">
      广东省华荣公寓出租管理系统
    </div>
    <el-scrollbar class="el-scrollbar-nav">
      <ul class="scroll">
        <router-link
          :to="item.path"
          :class="item.active ? 'active' : 'nactive'"
          class="scroll_item"
          v-for="(item, index) in headerList"
          :key="index"
          @click.native="change(index, true)"
          >{{ item.name }}</router-link
        >
      </ul>
    </el-scrollbar>
    <div
      class="right"
      @mouseenter="changeInforShow"
      @mouseleave="changeInforShow"
    >
      <div class="right-contain">
        <el-avatar :size="34"></el-avatar>
        <div class="infor">
          <p>{{ name }}</p>
          <p>{{ role }}</p>
        </div>

        <div class="down" :style="inforShow ? 'display:flex' : 'display:none'">
          <span class="san"></span>
          <!-- <div class="person_infor">个人资料</div> -->
          <div class="quit" @click="quit">退出登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { openLoad, closeLoad, changStyle } from "@/assets/commonJs/until.js";

export default {
  data() {
    return {
      name: "华荣",
      role: "系统管理员",
      inforShow: false, //头像下拉框
      headerList: [
        // { name: "租房首页", active: true, path: "/ApprLawItems" },
        // { name: "法律法规库", active: false, path: "/Law" },
        // { name: "案卷评查", active: false, path: "/Survey" },
        // { name: "统计分析", active: false, path: "/#" },
        // { name: "执法队伍", active: false, path: "/#" },
        // { name: "案件调阅", active: false, path: "/#" },
        // { name: "监督台", active: false, path: "/#" },
        // { name: "统计报表", active: false, path: "/#" },
      ],
      headerActive: 0, // 头部路由高亮的索引
    };
  },
  watch: {
    /**
     * 1、防止用户手动改变url的值，导致在 header 的高亮错乱
     * */
    $route: {
      handler(nval) {
        // console.log(nval);

        //少数情况做判断，后台拿回来去路由做遍历
        switch (true) {
          case nval.name == "ApprLawItems-container":
            sessionStorage.setItem("headerActive", 0);
            this.change(0);
            break;

          case nval.name == "Law-library":
            sessionStorage.setItem("headerActive", 1);
            this.change(1);
          default:
            break;
        }
      },
      deep: true,
    },
  },
  created() {
    // console.log(222)
    this.headerActive = sessionStorage.getItem("headerActive") || 0;
    this.change(this.headerActive);
  },
  methods: {
    changeInforShow() {
      this.inforShow = !this.inforShow;
    },

    /**
     * @param index 头部显示的索引
     * @param clearflag 主要是哦按段是否是刷新情况下调用，还是点击时候调用，点击就要clear，刷新不用clear
     */
    change(index, clearflag) {
      // console.log("header");
      if (clearflag) sessionStorage.clear();
      sessionStorage.setItem("headerActive", index);
      this.headerList.forEach((item, indx) => {
        if (index == indx) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
    },
    quit() {
      sessionStorage.clear()
      this.inforShow = false
      this.$message({
        message: '退出成功!',
        type: 'success'
      })
      openLoad();
      setTimeout(() => {
        closeLoad();
      }, 500);
      setTimeout(()=>{
        this.$router.replace({name:'login'})
      },1000)
    }
  },
};
</script>

<style lang="less">
.header {
  width: 100%;
  height: 66px;
  min-width: 1366px;
  background-color: #5077aa;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 30;

  .left {
    width: 330px;
    line-height: 66px;
    text-align: center;
    font-size: 18px;
    color: #fff;
    font-weight: 700;
  }
  .el-scrollbar-nav {
    height: 100%;
    width: 55%;
    .el-scrollbar__wrap {
      overflow-x: auto;
      height: calc(100% + 10px); //多出来的20px是横向滚动条默认的样式
      .el-scrollbar__view {
        height: 100%;
      }
    }
  }
  .scroll {
    width: 55%;
    display: flex;
    height: 100%;
    // overflow-x: scroll;
    list-style-type: none;
    .scroll_item {
      padding: 0 20px;
      display: flex;
      align-items: center;
      white-space: nowrap;
      font-size: 18px;
      text-decoration: none;
      cursor: pointer;
      color: #fff;
    }
    .scroll_item:hover {
      background-color: #396094;
    }
    .nactive {
      color: #fff;
      background-color: #5077aa;
    }
    .active {
      background-color: #fff !important;
      color: #5077aa !important;
    }
  }
  .right {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    cursor: pointer;
    position: relative;
    .right-contain {
      width: 150px;
      padding: 10px;
      border-radius: 6px;
      height: 50px;
      display: flex;
      align-items: center;
      .infor {
        margin-left: 10px;
        p {
          color: #fff;
          line-height: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p:last-of-type {
          line-height: 24px;
          color: hsla(0, 0%, 100%, 0.5);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .down {
        position: absolute;
        top: 66px;
        // right: 20px;
        color: #000;
        width: 150px;
        height: 80px;
        background-color: #fff;
        border: 1px solid #eee;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        div {
          width: 100%;
          text-align: center;
          line-height: 40px;
          font-size: 12px;
        }
        div:hover {
          background-color: #dff8f8;
          color: blue;
        }
        .san {
          position: absolute;
          top: -20px;
          right: 30px;
          width: 0;
          height: 0;
          border-width: 10px;
          border-style: solid;
          border-color: transparent transparent #fff transparent;
        }
      }
    }
    .right-contain:hover {
      background-color: #396094;
    }
  }
}
</style>