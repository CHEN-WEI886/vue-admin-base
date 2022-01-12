<template>
  <div class="editor center-nonav-content" ref="capture">
    <div class="infor">
      <h1>新增房间</h1>
      <div class="title" ref="infor" id="infor">基本信息</div>
      <div></div>
      <div class="content-item">
        <label class="label-title">房间号</label>
        <el-input
          v-model="formInfor.name"
          placeholder="请输入房间号"
          :disabled="true"
        ></el-input>
      </div>

      <div class="downgroud">
        <div class="content-down">
          <label class="label-title">房间类型</label>
          <el-select v-model="formInfor.type" disabled placeholder="请选择房间类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <div class="content-down">
          <label class="label-title">房间楼层</label>
          <el-input
            v-model="formInfor.num"
            placeholder="请选择房间类型"
            :disabled="true"
          ></el-input>
        </div>

        <div class="content-down">
          <label class="label-title">是否已清洁<span>*</span> </label>
          <el-select
            v-model="formInfor.department"
            :disabled="type"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <div class="content-down">
          <label class="label-title">状态 <span>*</span> </label>
          <el-select
            v-model="formInfor.type"
            :disabled="type"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="title" ref="case" id="case">房间设施</div>

      <div class="title" ref="case1" id="case1">房间照片</div>

    </div>

    <!-- 后期抽出来作为组件 -->
    <div class="right-nav">
      <el-button type="primary" @click="goback()" icon="el-icon-back"
        >返回</el-button
      >
      <ul class="float-panel">
        <li
          :class="item.active ? 'active' : ''"
          class="panel-item"
          v-for="(item, index) in rightNav"
          :key="index"
          @click="change(index, item.target)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>

    <div class="footer">
      <el-button type="primary">关闭</el-button>
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>
import {
  jump,
  openLoad,
  initRightNav,
  changStyle,
} from "../../assets/commonJs/until";
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      caseDown: false, // 弹窗的建议下拉框状态
      activeDistance: "", //滚动条滚动的距离
      lowTree: [
        // 法律树数据
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        // 默认打开的法律树节点
        children: "children",
        label: "label",
      },
      rightNav: [
        //右边侧边栏的信息 ，多的时候可以封装起来
        { name: "基本信息", active: true, target: "infor", offsetTop: 0 },
        { name: "房间设施", active: false, target: "case", offsetTop: 0 },
        { name: "房间照片", active: false, target: "case1", offsetTop: 0 },
      ],
      type: this.$router.query.type || 0,
      formInfor: {}, //传进来的数据
      options: [
        // 层级，部门下拉框统一，没有做过多操作
        {
          value: "选项1",
          label: "省级",
        },
        {
          value: "选项2",
          label: "市级",
        },
        {
          value: "选项3",
          label: "国家级",
        },
      ],
      value: "", // 输入框的值，没有分开做，简单的写上来做展示
      photoShow: false, // photo弹窗的展示与否
      lowShow: false, // law弹窗的展示与否
      count: 0, // 上滚加载的页数
      multipleSelection: [], //选中之后用来展示的列表
      lowSelection: [],
      type: "",
      setTime: "", //用于防抖
    };
  },
  created() {
    this.$route.query.type ? (this.type = false) : (this.type = true);
    this.formInfor = JSON.parse(this.$route.query.row);
    this.formInfor.hierarchy = [this.formInfor.hierarchy[0].label];
    //打开加载框
    openLoad();
  },
  mounted() {
    initRightNav(this.rightNav);
    this.esitChang();
    window.addEventListener("scroll",() => {
        clearTimeout(this.setTime);
        this.setTime = setTimeout(() => {
          this.esitChang();
        }, 300);
      },
      true
    );
  },
  methods: {
    caseDownFun() {
      this.caseDown = !caseDown;
    },
    //点击改变侧边栏的状态
    change(index, target) {
      changStyle(index, this.rightNav);
      jump(target);
    },

    esitChang() {
      console.log(this.activeDistance)
      //判断滚动条滚动的距离是在数组的那个范围里
      this.activeDistance = this.$store.state.activeDistance;
      this.rightNav.forEach((item, index) => {
        if (index == 0) {
          changStyle(0, this.rightNav);
        } else if (
          this.activeDistance > this.rightNav[index - 1].offsetTop &&
          this.activeDistance <= item.offsetTop
        ) {
          changStyle(index, this.rightNav);
        }
      });
    },
    handleNodeClick(data) {
      if (data.children == null) this.lowSelection.push(data);
      console.log(this.lowSelection);
    },
    handleClick(row) {
      this.photoSelection.splice(row.$index, 1);
      // console.log(111,row)
    },
    goback() {
      let i = 0
      console.log(this.$route.name)
      // this.$router.replace({name: this.$route.name, query: {type:  +i}});

      // this.$router.go(-1);
      // this.$router.push({ name:'redirect', query:{ type:'back' }});
    },

    load() {
      this.count += 2;
    },
    sure() {
      this.photoShow = false;
      this.photoSelection = this.multipleSelection;
    },

    clearlowSelection() {
      this.lowSelection = [];
    },
    toggleSelection(rows) {
      // console.log(222, rows);
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.lowSelection = [];
        this.$refs.multipleTable.clearSelection();
      }
    },

    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
  },
};
</script>

<style lang="less">
.editor {
  width: 100%;
  display: flex;
  // overflow-y: auto;
  .infor {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-items: center;
    padding: 20px 0px 100px 30px;
    h1 {
      text-align: center;
      font-weight: 500;
    }
    .title {
      font-size: 24px;
      line-height: 50px;
      color: #212b36;
      border-bottom: 3px solid #212b36;
      text-align: left;
      margin-bottom: 20px;
      margin-top: 40px;
    }
    .content-item {
      white-space: nowrap;
      display: flex;
      align-items: center;

      .label-title {
        width: 96px;
        font-size: 16px;
        color: #212b36;
        font-weight: 400;
        text-align: left;
      }
    }
    .downgroud {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 50px;
      .content-down {
        width: 48%;
        display: flex;
        align-items: center;
        padding-top: 30px;
        .label-title {
          width: 90px;
          font-size: 16px;
          color: #212b36;
          font-weight: 400;
          text-align: left;
          span {
            color: red;
            display: inline-block;
            transform: translateY(4px);
          }
        }
        .el-input {
          width: 400px;
        }
      }
      .content-down:nth-of-type(2n) {
        justify-content: flex-end;
        margin-left: 40px;
      }
    }
  }
  .right-nav {
    // width: 20%;
    z-index: 19;
    box-shadow: 0 -2px 10px rgb(0 0 0 / 10%);
    border-radius: 10px;
    padding: 50px;
    position: fixed;
    background-color: #fff;
    right: 50px;
    top: 120px;
    .float-panel {
      border-left: 1px solid #e2e2e2;
      padding-top: 1px;
      margin-top: 20px;
      .panel-item {
        height: 26px;
        margin: 15px 0;
        padding-left: 30px;
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        line-height: 26px;
        color: #637381;
        cursor: pointer;
        border-left: 4px solid #fff;
      }
      .active {
        border-color: #5077aa;
        color: #5077aa;
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    z-index: 20;
    height: 60px;
    padding-right: 100px;
    background-color: #fff;
    box-shadow: 0 -2px 10px rgb(0 0 0 / 10%);
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .low-dialog {
    .el-dialog {
      width: 1190px !important;
    }
    .search {
      display: flex;
      align-items: center;
      .search-item {
        white-space: nowrap;
        display: flex;
        align-items: center;
        .el-input {
          width: 150px;
          margin: 0 20px 0 10px;
        }
      }
    }
    .clear {
      cursor: pointer;
      margin-left: 30px;
    }
    .clear:hover {
      color: #5077aa;
    }
    .dialog-body {
      display: flex;
      height: 421px;
      margin-top: 30px;
      .el-input {
        width: 150px;
        .el-input__inner {
          width: 100%;
          height: 30px;
        }
      }

      .el-button {
        height: 30px;
        padding: 0 20px;
        margin-left: 10px;
      }
      .left {
        height: 100%;
        flex: 1;
        border: 1px solid #e2e2e2;
        .title {
          height: 50px;
          line-height: 50px;
          background: rgb(245, 245, 245);
          border-bottom: 1px solid #e2e2e2;
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          color: rgb(99, 115, 129);
          padding: 0px 15px 0px 15px;
        }
      }
      .mid {
        height: 100%;
        width: 50%;
        border-bottom: 1px solid #e2e2e2;
        .title {
          height: 50px;
          line-height: 50px;
          background: rgb(245, 245, 245);
          font-size: 14px;
          display: flex;
          border-bottom: 1px solid #e2e2e2;
          border-top: 1px solid #e2e2e2;
          justify-content: flex-end;
          align-items: center;
          font-weight: 600;
          color: rgb(99, 115, 129);
          padding: 0px 15px 0px 15px;
          .case {
            margin-left: 10px;
            cursor: pointer;
          }
        }
        .caseContent {
          width: 100%;
          height: 200px;
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid #e2e2e2;
        }
      }
      .right {
        flex: 1;
        height: 100%;
        display: inline-block;
        vertical-align: top;
        border: 1px solid #e2e2e2;
        color: rgb(99, 115, 129);
        .title {
          height: 50px;
          line-height: 50px;
          background: rgb(245, 245, 245);
          border-radius: 4px 4px 0px 0px;
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          color: rgb(99, 115, 129);
          padding: 0px 15px 0px 15px;
          i {
            cursor: pointer;
          }
          i:hover {
            color: rgb(190, 13, 13);
          }
        }
        .right-body {
          height: 80%;
          overflow-y: auto;
          .right-item {
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            i {
              cursor: pointer;
            }
          }
        }
      }
    }
    .d-footer {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }

  .dialog {
    .el-dialog {
      width: 1000px !important;
    }
    .search {
      display: flex;
      align-items: center;
      .search-item {
        white-space: nowrap;
        display: flex;
        align-items: center;
        .el-input {
          width: 150px;
          margin: 0 20px 0 10px;
        }
      }
    }
    .clear {
      cursor: pointer;
      margin-left: 30px;
    }
    .clear:hover {
      color: #5077aa;
    }
    .dialog-body {
      display: flex;
      .right {
        width: 280px;
        display: inline-block;
        vertical-align: top;
        border: 1px solid rgb(235, 238, 245);
        color: rgb(99, 115, 129);
        height: 270px;
        margin-left: 45px;
        .title {
          height: 50px;
          line-height: 50px;
          background: rgb(245, 245, 245);
          border-radius: 4px 4px 0px 0px;
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          color: rgb(99, 115, 129);
          padding: 0px 15px 0px 15px;
          i {
            cursor: pointer;
          }
          i:hover {
            color: rgb(190, 13, 13);
          }
        }
        .right-body {
          height: 80%;
          overflow-y: auto;
          .right-item {
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            i {
              cursor: pointer;
            }
          }
        }
      }
    }
    .d-footer {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>