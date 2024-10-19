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
            normal: { count: 40, total: 100 },
            idle: { count: 30, total: 100 },
            broken: { count: 30, total: 100 },
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
        initPieCharts: debounce(function () {
            this.initPieChart(this.$refs["pie-chart-1"], "正常设备", this.normal);
            this.initPieChart(this.$refs["pie-chart-2"], "闲置设备", this.idle);
            this.initPieChart(this.$refs["pie-chart-3"], "损坏设备", this.broken);
        }, 300),

        initPieChart(ref, title, data) {
            const chart = this.$echarts.init(ref);
            const option = {
                backgroundColor: "transparent",
                tooltip: {
                    trigger: "item",
                    formatter: `{a} <br/>{b}: {c}台 ({d}%)`,
                },
                series: [
                    {
                        name: title,
                        type: "pie",
                        radius: ["60%", "80%"], // 控制饼图的大小
                        avoidLabelOverlap: false,
                        label: {
                            show: true,
                            position: "center", // 数据居中
                            formatter: "{c}台\n({d}%)",
                            fontSize: 14,
                            color: "#FFFFFF",
                            fontWeight: "bold",
                        },
                        labelLine: {
                            show: false, // 隐藏标签线
                        },
                        data: [
                            {
                                value: data.count,
                                name: title,
                                itemStyle: { color: "#1DC09C" }, // 正常设备颜色
                            },
                            {
                                value: data.total - data.count,
                                name: "其他设备",
                                itemStyle: { color: "#D5D760" }, // 其他设备颜色
                            },
                        ],
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
            height: 120px;
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
                width: 100%;
                height: 120px;
            }
        }
    }
}
</style>
