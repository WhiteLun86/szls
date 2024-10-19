<template>
    <div class="container">
        <div class="content">
            <!-- 图片展示区域 -->
            <img :src="imageUrl" alt="展示图片" class="image-display" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 默认展示的图片路径
            imageUrl: require('@/assets/images/home.png'), // 替换为实际图片路径
        };
    },
};
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    position: relative; /* 为了定位图片 */
    box-sizing: border-box;

    .header {
        position: relative; /* 保证 header 位于图片上方 */
        z-index: 2; /* 层级比图片高 */
        width: calc(100% - 6px);
        height: 47px;
        padding-left: 47px;
        background: url("~@/assets/images/block-header-2.png") no-repeat;
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
        display: flex;
        justify-content: center;
        align-items: center;
        .image-display {
            position: absolute; /* 将图片放置在页面最底层 */
            opacity: 0.9; /* 设置图片透明度为 50% */
            z-index: 0; /* 层级较低，确保在最底部 */
            top: -70px;
            left: -400px;
            width: 85vw; /* 图片宽度填满整个视窗 */
            height: 95vh; /* 图片高度填满整个视窗 */
            object-fit: contain; /* 确保图片按比例缩放且完整显示 */
        }
    }
}
</style>
