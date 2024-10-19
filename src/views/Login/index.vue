<template>
    <div class="container">
        <div class="login-form">
            <h1 class="title">数字孪生驾驶舱</h1>
            <h4 class="sub-title">测试版本v1.0</h4>
            <el-input
                style="margin-bottom: 24px"
                v-model="KJScreen.username"
                placeholder="请输入 账户"
            ></el-input>
            <el-input
                style="margin-bottom: 24px"
                v-model="KJScreen.password"
                placeholder="请输入 密码"
                show-password
            ></el-input>
            <el-button style="width: 100%" @click="handleLogin" type="primary"
                >登 录</el-button
            >
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            KJScreen: {
                username: "",
                password: "",
                nonce: "",
                expires: 300,
                jsessionid: "",
                realm: "app.qik56.com",
                loginCount: 0,
                hasLogin: false,
                companyName: "",
                companyShortName: "",
                companyPhone: "",
                company_id: "",
                department_id: "",
            },
        };
    },
    methods: {
        handleLogin() {
            if (!this.KJScreen.username) {
                alert("请输入账户");
                return;
            }
            if (!this.KJScreen.password) {
                alert("请输入密码");
                return;
            }
            this.$router.push("/dashboard");
        }
            
    },
};
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 100px;
    box-sizing: border-box;
    .title {
        font-size: 3em;
        color: #111111;
    }
    .sub-title {
        font-size: 1.3em;
        color: #a0a0a0;
        letter-spacing: 0;
        margin-top: 0 !important;
        margin-bottom: 24px;
    }
    .login-form {
        width: 360px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>
