<template>
    <div class="main-container">
        <!-- 当日入库统计(0-24点) -->
        <div class="now-in-container block-item">
            <now-in v-if="showComponent">
                <template #header> 能源消耗监控 </template>
            </now-in>
        </div>
        <!-- 设备运行状况 -->
        <div class="i-o-manage-container block-item">
            <i-o-manage v-if="showComponent">
                <template #header> 设备运行状况 </template>
            </i-o-manage>
        </div>
        <!-- 当日出库统计(0-24点) -->
        <div class="now-out-container block-item">
            <now-out v-if="showComponent" :data="allData">
                <template #header> 车间产能统计 </template>
            </now-out>
        </div>

        <!-- 近一周库存统计(数量和吨位) -->
        <div class="central-element">
            
            
        </div>

        <!-- 利用率管理 -->
        <div class="use-radio-manage-container block-item">
            <use-radio-manage v-if="showComponent" :storageSpace="storageSpace" :storageSeat="storageSeat">
                <template #header> 产线总览 </template>
            </use-radio-manage>
        </div>

        <div class="one-week-storage-container block-item">
            <one-week-storage v-if="showComponent" :data="allData">
                <template #header> 产线平衡 </template>
            </one-week-storage>
        </div>
        <!-- 员工任务状态 -->
        <div class="staff-task-container block-item">
            <staff-task v-if="showComponent" :data="allData">
                <template #header> 订单进度管理 </template>
            </staff-task>
        </div>
        <!-- 近一周入库统计(数量和吨位) -->
        <div class="one-week-in-container block-item">
            <one-week-in v-if="showComponent" :data="allData">
                <template #header> 一次检合格率 </template>
            </one-week-in>
        </div>
        <!-- 近一周出库统计(数量和吨位) -->
        <div class="one-week-out-container block-item">
            <one-week-out v-if="showComponent" :data="allData">
                <template #header> 设备OEE监控 </template>
            </one-week-out>
        </div>
    </div>
</template>
<script>
import IOManage from "./components/IOManage";
import NowIn from "./components/NowIn";
import NowOut from "./components/NowOut";
import UseRadioManage from "./components/UseRadioManage";
import OneWeekStorage from "./components/OneWeekStorage";
import StaffTask from "./components/StaffTask";
import OneWeekIn from "./components/OneWeekIn";
import OneWeekOut from "./components/OneWeekOut";
import { getScreenData } from "@/api/common";
import { getStore, removeStore } from "@/utils/store";
export default {
    name: "Dashboard",
    components: {
        IOManage,
        NowIn,
        NowOut,
        UseRadioManage,
        OneWeekStorage,
        StaffTask,
        OneWeekIn,
        OneWeekOut,
    },
    data() {
        return {
            // 标题
            title: "数字孪生驾驶舱",
            // 时间
            time: "",
            // 日期
            date: "",
            // 星期
            zhDay: "",
            // 当天进出库单状态
            inData: [],
            outData: [],
            // 当天入库量统计
            nowInData: [],
            // 当天出库量统计
            nowOutData: [],
            // 仓库空间利用率
            storageSpace: {},
            // 库位利用率
            storageSeat: {},
            // 近一周库存统计(数量和吨位)
            oneWeekStorageData: [],
            // 员工任务信息
            staffTaskData: [],
            // 近一周入库统计(数量和吨位)
            oneWeekInData: [],
            // 近一周出库统计(数量和吨位)
            oneWeekOutData: [],
            // 是否显示组件
            showComponent: false,
            // 所有数据
            allData: {
                inData: [],
                outData: [],
                nowInData: [],
                nowOutData: [],
                storageSpace: {},
                storageSeat: {},
                oneWeekStorageData: [],
                staffTaskData: [],
                oneWeekInData: [],
                oneWeekOutData: [],
            },
        };
    },
    mounted() {
        // 获取title
        const userInfo = getStore({ name: "userInfo" });
        if (this.isValid(userInfo)) {
            this.title = userInfo.companyShortName + "WMS大屏";
        }
        this.getScreenData();
        // 5min请求一次
        setInterval(() => {
            this.getScreenData();
        }, 300000);
        // 20s请求一次
        // setInterval(() => {
        //     this.getScreenData();
        // }, 20000);
        // 1s刷新时间
        setInterval(() => {
            this.time = this.$dayjs().format("HH:mm:ss");
            this.date = this.$dayjs().format("YYYY-MM-DD");
            this.zhDay = this.$dayjs().format("dddd");
            switch (this.zhDay) {
                case "Monday":
                    this.zhDay = "星期一";
                    break;
                case "Tuesday":
                    this.zhDay = "星期二";
                    break;
                case "Wednesday":
                    this.zhDay = "星期三";
                    break;
                case "Thursday":
                    this.zhDay = "星期四";
                    break;
                case "Friday":
                    this.zhDay = "星期五";
                    break;
                case "Saturday":
                    this.zhDay = "星期六";
                    break;
                case "Sunday":
                    this.zhDay = "星期日";
                    break;
                default:
                    break;
            }
        }, 1000);
    },
    methods: {
        // 退出登录
        handleLogout() {
            this.$confirm("退出登录?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            })
                .then(() => {
                    removeStore({ name: "token" });
                    removeStore({ name: "userInfo" });
                    this.$router.push("/login");
                })
                .catch(() => { });
        },
        getScreenData() {
            this.showComponent = true;
            getScreenData().then((obj) => {
                // 分发处理数据到各个组件
                if (obj.code === "0") {
                    // 当天入库单状态、当天出库单状态
                    //#region
                    this.showComponent = false;
                    if (this.isValid(obj.WMS_ORDER_STATUS)) {
                        //存储入库单状态信息
                        let order_in = {
                            waiting_count: 0, //待入库数量
                            doing_count: 0, //上架中数量
                            done_count: 0, //已入库数量
                            other_count: 0, //其他
                        };
                        //存储出库单状态信息
                        let order_out = {
                            waiting_count: 0, //待出库数量
                            doing_count: 0, //拣货中数量
                            done_count: 0, //已入库数量
                            other_count: 0, //其他
                        };
                        for (let i = 0; i < obj.WMS_ORDER_STATUS.length; i++) {
                            let status = obj.WMS_ORDER_STATUS[i];
                            if (status.order_type == "in") {
                                //入库单
                                if (status.wms_order_state === "waiting") {
                                    order_in.waiting_count += parseInt(
                                        status.count
                                    );
                                } else if (status.wms_order_state === "doing") {
                                    order_in.doing_count += parseInt(
                                        status.count
                                    );
                                } else if (status.wms_order_state === "done") {
                                    order_in.done_count += parseInt(
                                        status.count
                                    );
                                } else {
                                    order_in.other_count += parseInt(
                                        status.count
                                    );
                                }
                            } else {
                                //出库单
                                if (status.wms_order_state === "waiting") {
                                    order_out.waiting_count += parseInt(
                                        status.count
                                    );
                                } else if (status.wms_order_state === "doing") {
                                    order_out.doing_count += parseInt(
                                        status.count
                                    );
                                } else if (status.wms_order_state === "done") {
                                    order_out.done_count += parseInt(
                                        status.count
                                    );
                                } else {
                                    order_in.other_count += parseInt(
                                        status.count
                                    );
                                }
                            }
                        }
                        // 先重置
                        this.inData = [];
                        // 入库数据
                        //#region
                        this.inData.push({
                            name: "已入库",
                            value: order_in.done_count,
                        });
                        this.inData.push({
                            name: "上架中",
                            value: order_in.doing_count,
                        });
                        this.inData.push({
                            name: "待入库",
                            value: order_in.waiting_count,
                        });
                        this.inData.push({
                            name: "其他",
                            value: order_in.other_count,
                        });
                        //#endregion
                        // 先重置
                        this.outData = [];
                        // 出库数据
                        //#region
                        this.outData.push({
                            name: "已出库",
                            value: order_out.done_count,
                        });
                        this.outData.push({
                            name: "拣货中",
                            value: order_out.doing_count,
                        });
                        this.outData.push({
                            name: "待出库",
                            value: order_out.waiting_count,
                        });
                        this.outData.push({
                            name: "其他",
                            value: order_out.other_count,
                        });
                        // 总数据
                        this.allData.inData = this.inData;

                        this.allData.outData = this.outData;

                        //#endregion
                    }
                    //#endregion
                    // 当日入库统计
                    //#region
                    if (this.isValid(obj.WMS_ORDER_IN_24_HOUR)) {
                        // 先重置
                        this.nowInData = [];
                        let tempData = [];
                        for (
                            let i = 0;
                            i < obj.WMS_ORDER_IN_24_HOUR.length;
                            i++
                        ) {
                            let status = obj.WMS_ORDER_IN_24_HOUR[i];
                            //status.count //单量
                            //status.total_weight //总重量
                            //status.total_quantity //总数量
                            //status.day  //日期
                            //status.hour //小时
                            tempData.push({
                                time: status.hour,
                                totalAmount: parseFloat(
                                    status.total_quantity
                                ).toFixed(2),
                                totalTons: parseFloat(
                                    status.total_weight
                                ).toFixed(2),
                            });
                        }
                        for (let i = 0; i < 24; i++) {
                            let findOne = tempData.find((item) => {
                                return item.time === "" + i;
                            });
                            if (findOne) {
                                this.nowInData.push(findOne);
                            } else {
                                this.nowInData.push({
                                    time: i,
                                    totalAmount: 0,
                                    totalTons: 0,
                                });
                            }
                        }
                        // 总数据
                        this.allData.nowInData = this.nowInData;
                    }
                    //#endregion
                    // 当日出库统计
                    //#region
                    if (this.isValid(obj.WMS_ORDER_OUT_24_HOUR)) {
                        // 先重置
                        this.nowOutData = [];
                        let tempData = [];
                        for (
                            let i = 0;
                            i < obj.WMS_ORDER_OUT_24_HOUR.length;
                            i++
                        ) {
                            let status = obj.WMS_ORDER_OUT_24_HOUR[i];
                            //status.count //单量
                            //status.total_weight //总重量
                            //status.total_quantity //总数量
                            //status.day  //日期
                            //status.hour //小时
                            tempData.push({
                                time: status.hour,
                                totalAmount: parseFloat(
                                    status.total_quantity
                                ).toFixed(2),
                                totalTons: parseFloat(
                                    status.total_weight
                                ).toFixed(2),
                            });
                        }
                        for (let i = 0; i < 24; i++) {
                            let findOne = tempData.find((item) => {
                                return item.time === "" + i;
                            });
                            if (findOne) {
                                this.nowOutData.push(findOne);
                            } else {
                                this.nowOutData.push({
                                    time: i,
                                    totalAmount: 0,
                                    totalTons: 0,
                                });
                            }
                        }
                        // 总数据
                        this.allData.nowOutData = this.nowOutData;
                    }
                    //#endregion
                    // 利用率管理
                    //#region
                    if (this.isValid(obj.WMS_SPACE_USED)) {
                        //仓库空间利用率
                        //obj.WMS_SPACE_USED.volume //占用体积
                        //obj.WMS_SPACE_USED.space //仓库容积
                        //利用率 = 占用体积 / 仓库容积
                        this.storageSpace = {
                            percent: parseFloat(
                                (
                                    (obj.WMS_SPACE_USED.volume /
                                        obj.WMS_SPACE_USED.space) *
                                    100
                                ).toFixed(2)
                            ),
                            des: "仓库空间",
                        };
                    }
                    if (this.isValid(obj.WMS_LOCATION_USED)) {
                        //仓库库位利用率
                        //obj.WMS_LOCATION_USED.count //总库位数
                        //obj.WMS_LOCATION_USED.used_count //已用库位数
                        //利用率 = 已用库位数 / 总库位数
                        this.storageSeat = {
                            percent: parseFloat(
                                (
                                    (obj.WMS_LOCATION_USED.used_count /
                                        obj.WMS_LOCATION_USED.count) *
                                    100
                                ).toFixed(2)
                            ),
                            des: "库位",
                        };
                    }
                    //#endregion
                    // 近一周库存统计(数量和吨位)
                    //#region
                    if (this.isValid(obj.WMS_QUANTITY_WEEK)) {
                        // 先重置
                        this.oneWeekStorageData = [];
                        for (let i = 0; i < obj.WMS_QUANTITY_WEEK.length; i++) {
                            let status = obj.WMS_QUANTITY_WEEK[i];
                            // status.piec //件数
                            // status.weight //重量
                            // status.weight_t //重量(吨)
                            // status.quantity //数量
                            // status.volume  //体积
                            this.oneWeekStorageData.push({
                                date: this.$dayjs(status.date).format("MM-DD"),
                                amount: parseFloat(status.quantity).toFixed(2),
                                tons: parseFloat(status.weight_t).toFixed(2),
                            });
                        }
                        // 总数据
                        this.allData.oneWeekStorageData =
                            this.oneWeekStorageData;
                    }
                    //#endregion
                    // 员工任务状态
                    //#region
                    if (this.isValid(obj.WMS_TASK)) {
                        // 先重置
                        this.staffTaskData = [];
                        //员工任务信息
                        for (let i = 0; i < obj.WMS_TASK.length; i++) {
                            let task = obj.WMS_TASK[i];
                            //task.waiting_count //待处理数量
                            //task.doing_count //处理中数量
                            //task.done_count //完成数量
                            //task.order_type //类型, in 入库, out 出库
                            //task.keeper  //员工帐号
                            //task.keeper_name  //员工姓名
                            this.staffTaskData.push({
                                name: task.keeper_name,
                                type:
                                    task.order_type === "in" ? "入库" : "出库",
                                todoNum: task.waiting_count,
                                dealingNum: task.doing_count,
                                doneNum: task.done_count,
                            });
                        }
                        // 总数据
                        this.allData.staffTaskData = this.staffTaskData;
                    }
                    //#endregion
                    // 近一周入库统计(数量和吨位)
                    //#region
                    if (this.isValid(obj.WMS_ORDER_IN_WEEK)) {
                        // 先重置
                        this.oneWeekInData = [];
                        //当周入库量统计
                        for (let i = 0; i < obj.WMS_ORDER_IN_WEEK.length; i++) {
                            let status = obj.WMS_ORDER_IN_WEEK[i];
                            //status.count //单量
                            //status.total_weight //总重量
                            //status.total_quantity //总数量
                            //status.day  //日期
                            this.oneWeekInData.push({
                                date: this.$dayjs(status.day).format("MM-DD"),
                                amount: parseFloat(
                                    status.total_quantity
                                ).toFixed(2),
                                tons: parseFloat(status.total_weight).toFixed(
                                    2
                                ),
                            });
                        }
                        // 总数据
                        this.allData.oneWeekInData = this.oneWeekInData;
                    }
                    //#endregion
                    // 近一周入库统计(数量和吨位)
                    //#region
                    if (this.isValid(obj.WMS_ORDER_OUT_WEEK)) {
                        // 先重置
                        this.oneWeekOutData = [];
                        //当周出库量统计
                        for (
                            let i = 0;
                            i < obj.WMS_ORDER_OUT_WEEK.length;
                            i++
                        ) {
                            let status = obj.WMS_ORDER_OUT_WEEK[i];
                            //status.count //单量
                            //status.total_weight //总重量
                            //status.total_quantity //总数量
                            //status.day  //日期
                            this.oneWeekOutData.push({
                                date: this.$dayjs(status.day).format("MM-DD"),
                                amount: parseFloat(
                                    status.total_quantity
                                ).toFixed(2),
                                tons: parseFloat(status.total_weight).toFixed(
                                    2
                                ),
                            });
                        }
                        // 总数据
                        this.allData.oneWeekOutData = this.oneWeekOutData;
                    }
                    //#endregion
                    this.$nextTick(() => {
                        this.showComponent = true;
                    });
                }
            });
        },
        // 判断变量是否有效的函数
        isValid(variable) {
            return (
                variable !== undefined && variable !== null && variable !== ""
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.main-container {
    padding: 77px 16px 16px 16px;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: calc(100% - 77px); // 确保主容器的高度不会覆盖到头部
    display: grid;
    grid-template-columns: 30% 40% 30%; // 左侧25%，中间50%，右侧25%
    grid-template-rows: repeat(4, calc(25% + 10px)); // 每列4行
    grid-row-gap: 10px; // 设置行之间的间距为20px

    .block-item {
        background: url("~@/assets/images/block-bg-1.png") no-repeat;
        background-size: 100% 100%;
        margin: 10px 14px 0;
        height: 100%; // 使每个块占满行高
        z-index: 1;
    }

    // 左侧的四个块，放在第一列
    .now-in-container,
    .i-o-manage-container,
    .now-out-container,
    .staff-task-container {
        grid-column: 1 / 2; // 左侧第一列
        grid-row: span 1; // 每个元素占一行
    }

    // 右侧的四个块，放在第三列，并确保从第1行开始
    .one-week-storage-container {
        grid-column: 3 / 4; // 右侧第三列
        grid-row: 2; // 第一行

    }


    .use-radio-manage-container {
        grid-column: 3 / 4; // 右侧第三列
        grid-row: 1; // 第二行
    }

    .one-week-in-container {
        grid-column: 3 / 4; // 右侧第三列
        grid-row: 3; // 第三行
    }

    .one-week-out-container {
        grid-column: 3 / 4; // 右侧第三列
        grid-row: 4; // 第四行
    }

    // 中间的元素占据中间的50%
    .central-element {
        grid-column: 2 / 3; // 中间第二列
        grid-row: 1 / 5; // 占据所有行 (从第1行到第4行)
        // background: url("~@/assets/images/block-bg-2.png") no-repeat;
        background-size: 100% 100%;
        background-size: 100% 100%;
        margin: 10px 14px 0;
        height: 100%; // 使每个块占满行高
    }
}
</style>
