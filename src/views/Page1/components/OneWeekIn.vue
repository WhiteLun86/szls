<template>
    <div class="container">
        <div class="header">
            <slot name="header" />
        </div>
        <div class="content">
            <div class="bar-chart-item" ref="bar-chart"></div>
        </div>
    </div>
</template>

<script>
import { debounce } from "@/utils/common";
export default {
    data() {
        return {
            oneWeekInData: [
                { date: "10-10", passRate: 92.5 },
                { date: "10-11", passRate: 88.7 },
                { date: "10-12", passRate: 95.3 },
                { date: "10-13", passRate: 89.6 },
                { date: "10-14", passRate: 93.2 },
                { date: "10-15", passRate: 91.8 },
            ],
        };
    },
    mounted() {
        // 窗口监听
        window.addEventListener("resize", this.initCharts);
        this.initCharts(); // 初始化图表
    },
    destroyed() {
        window.removeEventListener("resize", this.initCharts);
    },
    methods: {
        // 渲染echarts
        initCharts: debounce(function () {
            if (this.barChart) {
                this.barChart.dispose();
                this.barChart = null;
            }
            this.barChart = this.$echarts.init(this.$refs["bar-chart"]);
            const option = {
                backgroundColor: "transparent",
                tooltip: {
                    show: true,
                    trigger: "axis",
                    formatter: "{b}<br />{a}: {c}%",
                    axisPointer: {
                        type: "shadow",
                    },
                    textStyle: {
                        color: "#41A6FC",
                        fontStyle: "normal",
                        fontFamily: "Alibaba PuHuiTi",
                        fontSize: this.nowSize(12),
                    },
                },
                grid: {
                    left: "4%",
                    right: "4%",
                    bottom: "6%",
                    top: this.nowSize(30),
                    containLabel: true,
                },
                legend: {
                    right: this.nowSize(10),
                    top: this.nowSize(0),
                    itemGap: this.nowSize(16),
                    itemWidth: this.nowSize(14),
                    itemHeight: this.nowSize(8),
                    data: [{ name: "合格率" }],
                    textStyle: {
                        color: "#EFF7FF",
                        fontStyle: "normal",
                        fontFamily: "Alibaba PuHuiTi",
                        fontSize: this.nowSize(14),
                    },
                },
                xAxis: [
                    {
                        type: "category",
                        boundaryGap: true,
                        data: this.oneWeekInData.map((item) => item.date),
                        axisLabel: {
                            interval: 0,
                            margin: this.nowSize(15),
                            textStyle: {
                                color: "#fff",
                                fontStyle: "normal",
                                fontFamily: "Alibaba PuHuiTi",
                                fontSize: this.nowSize(16),
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            type: "dashed",
                            lineStyle: {
                                color: "#253F65",
                            },
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        axisLabel: {
                            textStyle: {
                                color: "#fff",
                                fontStyle: "normal",
                                fontFamily: "Alibaba PuHuiTi",
                                fontSize: this.nowSize(12),
                            },
                            formatter: function (value) {
                                return value + "%"; // 显示为百分比
                            },
                        },
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                type: "dashed",
                                color: "#fff",
                                opacity: 0.23,
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: "合格率",
                        type: "bar",
                        data: this.oneWeekInData.map((item) => item.passRate),
                        barWidth: this.nowSize(21),
                        label: {
                            normal: {
                                show: true,
                                position: "top",
                                formatter: "{c}%", // 显示百分比
                                textStyle: {
                                    color: "#fff",
                                    fontStyle: "normal",
                                    fontFamily: "Alibaba PuHuiTi",
                                    fontSize: this.nowSize(10),
                                },
                            },
                        },
                        itemStyle: {
                            normal: {
                                borderRadius: this.nowSize(2),
                                color: new this.$echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        { offset: 0, color: "#15DBCB" },
                                        { offset: 1, color: "#0F3352 " },
                                    ],
                                    false
                                ),
                            },
                        },
                    },
                ],
            };
            this.barChart.setOption(option);
        }, 300),
        nowSize(val, initWidth = 1920) {
            let nowClientWidth = document.documentElement.clientWidth;
            nowClientWidth = nowClientWidth >= 1200 ? nowClientWidth : 1200;
            return val * (nowClientWidth / initWidth);
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
        // padding: 22px 33px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .bar-chart-item {
            width: 100%;
            height: 100%;
        }
    }
}
</style>