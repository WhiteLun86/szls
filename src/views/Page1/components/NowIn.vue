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
    props: {
        data: {
            type: Object,
            default: () => {
                return {
                    nowInData: [
                        { date: "10-01", waterUsage: 120, electricityUsage: 200 },
                        { date: "10-02", waterUsage: 11, electricityUsage: 50 },
                        { date: "10-03", waterUsage: 130, electricityUsage: 280 },
                        { date: "10-04", waterUsage: 225, electricityUsage: 160 },
                        { date: "10-05", waterUsage: 135, electricityUsage: 270 },
                        { date: "10-06", waterUsage: 10, electricityUsage: 240 },
                        { date: "10-07", waterUsage: 150, electricityUsage: 10 },
                    ],
                };
            },
        },
    },
    watch: {
        data: {
            handler(obj) {
                this.nowInData = obj.nowInData;
                this.initCharts();
            },
            immediate: true,
        },
    },
    data() {
        return {
            nowInData: [],
        };
    },
    mounted() {
        window.addEventListener("resize", this.initCharts);
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
                    show: true,
                    trigger: "axis",
                    textStyle: {
                        fontSize: this.nowSize(12),
                    },
                    axisPointer: {
                        type: "line",
                        label: {
                            backgroundColor: "#6a7985",
                        },
                    },
                    formatter: (params) => {
                        let result = ``;
                        result += params[0].name + "：</br>";
                        params.forEach((param) => {
                            result += `<span style="display:inline-block;margin-right:${this.nowSize(
                                5
                            )}px;border-radius:${this.nowSize(3)}px;width:${this.nowSize(
                                10
                            )}px;height:${this.nowSize(
                                10
                            )}px;background-color:${param.color};"></span>`;
                            result += param.seriesName + "：";
                            result += param.value + "</br>";
                        });
                        return result;
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
                    data: [
                        { name: "耗水量" },
                        { name: "耗电量" },
                    ],
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
                        data: this.nowInData.map((item) => item.date),
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
                        axisTick: { show: false },
                        axisLine: {
                            type: "dashed",
                            lineStyle: { color: "#253F65" },
                        },
                        splitLine: { show: false },
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        splitNumber: 5,
                        axisLabel: {
                            textStyle: {
                                color: "#fff",
                                fontStyle: "normal",
                                fontFamily: "Alibaba PuHuiTi",
                                fontSize: this.nowSize(12),
                            },
                            formatter: (value) => value.toFixed(1),
                        },
                        axisLine: { show: false },
                        axisTick: { show: false },
                        splitLine: {
                            show: true,
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
                        name: "耗水量",
                        type: "line",
                        data: this.nowInData.map((item) => item.waterUsage),
                        lineWidth: this.nowSize(21),
                        lineStyle: { width: this.nowSize(2) },
                        label: {
                            normal: {
                                show: true,
                                position: "top",
                                textStyle: {
                                    color: "#fff",
                                    fontStyle: "normal",
                                    fontFamily: "Alibaba PuHuiTi",
                                    fontSize: this.nowSize(12),
                                },
                            },
                        },
                        itemStyle: {
                            normal: {
                                borderRadius: this.nowSize(2),
                                color: "#60D540",
                            },
                        },
                        areaStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        { offset: 0, color: "#60D540" },
                                        { offset: 1, color: "transparent" },
                                    ],
                                    false
                                ),
                            },
                        },
                    },
                    {
                        name: "耗电量",
                        type: "line",
                        data: this.nowInData.map((item) => item.electricityUsage),
                        lineStyle: { width: this.nowSize(2) },
                        label: {
                            normal: {
                                show: true,
                                position: "top",
                                textStyle: {
                                    color: "#fff",
                                    fontStyle: "normal",
                                    fontFamily: "Alibaba PuHuiTi",
                                    fontSize: this.nowSize(12),
                                },
                            },
                        },
                        itemStyle: {
                            normal: { color: "#71F2FC" },
                        },
                        areaStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        { offset: 0, color: "#71F2FC" },
                                        { offset: 1, color: "transparent" },
                                    ],
                                    false
                                ),
                            },
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
