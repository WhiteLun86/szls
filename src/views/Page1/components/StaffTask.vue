<template>
  <div class="container">
    <div class="header">
      <slot name="header" />
    </div>
    <div class="content">
      <div class="staff-task-wrapper">
        <div class="staff-task-header">
          <div class="staff-task-header-column">订单编号</div>
          <div class="staff-task-header-column">交易时间</div>
          <div class="staff-task-header-column">交易金额</div>
          <div class="staff-task-header-column">订单状态</div>
          <!-- <div class="staff-task-header-column">完成</div> -->
        </div>
        <div class="staff-task-content">
          <InifiniteScroll
            v-if="showConponent"
            :scrollHeight="scrollHeight"
            :carouselSpeed="0.03"
          >
            <div
              class="staff-task-content-item"
              v-for="(item, index) in staffTaskData"
              :key="index"
            >
              <div class="staff-task-content-item-column">
                {{ item.orderId }}
              </div>
              <div class="staff-task-content-item-column">
                {{ item.transactionTime }}
              </div>
              <div class="staff-task-content-item-column">
                {{ item.transactionAmount }}
              </div>
              <div
                class="staff-task-content-item-column"
                :style="{
                  color: item.status === '已完成' ? '#0074C8' : '#00F0FF',
                }"
              >
                {{ item.status }}
              </div>
            </div>
          </InifiniteScroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InifiniteScroll from "@/components/InfiniteScroll";
import { debounce } from "@/utils/common";

export default {
  components: {
    InifiniteScroll,
  },
  data() {
    return {
      staffTaskData: [], // 用于存放任务数据
      showConponent: false, // 控制无限滚动组件是否展示
      scrollHeight: 60, // 滚动高度
    };
  },
  mounted() {
    this.initDefaultData(); // 初始化10条默认数据
    window.addEventListener("resize", this.calcContentHeightAndRun); // 监听窗口变化
    this.calcContentHeightAndRun(); // 初始化滚动设置
  },
  destroyed() {
    window.removeEventListener("resize", this.calcContentHeightAndRun); // 销毁监听事件
  },
  methods: {
    // 生成10条默认数据
    initDefaultData() {
      this.staffTaskData = Array.from({ length: 9 }, (_, index) => ({
        orderId: `jd555555${index + 1}`, // 订单编号
        transactionTime: `2024-10-16`, // 交易时间
        transactionAmount: `${Math.floor(Math.random() * 10000) + 1000}元`, // 交易金额
        status: index % 2 === 0 ? "已完成" : "处理中", // 订单状态
      }));
    },

    // 计算滚动高度并启动无限滚动
    calcContentHeightAndRun: debounce(function () {
      this.showConponent = false;
      // 获取content的高度
      this.scrollHeight =
        document.getElementsByClassName("staff-task-content")[0].clientHeight;
      this.showConponent = true;
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
    width: 100%;
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
    padding: 22px;
    box-sizing: border-box;
    .staff-task-wrapper {
      width: 100%;
      height: 100%;
      border: 1px solid #0c70bd;
      .staff-task-header {
        display: flex;
        align-items: center;
        width: 100%;
        height: 32px;
        background: #042e56;
        .staff-task-header-column {
          width: 25%;
          height: 100%;
          border: 1px solid #0c70bd;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: Alibaba PuHuiTi;
          font-weight: bold;
          font-size: 16px;
          color: #ffffff;
        }
      }
      .staff-task-content {
        width: 100%;
        height: calc(100% - 32px);
        .staff-task-content-item {
          width: 100%;
          height: 30px;
          display: flex;
          align-items: center;
          &:nth-child(odd) {
            background: #000d20;
          }
          &:nth-child(even) {
            background: #011429;
          }
          .staff-task-content-item-column {
            width: 25%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #0c70bd;
            font-family: Alibaba PuHuiTi;
            font-weight: 400;
            font-size: 14px;
            color: #c8f1f9;
          }
        }
      }
    }
  }
}
</style>
