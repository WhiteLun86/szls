<template>
    <div class="page-container">
        <div class="left1">
            <div class="left-text">5G网</div>
        </div>
        <div class="left1-arrow">
            <img style="width: 100%; height: 100%; object-fit: cover;" src="@/assets/images/page3/left1-arrow.png">
        </div>
        <div class="left2">
            <div class="left-text">私有云</div>
        </div>
        <div class="left2-arrow">
            <img style="width: 100%; height: 100%; object-fit: cover;" src="@/assets/images/page3/left2-arrow.png">
        </div>
        <div class="left3">
            <div class="left-text">安全大脑</div>
        </div>
        <div class="left3-arrow">
            <img style="width: 100%; height: 100%; object-fit: cover;" src="@/assets/images/page3/left3-arrow.png">
        </div>
        <div class="left4">
            <div class="left-text">灾备</div>
        </div>
        <div class="left4-arrow">
            <img style="width: 100%; height: 100%; object-fit: cover;" src="@/assets/images/page3/left4-arrow.png">
        </div>
        <div class="left5">
            <div class="left-text">企业云盘</div>
        </div>
        <div class="left5-arrow">
            <img style="width: 100%; height: 100%; object-fit: cover;" src="@/assets/images/page3/left5-arrow.png">
        </div>
        <div class="jf">
            <img src="@/assets/images/page3/jf-icon.png">
            <div class="jf-text">机房</div>
        </div>
        <div class="right1">
            <div class="right-text">UPF</div>
        </div>
        <div class="right1-arrow">
            <img style="width: 100%; height: 100%; object-fit: cover;" src="@/assets/images/page3/right1-arrow.png">
        </div>
        <div class="right2">
            <div class="right-text">数采网关</div>
        </div>
        <div class="right2-arrow">
            <img style="width: 100%; height: 100%; object-fit: cover;" src="@/assets/images/page3/right2-arrow.png">
        </div>
        <div class="right3">
            <div class="right-text">工业PON</div>
        </div>
        <div class="right3-arrow">
            <img style="width: 100%; height: 100%; object-fit: cover;" src="@/assets/images/page3/right3-arrow.png">
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
.left1-arrow {
    position: absolute;
    top: 14vh;
    left: 30vw;
    background-size: cover;
    width: 371px;
    height: 461px;

}
.left2-arrow {
    position: absolute;
    top: 31vh;
    left: 24vw;
    background-size: cover;
    width: 445px;
    height: 306px;

}
.left3-arrow {
    position: absolute;
    top: 46vh;
    left: 24vw;
    background-size: cover;
    width: 445px;
    height: 145px;

}
.left4-arrow {
    position: absolute;
    top: 60vh;
    left: 24vw;
    background-size: cover;
    width: 446px;
    height: 17px;

}
.left5-arrow {
    position: absolute;
    top: 61vh;
    left: 29vw;
    background-size: cover;
    width: 372px;
    height: 178px;

}

.left1 {
    position: absolute;
    top: 6vh;
    left: 11vw;
    background: url("~@/assets/images/page3/left1-bg.png") no-repeat center center;
    background-size: cover;
    width: 366px;
    height: 154px;

}

.left2 {
    position: absolute;
    top: 22vh;
    left: 5vw;
    background: url("~@/assets/images/page3/left2-bg.png") no-repeat center center;
    background-size: cover;
    width: 366px;
    height: 154px;

}

.left3 {
    position: absolute;
    top: 40vh;
    left: 5vw;
    background: url("~@/assets/images/page3/left3-bg.png") no-repeat center center;
    background-size: cover;
    width: 366px;
    height: 154px;

}

.left4 {
    position: absolute;
    top: 55vh;
    left: 5vw;
    background: url("~@/assets/images/page3/left4-bg.png") no-repeat center center;
    background-size: cover;
    width: 366px;
    height: 154px;

}

.left5 {
    position: absolute;
    top: 70vh;
    left: 10vw;
    background: url("~@/assets/images/page3/left1-bg.png") no-repeat center center;
    background-size: cover;
    width: 366px;
    height: 154px;

}




.left1,
.left2,
.left3,
.left4,
.left5 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
}

.left-text {
    font-family: Alibaba PuHuiTi;
    font-weight: 500;
    font-size: 1.5vw;
    color: #1EE3F3;
    line-height: 27px;
    padding-top: 1vh;
    padding-left: 10vw;
}

.right1 {
    position: absolute;
    top: 16vh;
    left: 80vw;
    background: url("~@/assets/images/page3/right1-bg.png") no-repeat center center;
    background-size: cover;
    width: 280px;
    height: 111px;
}

.right1-arrow {
    position: absolute;
    top: 21vh;
    left: 70.8vw;
    background-size: cover;
    width: 181px;
    height: 167px;

}

.right2-arrow {
    position: absolute;
    top: 32vh;
    left: 55vw;
    background-size: cover;
    width: 484px;
    height: 155px;

}

.right3-arrow {
    position: absolute;
    top: 39vh;
    left: 51.4vw;
    background-size: cover;
    width: 555px;
    height: 336px;

}

.right2 {
    position: absolute;
    top: 41vh;
    left: 80vw;
    background: url("~@/assets/images/page3/right2-bg.png") no-repeat center center;
    background-size: cover;
    width: 280px;
    height: 111px;
}

.right3 {
    position: absolute;
    top: 64vh;
    left: 80vw;
    background: url("~@/assets/images/page3/right3-bg.png") no-repeat center center;
    background-size: cover;
    width: 280px;
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
    left: 45vw;
    background: url("~@/assets/images/page3/jf-bg.png") no-repeat center center;
    background-size: cover;
    width: 116px;
    /* Set the width of the element */
    height: 116px;
    /* Set the height of the element */
    display: flex;
    flex-direction: column;
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