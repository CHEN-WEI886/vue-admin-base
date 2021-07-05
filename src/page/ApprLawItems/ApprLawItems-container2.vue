<template>
  <div 
    class="ApprLawItems-container2 center-content" 
  >
  
    <div class="tab">
      <div class="tab-item active">待发布 <span>6303</span></div>
      <div class="tab-item">已发布 <span>11</span></div>
      <div class="tab-item">所有 <span>7232</span></div>
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
              v-for="item in options"
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
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <el-button type="primary">查询</el-button>
        <div class="clear">清空条件</div>
        <div
          class="updown"
          @click="
            () => {
              down = !down;
            }
          "
        >
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
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>

    <el-button type="primary" icon="el-icon-plus" @click="addshow = true">新增</el-button>
    <div class="table">
      <el-table :data="tableData" border  :header-cell-style="{background:'#FAFAFA'}">
        <el-table-column prop="id" label="序号" width="80"> </el-table-column>
        <el-table-column prop="name" label="事项名称" min-width='20%' >
        </el-table-column>
        <el-table-column prop="department" min-width='10%' label="权职部门">
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
            <el-button @click="handleClick(0,scope.row)" type="text" size="mini"
              >查看</el-button
            >
            <el-button type="text" size="mini" @click="handleClick(1,scope.row)"> 发布</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="page">
        
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="100"
          :total="400">
        </el-pagination>
      </div>

    </div>

    <el-dialog  title="选择事项类型" width="510px" :visible.sync="addshow">
      <div class="dialog-type">
        <el-radio-group v-model="radio">
          <el-radio v-for="(item,index) in checkboxList" :key="index" :label="index" border>{{item.name}}</el-radio>
        </el-radio-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addshow=false">取 消</el-button>
        <el-button type="primary" @click="addshow=false">确 定</el-button>
      </div>
    </el-dialog>
      <!-- </el-scrollbar> -->

  </div>
</template>

<script>
import { openLoad } from "../../assets/commonJs/until";

export default {
  name: "HelloWorld",
  data() {
    return {
      down: true,
      radio:'',
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      checkboxList:[{name:'行政处罚',active:false},
      {name:'行政处罚1',active:false},
      {name:'行政处罚2',active:false},
      {name:'行政处罚3',active:false}],
      addshow:false,
      value: "",
      tableData: [
        {
          id:1,
          name: "对自然保护区管理的监督检查",
          department: "工业和信息化",
          num: "440684",
          type:'行政检查',
          hierarchy:[{label:'省级',value:0}],
          status:'待提交'
        },
        {
          id:2,
          name: "对自然保护区管理的监督检查",
          department: "工业和信息化",
          num: "440684",
          type:'行政检查',
          hierarchy:[{label:'省级',value:0}],
          status:'待提交'
        },
        {
          id:3,
          name: "对自然保护区管理的监督检查",
          department: "工业和信息化",
          num: "440684",
          type:'行政检查',
          hierarchy:[{label:'省级',value:0}],
          status:'待提交'
        },
        {
          id:4,
          name: "对自然保护区管理的监督检查",
          department: "工业和信息化",
          num: "440684",
          type:'行政检查',
          hierarchy:[{label:'省级',value:0}],
          status:'待提交'
        },
        {
          id:5,
          name: "对自然保护区管理的监督检查",
          department: "工业和信息化",
          num: "440684",
          type:'行政检查',
          hierarchy:[{label:'省级',value:0}],
          status:'待提交'
        },
        {
          id:6,
          name: "对自然保护区管理的监督检查",
          department: "工业和信息化",
          num: "440684",
          type:'行政检查',
          hierarchy:[{label:'省级',value:0}],
          status:'待提交'
        },
      ],
      addshow:false,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
    };
  },
  created() {
        //打开加载框
    openLoad()
    // console.log(11,this.down)
  },
  methods: {
    handleClick(type,row) {
      this.$router.push({name:'editor-noshowNav',query:{ type,row:JSON.stringify(row) }})
      // this.$router.push({name:'redirect',query:{ name:'editor-noshowNav', type,row:JSON.stringify(row) }})
      console.log(row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.ApprLawItems-container2 {
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
  .dialog-type{
    .el-radio.is-bordered+.el-radio.is-bordered{
      margin-left:0;
      margin-bottom: 20px;
    }
  }
  .table{
    .page{
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
}
</style>
