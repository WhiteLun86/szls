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
            oneWeekStorageData: [
                { date: "10-10", amount: 30, tons: 100 },
                { date: "10-11", amount: 50, tons: 80 },
                { date: "10-12", amount: 20, tons: 120 },
                { date: "10-13", amount: 40, tons: 90 },
                { date: "10-14", amount: 60, tons: 110 },
                // { date: "10-15", amount: 70, tons: 85 },
            ],
        };
    },
    mounted() {
        window.addEventListener("resize", this.initCharts);
        this.initCharts();
    },
    destroyed() {
        window.removeEventListener("resize", this.initCharts);
    },
    methods: {
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
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#6a7985",
                        },
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
                    data: ["平衡1", "平衡2"],
                    textStyle: {
                        color: "#EFF7FF",
                        fontSize: this.nowSize(14),
                    },
                },
                xAxis: {
                    type: "category",
                    boundaryGap: true,
                    data: this.oneWeekStorageData.map((item) => item.date),
                    axisLabel: {
                        interval: 0,
                        margin: this.nowSize(15),
                        textStyle: {
                            color: "#fff",
                            fontSize: this.nowSize(16),
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#253F65",
                            opacity: 0.23,
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
                        formatter(value) {
                            return value.toFixed(1);
                        },
                    },
                    axisLine: { show: false },
                    splitLine: {
                        lineStyle: {
                            type: "dashed",
                            color: "#fff",
                            opacity: 0.23,
                        },
                    },
                },
                series: [
                    {
                        name: "平衡1",
                        type: "line",
                        data: this.oneWeekStorageData.map((item) => item.amount),
                        smooth: true,
                        lineStyle: {
                            color: "rgba(96,213,64,0.86)",
                            width: 2,
                        },
                        itemStyle: {
                            color: "rgba(96,213,64,0.86) ",
                        },
                        areaStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: "rgba(96,213,64,0.86)" },
                                { offset: 1, color: "rgba(131,228,169,0) " },
                            ]),
                        },
                    },
                    {
                        name: "平衡2",
                        type: "line",
                        data: this.oneWeekStorageData.map((item) => item.tons),
                        smooth: true,
                        lineStyle: {
                            color: "#36EAFF",
                            width: 2,
                        },
                        itemStyle: {
                            color: "#36EAFF",
                        },
                        areaStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: "rgba(54, 234, 255, 0.6)" },
                                { offset: 1, color: "rgba(54, 234, 255, 0)" },
                            ]),
                        },
                    },
                ],
            };
            this.lineChart.setOption(option);
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
        // padding: 22px;
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
