/**
  *使用说明
  *page父组件传进来给子组件渲染
  *handleSizeChange()调用父组件的方法
  *handleCurrentChange()调用父组件的方法
*/

<template>
  <el-pagination
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="page.pageSizes"
    layout="total, sizes, prev, pager, next, jumper"
    :page-size="100"
    :total="page.total"
  >
  </el-pagination>
</template>

<script>
export default {
  props: {
    page: {
      // 传进来的page基本信息
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      currentPage: 1, //当前页码
    };
  },
  created() {
    //   console.log(this.total)
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
  },
};
</script>

<style>
</style>