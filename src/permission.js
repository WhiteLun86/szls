/* eslint-disable no-undef */
import router from "./router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

NProgress.configure({ showSpinner: false }); // NProgress Configuration

// const whiteList = ["/login", "/404"]; // no redirect whitelist

// eslint-disable-next-line space-before-function-paren
router.beforeEach((to, from, next) => {
    NProgress.start();
    next(); // 允许所有路由通过
  });
  
  router.afterEach(() => {
    NProgress.done();
  });
  

router.onError((error) => {
    const pattern = /Loading \w* chunk [A-Za-z0-9-]* failed/gi;
    const isChunkLoadFailed = error.message.match(pattern);
    if (isChunkLoadFailed) {
        const flag = window.confirm("检测到系统更新，请刷新页面");
        if (flag) {
            window.location.reload();
        }
    }
});
