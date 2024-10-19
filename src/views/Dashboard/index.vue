<template>
    <div class="dashboard-wrap">
        <div class="header-container">
            <div class="title">{{ title }}</div>
            <div class="time">{{ time }}</div>
            <div class="date">{{ date }}</div>
            <div class="zh-day">{{ zhDay }}</div>
            <i class="el-icon-switch-button logout" @click="handleLogout"></i>
        </div>
        <router-view />
        <!-- 底部导航栏 -->
        <div class="footer-nav">
            <div class="nav-container">
                <div class="arrow-left">
                    <img src="@/assets/images/left.png" alt="left" />
                </div>
                <div class="nav-btn">
                    <router-link to="/dashboard/page1" class="nav-item" active-class="active">
                        <img :src="$route.path === '/dashboard/page1' ? require('@/assets/images/nav1-active.png') : require('@/assets/images/nav1.png')"
                            alt="btn1" class="nav-icon" />
                        <span class="nav-text">数字化成效</span>
                    </router-link>
                    <router-link to="/dashboard/page2" class="nav-item" active-class="active">
                        <img :src="$route.path === '/dashboard/page2' ? require('@/assets/images/nav2-active.png') : require('@/assets/images/nav2.png')"
                            alt="btn2" class="nav-icon" />
                        <span class="nav-text">数字化应用</span>
                    </router-link>
                    <router-link to="/dashboard/page3" class="nav-item" active-class="active">
                        <img :src="$route.path === '/dashboard/page3' ? require('@/assets/images/nav3-active.png') : require('@/assets/images/nav3.png')"
                            alt="btn3" class="nav-icon" />
                        <span class="nav-text">数字化基础</span>
                    </router-link>
                </div>
                <div class="arrow-right">
                    <img src="@/assets/images/right.png" alt="right" />
                </div>

            </div>
        </div>


    </div>
</template>
<script>
export default {
    name: "Dashboard",
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
        };
    },
    mounted() {
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
                    this.$router.push("/login");
                })
                .catch(() => { });
        },
    },
};
</script>

<style lang="scss" scoped>
.dashboard-wrap {
    background: url("~@/assets/images/bg.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    width: 100%;
    height: 100%;

    .footer-nav {
        position: fixed;
        bottom: 5%;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 10px 0;

        .nav-container {
            width: 35%;
            /* 中间40%的宽度 */
            display: flex;
            justify-content: center;

            .nav-btn {
                display: flex;
                justify-content: space-between;

                .nav-item {
                    .nav-text {
                        white-space: nowrap;
                        overflow: hidden;
                        /* 隐藏溢出部分 */
                        font-size: 0.9vw;
                        margin-top: 15px;

                    }

                    text-decoration: none;
                    width: 33.33%;
                    display: flex;
                    color: #fff;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 10px 40px;
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    margin: 10px 14px 0;
                    transition: color 0.3s;
                    background-image: url("~@/assets/images/back.png");
                    transition: all 0.3s ease;
                    /* Smooth transition for both scaling and color */

                    .nav-icon {
                        width: 50%;
                        height: 40%;
                        transition: transform 0.3s ease;
                        /* Smooth icon size change */

                        /* Prevents stretching and maintains aspect ratio */
                    }

                    // 激活状态下的样式：图标变大，背景容器也增大
                    &.active {
                        color: #41a6fc;
                        transform: scale(1.2); // 背景容器增大
                        margin: 0 10px; // 调整激活状态下的边距

                        .nav-icon {
                            width: 150px;
                            height: 80px;
                            object-fit: cover;
                        }
                    }

                    // 悬停状态下的样式：只改变颜色，背景和图标保持不变
                    &:hover {
                        transform: scale(1.05);
                        /* Scale the background slightly */
                        color: #41A6FC;
                        /* Change text color on hover */

                        .nav-icon {
                            transform: scale(1.1);
                            /* Scale the icon on hover */
                        }
                    }

                }
            }

        }

    }
}

.header-container {
    width: 100%;
    height: 67px;
    position: absolute;
    left: 0;
    top: 0;
    background: url("~@/assets/images/dashboard-header.png") no-repeat;
    background-size: 100% 100%;

    .title {
        position: absolute;
        font-family: Alibaba PuHuiTi;
        left: 50%;
        top: 12px;
        letter-spacing: 10px;
        transform: translateX(-50%);
        font-size: 32px;
        font-weight: bold;
        color: #ffffff;
        text-shadow: 0px 5px 0px #00005a;
        // background-image: -webkit-linear-gradient(
        //     bottom,
        //     #afc6f5 0%,
        //     #ffffff 100%
        // );
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
    }

    .time {
        position: absolute;
        font-family: Alibaba PuHuiTi;
        left: 30px;
        top: 28px;
        font-weight: bold;
        letter-spacing: 2px;
        font-size: 24px;
        color: #b8d0f5;
    }

    .date {
        position: absolute;
        font-family: Alibaba PuHuiTi;
        right: 72px;
        top: 28px;
        font-weight: bold;
        letter-spacing: 2px;
        font-size: 24px;
        color: #b8d0f5;
    }

    .zh-day {
        position: absolute;
        font-family: Alibaba PuHuiTi;
        right: 250px;
        top: 28px;
        font-weight: bold;
        letter-spacing: 2px;
        font-size: 24px;
        color: #b8d0f5;
    }

    .logout {
        position: absolute;
        right: 30px;
        top: 30px;
        font-weight: bold;
        letter-spacing: 2px;
        font-size: 24px;
        color: #b8d0f5;
        cursor: pointer;
        z-index: 1;
    }
}
</style>
