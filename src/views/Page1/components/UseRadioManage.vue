<template>
    <div class="container">
        <div class="header">
            <slot name="header" />
        </div>
        <div class="content">
            <div class="use-radio-item">
                <div class="use-radio-content">
                    <img src="~@/assets/images/block-storage.png" />
                    <div class="use-radio-percent">
                        {{ (storageSpace.percent || 0) }}
                    </div>
                    <div class="use-radio-des">
                        {{ "在线设备数量" }}
                    </div>
                </div>
            </div>
            <div class="use-radio-item">
                <div class="use-radio-content">
                    <img src="~@/assets/images/block-storage.png" />
                    <div class="use-radio-percent">
                        {{ (storageSeat.percent || 0) }}
                    </div>
                    <div class="use-radio-des">
                        {{ "运行天数" }}
                    </div>
                </div>
            </div>
            <div class="use-radio-item">
                <div class="use-radio-content">
                    <img src="~@/assets/images/block-storage.png" />
                    <div class="use-radio-percent">
                        {{ (storageSeat.percent || 0) }}
                    </div>
                    <div class="use-radio-des">
                        {{ "今日目标产量" }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            storageSpace: {
                percent: 175, // 默认值
                des: "仓库空间",
            },
            storageSeat: {
                percent: 260, // 默认值
                des: "库位",
            },

        };
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
        // padding: 22px 33px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .use-radio-item {
            width: 100%;
            height: 100%;
            position: relative;
            .use-radio-title {
                width: 100%;
                height: 37px;
                background: url("~@/assets/images/block-content-header.png")
                    no-repeat;
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
            .use-radio-content {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                padding-top: 5px;
                box-sizing: border-box;
                position: relative;
                img {
                    width: 100%;
                }
                .use-radio-percent {
                    position: absolute;
                    top: 25%;
                    left: 50%;
                    transform: translateX(-50%);
                    font-family: DIN;
                    font-weight: bold;
                    font-size: 34px;
                    color: #ffc61a;
                }
                .use-radio-des {
                    position: absolute;
                    top: 47%;
                    white-space: nowrap;
                    left: 50%;
                    transform: translateX(-50%);
                    font-family: Alibaba PuHuiTi;
                    font-weight: 400;
                    font-size: 16px;
                    color: #a5cfee;
                }
            }
        }
    }
}
</style>
