import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// echarts
import * as echarts from "echarts";
// dayjs
import dayjs from "dayjs";
// 按需引入elementUI
import "element-ui/lib/theme-chalk/index.css";
import {
    Input,
    Table,
    TableColumn,
    Loading,
    Pagination,
    Button,
    MessageBox
} from "element-ui";
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Button);
Vue.use(Loading.directive);
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$loading = Loading.service;

Vue.prototype.$eventBus = new Vue(); // 事件总线
Vue.prototype.$echarts = echarts;
Vue.prototype.$dayjs = dayjs;

import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import "@/assets/css/common.scss"; // 公共样式
import "lib-flexible"; // rem适配
import "@/permission"; // 路由守卫
import "@/assets/font/index.css"; // 字体

Vue.config.productionTip = false;

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
