<template>
  <div class="table center-content">
    <div class="search-all">
      <div class="search-input">
        <div class="search-item">
          <span class="lab-name">房间号</span>
          <el-input class="event-name" placeholder="请输入房间号"></el-input>
        </div>

        <el-button type="primary">查询</el-button>
        <div class="clear">清空条件</div>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      :header-cell-style="{ background: '#FAFAFA' }"
    >
      <el-table-column prop="id" label="序号" width="80"> </el-table-column>
      <el-table-column prop="orderNumber" label="订单号" min-width="20%">
      </el-table-column>
      <el-table-column prop="name" label="房间号" width="200">
      </el-table-column>
      <el-table-column label="状态" width="160">
        <template slot-scope="scope">
          <el-tag
            effect="dark"
            :type="+scope.row.status === 1 ? 'danger' : 'success'"
          >
            {{ +scope.row.status === 1 ? "进行中" : "已完成" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleClick(scope.row)">
            查看用户资料</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="page">
      <next-page
        :page="page"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      >
      </next-page>
    </div>
    <v-dialog 
      ref="dialog"
      width='50%'
      title='住户信息'
      cancelText='关闭'
      :isConfim='false'
      @confim='save'
      >
    </v-dialog>
  </div>
</template>

<script>
import { openLoad, closeLoad, changStyle } from "../../assets/commonJs/until";
import dialog from "@/components/dialog.vue";

export default {
  components:{
    'v-dialog':dialog
  },
  data() {
    return {
      page: {
        // 分页传给组件的基本信息
        total: 40,
        pageSizes: [10, 20, 30, 50],
      },
      password: "",
      openDialog: false,
      tableData: [
        //表格的数据
        {
          id: 1,
          name: "203",
          department: "一房一厅",
          orderNumber:'ebcionjmsojppsw12sf8',
          num: "2楼",
          password: "123456",
          hierarchy: [{ label: "是", value: 0 }],
          status: "1",
        },
        {
          id: 2,
          name: "203",
          department: "单间",
          orderNumber:'ebcionjmsojppsw12sf8',
          num: "2楼",
          password: "123456",
          hierarchy: [{ label: "是", value: 0 }],
          status: "0",
        },
      ],
    };
  },
  created() {
    openLoad();
    setTimeout(() => {
      closeLoad();
    }, 500);
  },
  methods: {
    save() {
      this.openDialog = false;
    },
    handleClose() {},
    /**
     * @param row 点击这一列的数据
     */
    handleClick(row) {
      this.$refs.dialog.openDialog()
    },
    /**
     * 接受子组件传过来的页数
     */
    handleSizeChange(val) {
      console.log("下一页调用接口", val);
    },
    handleCurrentChange(val) {
      console.log("跳转某一页调用接口", val);
    },
  },
};
</script>

<style lang="less">
.table {
  padding: 20px;
  .search-all {
    white-space: nowrap;
    .search-input {
      display: flex;
      align-items: center;
      color: #666;
      font-size: 14px;
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
  .page {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>