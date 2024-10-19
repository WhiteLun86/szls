<template>
    <div class="page-container">
        <div class="jf">
            <div class="jf-text">机房</div>
        </div>
        <div class="right1">
            <div class="right-text">UPF</div>
        </div>
        <div class="right2">
            <div class="right-text">数采网关</div>
        </div>
        <div class="right3">
            <div class="right-text">工业PON</div>
        </div>
    </div>
</template>
<script lang="js">
</script>
<style lang="scss" scoped>
.page-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.right1 {
    position: absolute;
    top: 10vh;
    left: 80vw;
    background: url("~@/assets/images/page3/right1-bg.png") no-repeat center center;
    background-size: cover;
    width: 280px;
    /* Set the width of the element */
    height: 111px;
}

.right2 {
    position: absolute;
    top: 41vh;
    left: 80vw;
    background: url("~@/assets/images/page3/right2-bg.png") no-repeat center center;
    background-size: cover;
    width: 280px;
    /* Set the width of the element */
    height: 111px;
}

.right3 {
    position: absolute;
    top: 71vh;
    left: 80vw;
    background: url("~@/assets/images/page3/right3-bg.png") no-repeat center center;
    background-size: cover;
    width: 280px;
    /* Set the width of the element */
    height: 111px;
}

.right1,
.right2,
.right3 {
    display: flex;
    /* Enables Flexbox */
    justify-content: flex-start;
    /* Horizontally center text */
    align-items: center;
    /* Vertically center text */
    text-align: center;
    font-size: 1.5vw;
    /* Adjust font size relative to viewport width */
    font-family: Alibaba PuHuiTi;
    font-weight: bold;
    color: #F2F2F2;
    line-height: 28px;
}

.right-text {
    font-family: Alibaba PuHuiTi;
    font-weight: bold;
    font-size: 24px;
    color: #1EE3F3;
    padding-left: 110px;
}

/* Default for regular screens (e.g., desktop, laptop, tablet) */
.jf {
    position: absolute;
    top: 51vh;
    left: 43vw;
    background: url("~@/assets/images/page3/机房.png") no-repeat center center;
    background-size: cover;
    width: 180px;
    /* Set the width of the element */
    height: 90px;
    /* Set the height of the element */
    display: flex;
    /* Enables Flexbox */
    justify-content: center;
    /* Horizontally center text */
    align-items: center;
    /* Vertically center text */

    text-align: center;
    /* Center align text */
    /* Text color (optional, adjust as needed) */
    font-size: 1.5vw;
    /* Adjust font size relative to viewport width */
    font-family: Alibaba PuHuiTi;
    font-weight: bold;
    color: #F2F2F2;
    line-height: 28px;

    .jf-text {
        font-size: 1vw;
        background-image: linear-gradient(0deg, #03BCFF 0.537109375%, #AAFCFF 98.6328125%);
        ;
        background-clip: text;
        -webkit-background-clip: text;
        /* 兼容 Webkit 浏览器 */
        color: transparent;
        /* 使文字颜色透明 */
    }
}
</style>