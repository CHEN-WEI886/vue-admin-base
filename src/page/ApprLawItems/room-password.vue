<template>
  <div class="table center-content">
    <el-table
      :data="tableData"
      border
      :header-cell-style="{ background: '#FAFAFA' }"
    >
      <el-table-column prop="id" label="序号" width="80"> </el-table-column>
      <el-table-column prop="name" label="房间号" width="200">
      </el-table-column>
      <el-table-column prop="hierarchy[0].label" label="是否已清洁" width="130">
      </el-table-column>
      <el-table-column label="状态" width="160">
        <template slot-scope="scope">
          <el-tag
            effect="dark"
            :type="+scope.row.status === 1 ? 'danger' : 'success'"
          >
            {{ +scope.row.status === 1 ? "出租中" : "空闲中" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="password" label="密码" min-width="20%">
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleClick(1, scope.row)">
            修改密码</el-button
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
    <el-dialog
      title="修改密码"
      :visible.sync="openDialog"
      width="30%"
      :before-close="handleClose"
    >
      <el-input v-model="password" placeholder="请输入新密码" clearable></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openDialog = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { openLoad, closeLoad, changStyle } from "../../assets/commonJs/until";

export default {
  data() {
    return {
      page: {
        // 分页传给组件的基本信息
        total: 40,
        pageSizes: [10, 20, 30, 50],
      },
      password:'',
      openDialog: false,
      tableData: [
        //表格的数据
        {
          id: 1,
          name: "203",
          department: "一房一厅",
          num: "2楼",
          password: "123456",
          hierarchy: [{ label: "是", value: 0 }],
          status: "1",
        },
        {
          id: 2,
          name: "203",
          department: "单间",
          num: "2楼",
          password: "123456",
          hierarchy: [{ label: "是", value: 0 }],
          status: "0",
        },
      ],
    };
  },
  created(){
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
     * @param type 判断是编辑模式还是查看模式
     * @param row 点击这一列的数据
     */
    handleClick(type, row) {
      if (+row.status === 1) {
        this.$message({
          message: "出租中不能修改密码!",
          type: "warning",
        });
        return;
      }
      this.openDialog = true;
      this.password = row.password
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
  .page {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>