<template>
  <div class="container">
    <div class="header">
      <slot name="header" />
    </div>
    <div class="content">
      <div class="pie-chart-item">
        <div class="pie-chart-ref" ref="pie-chart-1"></div>
      </div>
      <div class="pie-chart-item">
        <div class="pie-chart-ref" ref="pie-chart-2"></div>
      </div>
      <div class="pie-chart-item">
        <div class="pie-chart-ref" ref="pie-chart-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "@/utils/common";

export default {
  name: "DeviceStatusChart",
  data() {
    return {
      pieChart1: null,
      pieChart2: null,
      pieChart3: null,
      normal: [{ name: "正常设备", value: 40, total: 100 }],
      idle: [{ name: "闲置设备", value: 30, total: 100 }],
      broken: [{ name: "损坏设备", value: 30, total: 100 }],
    };
  },
  mounted() {
    this.initPieCharts();
    window.addEventListener("resize", this.initPieCharts);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.initPieCharts);
  },
  methods: {
    nowSize(val, initWidth = 1920) {
      let nowClientWidth = document.documentElement.clientWidth;
      nowClientWidth = nowClientWidth >= 1200 ? nowClientWidth : 1200;
      return val * (nowClientWidth / initWidth);
    },
    initPieCharts: debounce(function () {
      const normal = this.dealData(this.normal);
      const idle = this.dealData(this.idle);
      const broken = this.dealData(this.broken);
      this.initPieChart(this.$refs["pie-chart-1"], "正常", normal);
      this.initPieChart(this.$refs["pie-chart-2"], "闲置", idle);
      this.initPieChart(this.$refs["pie-chart-3"], "损坏", broken);
    }, 300),
    // 处理数据
    dealData(data) {
      const temp = JSON.parse(JSON.stringify(data));
      const firstOne = temp[0];
      temp.push({ name: "其他设备", value: firstOne.total - firstOne.value });
      return temp;
    },
    initPieChart(ref, title, data) {
      const instance = this.$echarts.getInstanceByDom(ref);
      if (instance) {
        instance.dispose();
      }
      const chart = this.$echarts.init(ref);
      // 饼图配置
      const option = {
        backgroundColor: "transparent",
        title: {
          text: data[0].value + "台",
          subtext: title,
          x: "center",
          top: this.nowSize(55),
          textStyle: {
            color: "#fff",
            fontSize: this.nowSize(18),
            fontWeight: "bold",
          },
          subtextStyle: {
            color: "#fff",
            fontSize: this.nowSize(12),
            fontWeight: "bold",
          },
        },
        label: {
          show: false,
        },
        tooltip: {
          show: true,
          trigger: "item",
          textStyle: {
            fontSize: this.nowSize(12),
          },
          formatter: (param) => {
            let result = ``;
            // marker
            result += `<span style="display:inline-block;margin-right:${this.nowSize(
              5
            )}px;border-radius:3px;width:${this.nowSize(
              10
            )}px;height:${this.nowSize(10)}px;background-color:${
              param.color
            };"></span>`;
            // name
            result += param.name + ":&nbsp;";
            // value
            result += param.value + "台";
            return result;
          },
        },
        color: ["#1DC09C", "#D5D760"],
        series: [
          {
            type: "pie",
            radius: ["60%", "80%"], // 控制饼图的大小
            avoidLabelOverlap: false,
            label: {
              show: false,
            },
            // label: {
            //   show: true,
            //   position: "center", // 数据居中
            //   formatter: "{c}台\n({d}%)",
            //   fontSize: 14,
            //   color: "#FFFFFF",
            //   fontWeight: "bold",
            // },
            //     label: {
            //       show: true,
            //       fontSize: this.nowSize(12),
            //       color: "#fff",
            //       position: "inside",
            //       formatter: "{d}%", // 显示名称和百分比
            //     },
            labelLine: {
              show: false, // 隐藏标签线
            },
            data: data,
          },
        ],
      };
      chart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .header {
    width: calc(100% - 6px);
    height: 47px;
    padding-left: 47px;
    background: url("~@/assets/images/block-header-1.png") no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    font-family: PangMenZhengDao;
    font-weight: 400;
    font-size: 28px;
    line-height: 47px;
    color: #ffffff;
  }
  .content {
    width: 100%;
    height: calc(100% - 47px);
    // padding: 22px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .pie-chart-item {
      width: 100%;
      height: 100%;
      position: relative;
      .pie-chart-title {
        width: 100%;
        height: 37px;
        background: url("~@/assets/images/block-content-header.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
        .title-text {
          width: calc(100% - 30px);
          position: absolute;
          left: 30px;
          top: 5px;
          font-family: Alibaba PuHuiTi;
          font-size: 18px;
          font-weight: bold;
          color: #d1d6df;
          font-style: italic;
          background: linear-gradient(0deg, #acddff 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .pie-chart-ref {
        width: 80%;
        height: 80%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
