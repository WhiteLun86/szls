// 公共接口
import request from "@/utils/request";
import { getStore } from "@/utils/store";
import md5 from "js-md5";
// 登录
export function login(params) {
    return request({
        url: "/login?" + params,
        method: "GET",
    });
}
// 获取所有大屏所需数据
export function getScreenData(params = {}) {
    const userInfo = getStore({ name: "userInfo" });
    params.username = userInfo.username;
    params.department_id = userInfo.department_id;
    params.offset = 0;
    params.rows = 20;
    const toStr = JSON.stringify(params);
    const b64 = btoa(toStr);
    let url = "data=" + encodeURIComponent(b64);
    let jid = userInfo.jsessionid;
    if (jid != null && jid.length > 0) {
        let str = userInfo.jsessionid + b64 + userInfo.password;
        url = url + "&result=" + md5(str);
        url = url + "&jsessionid=" + userInfo.jsessionid;
    }
    return request({
        url: "/queryWMSSummary?" + url,
        method: "GET",
    });
}

// this.sendQuery(
//   "/api/queryWMSSummary",
//   this.onQueryWMSSummaryResponse,
//   0,
//   20,
//   params
// );
