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
                { date: "10-10", volume: 500, tonnage: 120 },
                { date: "10-11", volume: 600, tonnage: 122 },
                { date: "10-12", volume: 450, tonnage: 118 },
                { date: "10-13", volume: 550, tonnage: 121 },
                { date: "10-14", volume: 480, tonnage: 119 },
                { date: "10-15", volume: 520, tonnage: 120 },
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
                    left: "1%",
                    right: "2%",
                    bottom: "2%",
                    top: this.nowSize(30),
                    containLabel: true,
                },
                legend: {
                    right: this.nowSize(10),
                    top: this.nowSize(0),
                    itemGap: this.nowSize(16),
                    itemWidth: this.nowSize(14),
                    itemHeight: this.nowSize(8),
                    data: ["数量" , "吨位"],
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
                                return value + "吨"; // 显示为百分比
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
                        name: "数量",
                        type: "bar",
                        data: this.oneWeekInData.map((item) => item.volume),
                        barWidth: this.nowSize(21),
                        itemStyle: {
                            color: new this.$echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [{ offset: 0, color: "#4DBBDB" }, { offset: 1, color: "rgba(119,206,231,0)" }]
                            ),
                        },
                        label: {
                            show: true,
                            position: "top",
                            formatter: "{c}", // 直接显示数量
                            textStyle: {
                                color: "#fff",
                                fontSize: this.nowSize(10),
                            },
                        },
                    },
                    {
                        name: "吨位",
                        type: "bar",
                        data: this.oneWeekInData.map((item) => item.tonnage),
                        barWidth: this.nowSize(21),
                        itemStyle: {
                            color: new this.$echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [{ offset: 0, color: "#A9DE7B" }, { offset: 1, color: "rgba(169,222,123,0)" }]
                            ),
                        },
                        label: {
                            show: true,
                            position: "top",
                            formatter: "{c}", // 直接显示吨位并标明单位
                            textStyle: {
                                color: "#fff",
                                fontSize: this.nowSize(10),
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