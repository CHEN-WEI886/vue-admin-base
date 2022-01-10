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
          <label class="label-title">是否已清洁 <span>*</span> </label>
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
          <label class="label-title">实施层级 <span>*</span> </label>
          <el-select
            multiple
            :disabled="type"
            v-model="formInfor.hierarchy"
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

      <div class="title" ref="case" id="case">设立依据</div>

      <div class="title" ref="case1" id="case1">设定依据</div>
      <div v-if="!type">
        <el-button type="primary" icon="el-icon-plus" @click="lowShow = true"
          >关联法律法规</el-button
        >
      </div>

      <div class="title" ref="photo" id="photo">电子证照</div>

      <div v-if="!type">
        <el-button type="primary" icon="el-icon-plus" @click="photoShow = true"
          >关联电子照</el-button
        >
        <el-table
          :data="photoSelection"
          border
          style="width: 100%; margin-top: 20px"
          :header-cell-style="{ background: '#FAFAFA' }"
        >
          <el-table-column prop="date" label="证件名称" width="380">
          </el-table-column>
          <el-table-column prop="name" label="目录基本码" width="300">
          </el-table-column>
          <el-table-column prop="address" label="行业部门" width="295">
          </el-table-column>
          <el-table-column prop="address" label="操作" min-width="20%">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope)" type="text" size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      <el-button type="primary" @click="capyt">截图</el-button>
      <el-button type="primary">关闭</el-button>
      <el-button type="primary">保存</el-button>
      <el-button type="primary">提价</el-button>
    </div>

    <!-- low弹窗 -->
    <el-dialog
      class="low-dialog"
      title="新增违法行为依据"
      :visible.sync="lowShow"
      width="74%"
    >
      <div class="search">
        <div class="search-item">
          证照名称 <el-input placeholder="请输入内容"></el-input>
        </div>
        <div class="search-item">
          目录基本码 <el-input placeholder="请输入内容"></el-input>
        </div>

        <el-button type="primary">查询</el-button>
        <div class="clear">清空条件</div>
      </div>

      <div class="dialog-body">
        <div class="left">
          <div class="title">
            <el-input placeholder="请输入内容"></el-input>
            <el-button type="info" plain>搜索</el-button>
          </div>
          <div>
            <el-tree
              :data="lowTree"
              :props="defaultProps"
              @node-click="handleNodeClick"
            ></el-tree>
          </div>
        </div>
        <div class="mid">
          <div class="title">
            <el-input placeholder="请输入内容"></el-input>
            <el-button type="info" plain>搜索</el-button>
            <div class="case" @click="caseDownFun">
              参考依据
              <i v-if="caseDown" class="el-icon-arrow-down"></i>
              <i v-else class="el-icon-arrow-up"></i>
            </div>
          </div>
          <div v-if="caseDown" class="caseContent">
            <p>暂无内容</p>
          </div>
        </div>
        <div class="right">
          <div class="title">
            已选中
            <i
              class="el-icon-delete clear-btn"
              @click="clearlowSelection()"
            ></i>
          </div>
          <ul class="right-body">
            <li
              class="right-item"
              v-for="(item, index) in lowSelection"
              :key="index"
            >
              {{ item.label }}
              <!-- <i
                class="el-icon-circle-close"
                @click="toggleSelection([photoData[item.id]])"
              ></i> -->
            </li>
          </ul>
        </div>
      </div>

      <div class="d-footer">
        <el-button type="danger" @click="lowShow = false">取消</el-button>
        <el-button type="primary" @click="sure">确定</el-button>
      </div>
    </el-dialog>

    <!-- 电子照弹窗 -->
    <el-dialog class="dialog" title="关联电子照" :visible.sync="photoShow">
      <div class="search">
        <div class="search-item">
          证照名称 <el-input placeholder="请输入内容"></el-input>
        </div>
        <div class="search-item">
          目录基本码 <el-input placeholder="请输入内容"></el-input>
        </div>

        <el-button type="primary">查询</el-button>
        <div class="clear">清空条件</div>
      </div>

      <div class="dialog-body">
        <el-table
          ref="multipleTable"
          :data="photoData"
          tooltip-effect="dark"
          border
          v-infinite-scroll="load"
          height="250"
          style="margin-top: 20px; overflow: auto"
          :header-cell-style="{ background: '#FAFAFA' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="证件名称" width="283">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="目录基本码" width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="行业部门"
            show-overflow-tooltip
            width="180"
          >
          </el-table-column>
        </el-table>

        <div class="right">
          <div class="title">
            已选中
            <i class="el-icon-delete clear-btn" @click="toggleSelection()"></i>
          </div>
          <ul class="right-body">
            <li
              class="right-item"
              v-for="(item, index) in multipleSelection"
              :key="index"
            >
              {{ item.date }}
              <i
                class="el-icon-circle-close"
                @click="toggleSelection([photoData[item.id]])"
              ></i>
            </li>
          </ul>
        </div>
      </div>

      <div class="d-footer">
        <el-button type="danger" @click="photoShow = false">取消</el-button>
        <el-button type="primary" @click="sure">确定</el-button>
      </div>
    </el-dialog>
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
        { name: "设立依据", active: false, target: "case", offsetTop: 0 },
        { name: "设立依据", active: false, target: "case1", offsetTop: 0 },
        { name: "电子证件", active: false, target: "photo", offsetTop: 0 },
      ],
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
      photoSelection: [], // 选中的电子照片的数据
      photoData: [
        // 电子照片的数据
        {
          date: "不动产登记结果信息表（产权）1",
          name: "200278201",
          id: 0,
        },
        {
          date: "不动产登记结果信息表（产权）2",
          name: "200278201",
          id: 1,
        },
        {
          date: "不动产登记结果信息表（产权3）",
          name: "200278201",
          id: 2,
        },
        {
          date: "不动产登记结果信息表（产权）4",
          name: "200278201",
          id: 3,
        },
        {
          date: "不动产登记结果信息表（产权）5",
          name: "200278201",
          id: 4,
        },
        {
          date: "不动产登记结果信息表（产权）6",
          name: "200278201",
          id: 5,
        },
        {
          date: "不动产登记结果信息表（产权）7",
          name: "200278201",
          id: 6,
        },
        {
          date: "不动产登记结果信息表（产权）8",
          name: "200278201",
          id: 7,
        },
        {
          date: "不动产登记结果信息表（产权）9",
          name: "200278201",
          id: 8,
        },
        {
          date: "不动产登记结果信息表（产权）10",
          name: "200278201",
          id: 9,
        },
        {
          date: "不动产登记结果信息表（产权）11",
          name: "200278201",
          id: 10,
        },
        {
          date: "不动产登记结果信息表（产权）12",
          name: "200278201",
          id: 11,
        },
        {
          date: "不动产登记结果信息表（产权）13",
          name: "200278201",
          id: 12,
        },
        {
          date: "不动产登记结果信息表（产权）14",
          name: "200278201",
          id: 13,
        },
        {
          date: "不动产登记结果信息表（产权）15",
          name: "200278201",
          id: 14,
        },
      ],
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

    console.log('parent>>',parent.store)
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
    capyt(){
      console.log(111,this.$refs.capyt)
      html2canvas(this.$refs.capyt).then(canvas => {
        console.log(canvas)
          // document.body.appendChild(canvas)
      });
    },
    caseDownFun() {
      this.caseDown = !caseDown;
    },
    //点击改变侧边栏的状态
    change(index, target) {
      changStyle(index, this.rightNav);
      jump(target);
    },

    esitChang() {
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