<template>
    <div class="container">
        <div class="header">
            <slot name="header" />
        </div>
        <div class="content">
            <div class="line-chart-item" ref="line-chart"></div>
        </div>
    </div>
</template>

<script>
import { debounce } from "@/utils/common";

export default {
    data() {
        return {
            // 默认展示数据
            chartData: [
                { date: "10-01", value: 12 },
                { date: "10-02", value: 140 },
                { date: "10-03", value: 130 },
                { date: "10-04", value: 150 },
                { date: "10-05", value: 20 },
            ],
        };
    },
    mounted() {
        // 窗口监听
        window.addEventListener("resize", this.initCharts);
        this.initCharts(); // 初始渲染图表
    },
    destroyed() {
        window.removeEventListener("resize", this.initCharts);
    },
    methods: {
        nowSize(val, initWidth = 1920) {
            let nowClientWidth = document.documentElement.clientWidth;
            nowClientWidth = nowClientWidth >= 1200 ? nowClientWidth : 1200;
            return val * (nowClientWidth / initWidth);
        },
        // 渲染echarts
        initCharts: debounce(function () {
            if (this.lineChart) {
                this.lineChart.dispose();
                this.lineChart = null;
            }
            this.lineChart = this.$echarts.init(this.$refs["line-chart"]);

            const option = {
                backgroundColor: "transparent",
                tooltip: {
                    trigger: "axis",
                    textStyle: {
                        fontSize: 12,
                    },
                    axisPointer: {
                        type: "line",
                    },
                },
                grid: {
                    left: "4%",
                    right: "4%",
                    bottom: "6%",
                    top: this.nowSize(30),
                    containLabel: true,
                },
                xAxis: {
                    type: "category",
                    data: this.chartData.map((item) => item.date),
                    axisLabel: {
                        textStyle: {
                            color: "#fff",
                            fontSize: this.nowSize(14),
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#253F65",
                        },
                    },
                },
                yAxis: {
                    type: "value",
                    axisLabel: {
                        textStyle: {
                            color: "#fff",
                            fontSize: this.nowSize(12),
                        },
                    },
                    axisLine: {
                        show: false,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: "dashed",
                            color: "#fff",
                            opacity: 0.23,
                        },
                    },
                },
                series: [
                    {
                        name: "数据",
                        type: "line",
                        data: this.chartData.map((item) => item.value),
                        smooth: true, // 平滑曲线
                        lineStyle: {
                            color: "rgba(38,225,184,0.86)",
                        },
                        areaStyle: {
                            color: new this.$echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    { offset: 0, color: "rgba(38,225,184,0.86)" },
                                    { offset: 1, color: "rgba(38,225,184,0)" },
                                ]
                            ),
                        },
                        symbol: "circle", // 数据点样式
                        symbolSize: this.nowSize(8),
                        itemStyle: {
                            color: "rgba(38,225,184,0.86)",
                            borderColor: "#fff",
                            borderWidth: 2,
                        },
                    },
                ],
            };

            this.lineChart.setOption(option);
        }, 300),
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
        // padding: 22px 33px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .line-chart-item {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
