<template>
  <div class="analysis center-content">
    <div class="title">
      {{ city.name || "广东省" }}
      <div
        class="chooseCity"
        :class="chooseDownshow ? 'active' : ''"
        @click="changeChooseDownshow"
      >
        切换区域
        <i v-if="chooseDownshow" class="el-icon-arrow-up"></i>
        <i v-else class="el-icon-arrow-down"></i>
      </div>
      <transition name="el-zoom-in-top">
        <div class="cityList" v-if="chooseDownshow">
          <div class="breadcrumb">
            <span @click="chooseCity()">广东省</span>
            <i v-if="city.name" class="el-icon-arrow-right"></i>
            <span v-if="city.name" @click="chooseCity(city)">{{
              city.name
            }}</span>
          </div>
          <ul class="cityList-Item">
            <li
              class="item"
              v-for="(item, index) in cityList"
              :key="index"
              @click="chooseCity(item)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </transition>
    </div>

    <div class="comment-content">
      <div class="left">
        <div class="content-title">
          通用目录总览<span>（全省事项库内通用目录）</span>
        </div>
        <div class="contents-all-body">
          <div class="all-body">
            <div class="content-body">
              <i class="el-icon-notebook-1"></i>
              <div class="num">
                <p>已入库总数</p>
                <p>5789<span>个</span></p>
              </div>
            </div>
            <div class="bottom-container">
              <div class="container-item">
                <i class="el-icon-notebook-1"></i>
                <div class="num">
                  <p>行政处罚</p>
                  <p>5789<span>个</span></p>
                </div>
              </div>
              <div class="container-item">
                <i class="el-icon-notebook-1"></i>
                <div class="num">
                  <p>行政处罚</p>
                  <p>5789<span>个</span></p>
                </div>
              </div>
              <div class="container-item">
                <i class="el-icon-notebook-1"></i>
                <div class="num">
                  <p>行政处罚</p>
                  <p>5789<span>个</span></p>
                </div>
              </div>
            </div>
          </div>
          <div class="all-body">
            <div class="content-body">
              <i class="el-icon-notebook-1"></i>
              <div class="num">
                <p>已入库总数</p>
                <p>5789<span>个</span></p>
              </div>
            </div>
            <div class="bottom-container">
              <div class="container-item">
                <i class="el-icon-notebook-1"></i>
                <div class="num">
                  <p>行政处罚</p>
                  <p>5789<span>个</span></p>
                </div>
              </div>
              <div class="container-item">
                <i class="el-icon-notebook-1"></i>
                <div class="num">
                  <p>行政处罚</p>
                  <p>5789<span>个</span></p>
                </div>
              </div>
              <div class="container-item">
                <i class="el-icon-notebook-1"></i>
                <div class="num">
                  <p>行政处罚</p>
                  <p>5789<span>个</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="content-title">实施清单总览</div>
        <div class="all-body">
          <div class="content-body">
            <i class="el-icon-notebook-1"></i>
            <div class="num">
              <p>已入库总数</p>
              <p>5789<span>个</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="echarts">
      <div class="echart-item">
        <div class="content-title">
          履行通用目录分布<span>（全省事项库内通用目录）</span>
        </div>
        <div class="content-title-small">
          通用目录使用率:0%
          <el-tooltip
            class="tip-item"
            effect="dark"
            content="通用目录使用率=履行通用目录/已入库通用总数*100%"
            placement="top-start"
          >
            <i class="el-icon-warning-outline"></i>
          </el-tooltip>
        </div>
        <div class="echart-num">
          <span>0</span>个 <br />
          总数
        </div>
        <div ref="myCharts" class="myCharts"></div>
      </div>

      <div class="echart-item">
        <div class="content-title">实施清单类型分布</div>
        <div ref="myCharts1" class="myCharts"></div>
      </div>

      <div class="echart-item">
        <div class="content-title">实施清单行使层级分布</div>
        <div ref="myCharts2" class="myCharts"></div>
      </div>
    </div>

    <div class="areaNum">
      <div class="content-title">实施清单领域分布</div>
      <div ref="areaDistribution" class="areaDistribution"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

import { openLoad } from "../../assets/commonJs/until";
export default {
  data() {
    return {
      chooseDownshow: false, //下拉状态
      city: {
        // 下拉款的选中城市信息
        name: "广东省",
        value: 0,
      },
      cityList: [
        //城市列表
        { name: "广州市", value: 0 },
        { name: "广州市", value: 1 },
        { name: "深圳市", value: 2 },
        { name: "韶关市", value: 3 },
        { name: "珠海市", value: 4 },
        { name: "汕头市", value: 5 },
        { name: "佛山市", value: 6 },
        { name: "江门市", value: 7 },
        { name: "河源市", value: 8 },
        { name: "湛江市", value: 9 },
        { name: "梅州市", value: 10 },
        { name: "茂名市", value: 11 },
        { name: "肇庆市", value: 12 },
        { name: "汕尾市", value: 13 },
        { name: "东莞市", value: 14 },
        { name: "惠州市", value: 15 },
        { name: "中山市", value: 16 },
      ],
    };
  },
  created() {
    openLoad();
  },
  mounted() {
    this.Init();
  },
  methods: {
    chooseCity(item) {
      // 选中的城市
      if (item) {
        this.city.name = item.name;
      } else {
        this.city.name = "";
      }
      this.changeChooseDownshow();
      openLoad();
    },
    changeChooseDownshow() {
      this.chooseDownshow = !this.chooseDownshow;
    },
    Init() {
      // 初始化 echarts
      const myCharts = echarts.init(this.$refs.myCharts);
      const myCharts1 = echarts.init(this.$refs.myCharts1);
      const myCharts2 = echarts.init(this.$refs.myCharts2);
      const areaDistribution = echarts.init(this.$refs.areaDistribution);
      let options = {
        tooltip: {
          //鼠标悬浮框的提示文字
          //   trigger: "axis",
        },
        legend: {
          // data: ["最高气温", "最低气温"],
        },
        legend: {
          // orient: 'vertical',
          top: "bottom",
          left: "center",
          show: true,
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["32%", "50%"],
            avoidLabelOverlap: true,
            label: {
              show: true,
              position: "center",
            },

            emphasis: {
              //重点强调的，效果：放大
              label: {
                // show: true,
                // fontSize: "30",
                // fontWeight: "bold",
              },
            },
            labelLine: {
              show: true,
            },
            // 图外样式
            itemStyle: {
              emphasis: {
                //鼠标放进去，圆饼的效果
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
              // 这里做改变
              normal: {
                //正常样式
                //    标签
                label: {
                  show: true,
                  fontSize: "12",
                  color: "#999",
                },
                labelLine: {
                  //展示导线
                  show: true,
                },
              },
            },
            // color: ["#E74A3B", "#889B98", "#3395D9","#3395D3","#3395D4","#3395D0","#3395D5","#3395D4","#3395D1"],
            data: [
              { value: 11, name: "行政处罚 " },
              { value: 22, name: "行政检查" },
              { value: 33, name: "行政强制" },
              { value: 40, name: "行政许可 " },
              { value: 50, name: "行政给付" },
              { value: 60, name: "行政征收" },
              { value: 70, name: "行政确认 " },
              { value: 35, name: "行政奖励" },
              { value: 27, name: "行政裁决" },
            ],
          },
        ],
      };
      let disData = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          //对柱形位置进行调整
          left: "3%",
          right: "4%",
          // bottom: "3%",
          containLabel: false,
        },
        dataZoom: {
          show: true,
          startValue: 0,
          endValue: 14,
          zoomLock: true,
          fillerColor: 'rgba(38, 136, 232, 0.15)',
          borderColor: '#D5D5D5',
          height: 24,
          handleStyle: {
            color: '#75A4D1'
          },
          dataBackground: {
            areaStyle: {
              color: '#F2F2F2'
            }
          }
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                     axisTick: {
              show: true,
              inside: true
            },
            axisLine: {
              lineStyle: {
                color: '#DFE1E2'
              }
            },
            axisLabel: {
              color: '#727475',
              // align: 'center',
              lineHeight: 15,
              height: 40,
              interval: 0,
              width: 20,
              formatter: val => {
                let txt = val
                if (val.length > 4) {
                  txt = `${val.substr(0, 4)}\n${val.substr(4)}`
                }
                return txt
              }
            }
        },
        yAxis: {
          nameTextStyle: {
              color: '#727475'
            },
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#DFE1E2'
              }
            },
            axisLabel: {
              color: '#727475'
            },
            splitLine: {
              lineStyle: {
                color: '#DFE1E2',
                type: 'dashed'
              }
            }
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            barWidth: 40,
            showBackground: false,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };
      myCharts.setOption(options);
      myCharts1.setOption(options);
      myCharts2.setOption(options);
      areaDistribution.setOption(disData);
    },
  },
};
</script>

<style lang="less" scoped>
.analysis {
  padding: 20px;
  .title {
    font-weight: 600;
    font-size: 26px;
    display: flex;
    align-items: center;
    position: relative;
    .chooseCity {
      font-weight: 500;
      font-size: 14px;
      margin-left: 20px;
      padding: 5px 10px;
      background-color: #eeeeee;
      border-radius: 6px;
      cursor: pointer;
      i {
        font-weight: 600;
      }
    }
    .active {
      background-color: #dff8f8;
      color: blue;
    }
    .cityList {
      position: absolute;
      top: 43px;
      left: 0;
      z-index: 111;
      width: 900px;
      padding: 30px 40px 30px 32px;
      background-color: #fff;
      box-shadow: 0 2px 10px 0 rgb(12 60 109 / 20%);
      .breadcrumb {
        font-size: 15px;
        margin-bottom: 20px;
        font-weight: 600;
        span {
          cursor: pointer;
        }
      }
      .cityList-Item {
        display: flex;
        flex-wrap: wrap;
        font-size: 14px;
        font-weight: normal;
        .item {
          padding: 6px 16px;
          border-radius: 4px;
          cursor: pointer;
          margin-bottom: 6px;
        }
        .item:hover {
          background-color: #dff8f8;
          color: blue;
        }
      }
    }
  }

  .comment-content {
    height: 282px;
    width: 100%;
    display: flex;
    white-space: nowrap;
    margin-top: 20px;
    .left {
      box-shadow: 0 4px 10px 0 rgb(80 119 170 / 15%);
      border-radius: 5px;
      padding: 20px;
      flex: 1;
      // width: 75%;
      display: flex;
      height: 100%;
      flex-direction: column;
      .content-title {
        border-left: 4px solid #2688e8;
        padding-left: 12px;
        font-size: 18px;
        font-weight: 600;
        color: #333;
        span {
          font-size: 14px;
          font-weight: normal;
          color: #5f5f5f;
        }
      }
      .contents-all-body {
        display: flex;
        width: 100%;
        height: 100%;
        margin-top: 30px;
        .all-body {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 50%;
          padding: 0 20px;
          .content-body {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            i {
              color: #2688e8;
              font-size: 50px;
              margin-right: 20px;
            }
            .num {
              p {
                margin-bottom: 6px;
                color: #666;
              }
              p:nth-of-type(2) {
                font-size: 28px;
                color: #333;
                span {
                  color: #666;
                  font-size: 20px;
                }
              }
            }
          }
        }

        .all-body:nth-of-type(1) {
          border-right: 1px dashed #d1d1d1;
        }
        .bottom-container {
          border-top: 1px dashed #d1d1d1;
          padding: 20px 10px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .container-item {
            display: flex;
            .num {
              color: #666;
              margin-left: 6px;
              p {
                font-size: 12px;
                margin-bottom: 2px;
                margin-top: -1px;
              }
            }
          }
        }
      }
    }
    .right {
      width: 274px;
      box-shadow: 0 4px 10px 0 rgb(80 119 170 / 15%);
      border-radius: 5px;
      margin-left: 20px;
      padding: 20px;
      // flex: 1;
      .content-title {
        border-left: 4px solid #2688e8;
        padding-left: 12px;
        font-size: 18px;
        font-weight: 600;
        color: #333;
        span {
          font-size: 14px;
          font-weight: normal;
          color: #5f5f5f;
        }
      }
      .all-body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 0 20px;
        .content-body {
          flex: 1;
          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;
          p {
            text-align: center;
            color: #666;
          }
          p:nth-of-type(1) {
            margin-top: 30px;
          }
          p:nth-of-type(2) {
            font-size: 30px;
            margin-top: 10px;
            color: #000;
            span {
              font-size: 16px;
            }
          }
          i {
            color: #2688e8;
            font-size: 80px;
          }
        }
      }
    }
  }
  .echarts {
    display: flex;
    margin-top: 30px;
    .echart-item {
      flex: 1;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      //   align-items: center;
      box-shadow: 0 4px 10px 0 rgb(80 119 170 / 15%);
      margin-left: 16px;
      padding: 20px 0 20px;
      .content-title {
        border-left: 4px solid #2688e8;
        padding-left: 12px;
        font-size: 18px;
        font-weight: 600;
        color: #333;
        margin-left: 20px;
        span {
          font-size: 14px;
          font-weight: normal;
          color: #5f5f5f;
        }
      }
      .content-title-small {
        color: #666;
        padding-left: 36px;
        font-size: 14px;
        margin-top: 4px;
      }
      .echart-num {
        position: absolute;
        top: 50%;
        left: 46%;
        color: #666;
        span {
          color: #000;
          font-weight: 600;
          font-size: 26px;
        }
      }
      .myCharts {
        width: 332px;
        height: 400px;
        margin: 0 auto;
      }
    }
    .echart-item:nth-of-type(1) {
      margin-left: 0;
    }
  }
  .areaNum {
    width: 100%;
    margin-top: 30px;
    border-radius: 4px;
    padding: 20px 0;
    box-shadow: 0 4px 10px 0 rgb(80 119 170 / 15%);
    .content-title {
      border-left: 4px solid #2688e8;
      padding-left: 12px;
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-left: 20px;
      span {
        font-size: 14px;
        font-weight: normal;
        color: #5f5f5f;
      }
    }

    .areaDistribution {
      // width: 700px;
      height: 330px;
    }
  }
}
</style>