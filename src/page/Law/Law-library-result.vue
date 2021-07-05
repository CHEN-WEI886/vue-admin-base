<template>
  <div class="Law-library-result center-content">
    <div class="Law-library-body">
      <div class="library-input">
        <el-input
          placeholder="请输入内容"
          v-model="input"
          class="input-with-select"
        >
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="全文" value="1"></el-option>
            <el-option label="标签" value="2"></el-option>
          </el-select>
        </el-input>
        <div class="library-search">搜索</div>
      </div>
      <ul class="library-hot">
        <span class="hot-title">热搜:</span>
        <li class="hot-item">中华人民共和国广告法</li>
        <li class="hot-item">今年测试0128</li>
        <li class="hot-item">测试条款号展示规则的法律6</li>
      </ul>
    </div>

    <!-- 右边侧边栏 -->
    <operator-nav></operator-nav>
  </div>
</template>

<script>
import { openLoad } from "../../assets/commonJs/until";
import operatornav from "../../components/operator-nav";

export default {
  data() {
    return {
      input: "", // 输入框的数据
      select: "全文", //下拉框的数据
    };
  },
  components: {
    "operator-nav": operatornav,
  },
  created() {
    openLoad();
  },
};
</script>

<style lang="less">
.Law-library-result {
  padding: 20px;
  .Law-library-title {
    color: #5077aa;
    font-weight: 900;
    text-align: center;
    font-size: 36px;
    margin-bottom: 30px;
    cursor: pointer;
  }
  .Law-library-body {
    width: 600px;
    // margin: 0 auto;
    .library-input {
      display: flex;
      align-items: center;
      .el-input__inner {
        border-radius: 0;
        border-left: none;
        border-top: 1px solid #5077aa;
        border-bottom: 1px solid #5077aa;
        position: relative;
      }
      .el-input-group__prepend {
        width: 80px;
        border-radius: 0;
        border: 1px solid #5077aa;
        border-right: none;
        background-color: #fff;
      }
      .el-input-group__prepend::after {
        content: "";
        width: 1px;
        height: 20px;
        position: absolute;
        top: 10px;
        right: 0;
        background: #d1d1d1;
      }
      .library-search {
        height: 100%;
        width: 91px;
        background: #5077aa;
        color: #fff;
        font-size: 18px;
        font-weight: 500;
        text-align: center;
        line-height: 41px;
        cursor: pointer;
      }
    }
    .library-hot {
      width: 600px;
      padding: 10px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      .hot-title {
        width: 60px;
        font-size: 12px;
        color: #637381;
      }
      .hot-item {
        font-size: 12px;
        margin-right: 10px;
        cursor: pointer;
        color: #212b36;
      }
      .hot-item:hover {
        color: #5077aa;
      }
    }
  }
}
</style>