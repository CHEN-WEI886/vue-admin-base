<template>
  <div class="Law-library center-content">
    <div class="Law-library-title">法律法规查询</div>
    <div class="Law-library-body">
      <div class="library-input">
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
        >
          <el-select
            class="el-select-prepend"
            v-model="select"
            slot="prepend"
            placeholder="请选择"
          >
            <el-option label="全文" value="1"></el-option>
            <el-option label="标签" value="2"></el-option>
          </el-select>
        </el-autocomplete>
        <div class="library-search" @click="search">搜索</div>
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
      select: "全文", //下拉框的数据
      restaurants: [], // 建议匹配的数据
      state: "", // 输入框的数据
      timeout: null, // 做防抖节流来使用
    };
  },
  components: {
    "operator-nav": operatornav,
  },
  created() {
    openLoad();
  },
  methods: {
    search() {
      this.$router.push({ name: "Law-library-result" });
    },
    /**
     * 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它
     * @param queryString 输入的值
     * @param cb 回调函数
     */
    querySearchAsync(queryString, cb) {
      console.log(queryString, cb);
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },

    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },

    handleSelect(item) {
      console.log(item);
    },
  },
};
</script>

<style lang="less">
.Law-library {
  padding-top: 62px;
  .Law-library-title {
    color: #5077aa;
    font-weight: 900;
    text-align: center;
    font-size: 36px;
    margin-bottom: 30px;
    cursor: pointer;
  }
  .Law-library-body {
    width: 700px;
    margin: 0 auto;
    .library-input {
      display: flex;
      align-items: center;
      .el-input__inner {
        width: 500px;
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
      .el-select-prepend {
        width: 80px !important;
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