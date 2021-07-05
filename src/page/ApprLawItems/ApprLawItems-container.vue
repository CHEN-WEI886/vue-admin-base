<template>
  <div
    class="ApprLawItems-container center-content"
  >
    <div class="tab">
      <div 
      class="tab-item" 
      :class="item.active?'active':''" 
      v-for="(item,index) in tabItem" 
      :key="index" 
      @click="changeTab(index)"
      > 
      {{item.name}} 
      <span>{{item.num}}</span>
    </div>
    </div>

    <div class="search-all">
      <div class="search-input">
        <div class="search-item">
          <span class="lab-name">事项名称</span>
          <el-input class="event-name" placeholder="请输入事项名称"></el-input>
        </div>

        <div class="search-item">
          <span class="lab-name">事项类型</span>
          <el-select
            class="select"
            v-model="value"
            clearable
            placeholder="请选择事项类型"
          >
            <el-option
              v-for="item in downData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <div class="search-item">
          <span class="lab-name">职权部门</span>
          <el-select
            class="select"
            v-model="value"
            clearable
            placeholder="请选择职权部门"
          >
            <el-option
              v-for="item in downData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <el-button type="primary">查询</el-button>
        <div class="clear">清空条件</div>
        <div class="updown" @click="changeDown">
          <div v-if="down">展开<i class="el-icon-arrow-down"></i></div>
          <div v-else>收起<i class="el-icon-arrow-up"></i></div>
        </div>
      </div>
      <div class="search-input searchs" v-if="!down">
        <div class="search-item">
          <span class="lab-name">事项编码</span>
          <el-input placeholder="请输入事项编码"></el-input>
        </div>
        <div class="search-item">
          <span class="lab-name">实施层级</span>
          <el-select
            class="select"
            v-model="value"
            clearable
            placeholder="请选择实施层级"
          >
            <el-option
              v-for="item in downData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>

    <el-button type="primary" icon="el-icon-plus" @click="addShow"
      >新增</el-button
    >
    <div class="table">
      <el-table
        :data="tableData"
        border
        :header-cell-style="{ background: '#FAFAFA' }"
      >
        <el-table-column prop="id" label="序号" width="80"> </el-table-column>
        <el-table-column prop="name" label="事项名称" min-width="20%">
        </el-table-column>
        <el-table-column prop="department" min-width="10%" label="权职部门">
        </el-table-column>
        <el-table-column prop="num" label="事项编码" width="120">
        </el-table-column>
        <el-table-column prop="type" label="事项类型" width="80">
        </el-table-column>
        <el-table-column prop="hierarchy[0].label" label="实施层级" width="130">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="handleClick(0, scope.row)"
              >查看</el-button
            >
            <el-button
              type="text"
              size="mini"
              @click="handleClick(1, scope.row)"
            >
              编辑</el-button
            >
            <el-button type="text" size="mini" @click="deleteRow"> 删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="page">
        <next-page
          :page='page'
          @handleSizeChange='handleSizeChange' 
          @handleCurrentChange='handleCurrentChange'
        >
        </next-page>
      </div>
    </div>

    <!-- 新增弹窗 -->
    <el-dialog title="选择事项类型" width="510px" :visible.sync="addshow">
      <div class="dialog-type">
        <el-radio-group v-model="addRadio">
          <el-radio
            v-for="(item, index) in checkboxList"
            :key="index"
            :label="index"
            border
            >{{ item.name }}</el-radio
          >
        </el-radio-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addHidden">取 消</el-button>
        <el-button type="primary" @click="addHidden">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { openLoad, changStyle } from "../../assets/commonJs/until";
import { indexAjax,verifyCodeAjax,usersAjax } from '../../assets/ajax/ajax' //一个个导入 （推荐）
import * as requestApi from '../../assets/ajax/ajax' // 那他作为一个整体全部导入命名为 requestApi

export default {
  data() {
    return {
      down: true, // 展开收起的状态
      addRadio: "", // 新增弹窗的选中状态
      page:{ // 分页传给组件的基本信息
        total:40,
        pageSizes:[10,20,30,50]
      },
      tabItem: [ //状态的列表
        { name: "待提交", num: 610, active:true },
        { name: "已提交", num: 60, active:false },
        { name: "所有", num: 670, active:false },
      ],
      downData: [ // 下拉的列表
        {
          value: "选项1",
          label: "行政处罚",
        },
        {
          value: "选项2",
          label: "军事处罚",
        },
        {
          value: "选项3",
          label: "刑事拘留",
        }
      ],
      checkboxList: [ //新增按钮的选项
        { name: "行政处罚", active: false },
        { name: "行政处罚1", active: false },
        { name: "行政处罚2", active: false },
        { name: "行政处罚3", active: false },
      ],
      value: "", //下拉框的选中
      tableData: [ //表格的数据
        {
          id: 1,
          name: "对自然保护区管理的监督检查",
          department: "工业和信息化",
          num: "440684",
          type: "行政检查",
          hierarchy: [{ label: "省级", value: 0 }],
          status: "待提交",
        },
        {
          id: 2,
          name: "对自然保护区管理的监督检查",
          department: "工业和信息化",
          num: "440684",
          type: "行政检查",
          hierarchy: [{ label: "省级", value: 0 }],
          status: "待提交",
        },
        {
          id: 3,
          name: "对自然保护区管理的监督检查",
          department: "工业和信息化",
          num: "440684",
          type: "行政检查",
          hierarchy: [{ label: "省级", value: 0 }],
          status: "待提交",
        },
        {
          id: 4,
          name: "对自然保护区管理的监督检查",
          department: "工业和信息化",
          num: "440684",
          type: "行政检查",
          hierarchy: [{ label: "省级", value: 0 }],
          status: "待提交",
        },
        {
          id: 5,
          name: "对自然保护区管理的监督检查",
          department: "工业和信息化",
          num: "440684",
          type: "行政检查",
          hierarchy: [{ label: "省级", value: 0 }],
          status: "待提交",
        },
        {
          id: 6,
          name: "对自然保护区管理的监督检查",
          department: "工业和信息化",
          num: "440684",
          type: "行政检查",
          hierarchy: [{ label: "省级", value: 0 }],
          status: "待提交",
        },
      ],
      addshow: false, // 新增按钮的显示隐藏
    };
  },
  created() {
    //打开加载框
    openLoad();
    this.getInfor()
  },
  methods: {
    async getInfor(){
      // let i = 0
      // let res = await i++
      // // console.log("res=>",this.getInfor())
      usersAjax({},'get').then((res)=>{
        console.log(res)
      })
    },
    deleteRow(){ //删除列
      this.$message({
          message: '警告，别删除我!',
          type: 'warning'
        });
    },
    addShow(){ // 新增弹窗的出现
      this.addshow = true
    },
    addHidden(){
      this.addshow = false
    },
    changeTab(index){
      changStyle(index,this.tabItem)
      openLoad();
    },
    changeDown() {
      this.down = !this.down;
    },
    /**
     * @param type 判断是编辑模式还是查看模式
     * @param row 点击这一列的数据
    */
    handleClick(type, row) {
      this.$router.push({
        name: "editor-noshowNav",
        query: { type, row: JSON.stringify(row) },
      });
      console.log(row);
    },

    /**
     * 接受子组件传过来的页数
    */
    handleSizeChange(val) {
      console.log('下一页调用接口',val);
    },
    handleCurrentChange(val) {
      console.log('跳转某一页调用接口',val);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.ApprLawItems-container {
  // width: 100%;
  flex: 1;
  padding: 20px;
  .tab {
    display: flex;
    .tab-item {
      margin-bottom: 10px;
      position: relative;
      height: 36px;
      margin-right: 21px;
      cursor: pointer;
      display: flex;
      align-items: center;
      font-size: 14px;
      padding: 8px 16px;
      border-radius: 4px;
      background: #e5f1ff;
      span {
        display: inline-block;
        min-width: 24px;
        height: 13px;
        line-height: 13px;
        overflow: hidden;
        background: #c6dbf5;
        color: #0166de;
        border-radius: 100px;
        padding: 0 5px;
        font-size: 12px;
        text-align: center;
        position: relative;
        margin-left: 28px;
      }
    }
    .tab-item:hover {
      color: #fff;
      background: #2b80e4;
    }
    .active {
      color: #fff;
      background: #2b80e4;
    }
  }

  .search-all {
    white-space: nowrap;
    .search-input {
      display: flex;
      align-items: center;
      color: #666;
      font-size: 14px;
      margin-top: 20px;
      margin-bottom: 30px;
      .el-input.main-name-input {
        width: 300px;
      }
      .lab-name {
        white-space: nowrap;
        margin-right: 14px;
      }
      .search-item {
        display: flex;
        align-items: center;
        margin-right: 20px;
        .event-name {
          width: 300px;
        }
        .select {
          width: 152px;
        }
      }
      .clear {
        margin-left: 20px;
      }
      .clear:hover {
        color: #0166de;
        cursor: pointer;
      }
      .updown {
        margin-left: 20px;
        color: #000;
        font-weight: 600;
        cursor: pointer;
      }
    }
    .searchs {
      justify-content: flex-start;
      margin-bottom: 30px;
    }
  }
  .dialog-type {
    .el-radio.is-bordered + .el-radio.is-bordered {
      margin-left: 0;
      margin-bottom: 20px;
    }
  }
  .table {
    .page {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
}
</style>
