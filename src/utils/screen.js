export const KJScreen = {
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
    init: function () {
        $("#kid_login_button")
            .click(function () {
                KJScreen.onLogin();
            })
            .prop("disabled", false);
    },
    //用户登陆及请求
    onLogin: function () {
        let username = $("#kid_username").val();
        if (username === null || username.length === 0) {
            alert("请输入用户名");
            return false;
        }
        let password = $("#kid_password").val();
        if (password === null || password.length === 0) {
            alert("请输入密码");
            return false;
        }
        KJScreen.username = username;
        KJScreen.password = md5(password);
        let params = KJScreen.getLoginParams(username, KJScreen.password);
        KJScreen.login(params);
        //回调函数
        //一旦readyState的值改变,将会调用这个函数,readyState=4表示完成相应
        //设定函数doResult()
        return false; //要返回false,让浏览器不再做确认操作，不然会刷新页面，造成无法登录
    },
    login: function (params) {
        let url;
        url = "/api/login?" + params;
        fetch(url, {
            method: "GET", // 请求方法
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("网络响应错误：" + response.statusText);
                }
                return response.json(); // 假设返回的数据是 JSON 格式
            })
            .then((data) => this.onLoginResponse(data))
            .catch((error) => console.error("请求失败:", error));
    },
    onLogout: function () {
        let params = KJScreen.getLoginParams(
            KJScreen.username,
            KJScreen.password,
            true
        );
        KJScreen.login(params);
    },
    //重新登陆
    reLogin: function () {
        let params = this.getLoginParams(KJScreen.username, KJScreen.password);
        this.login(params);
    },
    //登陆成功及主页面，导航栏渲染；登陆不成功，进行再认证
    onLoginResponse: function () {
        if (obj.code != null) {
            if (obj.code === "0") {
                //登录成功
                KJScreen.loginCount = 0;
                KJScreen.jsessionid = obj.jsessionid;
                if (KJScreen.isValid(obj.data)) {
                    KJScreen.companyName = obj.data.company_name;
                    KJScreen.companyShortName = obj.data.company_short_name;
                    KJScreen.companyPhone = obj.data.company_phone;
                    KJScreen.company_id = obj.data.company_id;
                    KJScreen.department_id = obj.data.department_id;
                    if (KJScreen.hasLogin === false) {
                        //第一次登录成功，初始化
                        KJScreen.hasLogin = true;
                        //隐藏登录界面
                        $("#kid_login_page").hide();
                        //显示主界面
                        $("#kid_main_screen").show();
                        KJScreen.queryWMSSummary();
                    }
                }
            } else if (obj.code === "401") {
                //需要认证，或登录密码错误，
                KJScreen.loginCount++;
                if (KJScreen.loginCount <= 1) {
                    if (obj.nonce !== null) {
                        KJScreen.nonce = obj.nonce;
                        KJScreen.reLogin();
                    }
                }
            } else {
                KJScreen.loginCount++;
                if (KJScreen.isValid(obj.msg)) {
                    alert(obj.msg);
                }
            }
        }
    },
    queryWMSSummary: function () {
        let params = {};
        params.username = KJScreen.username;
        params.department_id = KJScreen.department_id;
        this.sendQuery(
            "/api/queryWMSSummary",
            this.onQueryWMSSummaryResponse,
            0,
            20,
            params
        );
    },
    onQueryWMSSummaryResponse: function () {
        if (obj.code === "0") {
            if (
                KJScreen.isValid(obj.WMS_ORDER_STATUS) &&
                obj.WMS_ORDER_STATUS.length > 0
            ) {
                //当天进出库单状态
                //存储入库单状态信息
                let order_in = {
                    waiting_count: 0, //待入库数量
                    doing_count: 0, //上架中数量
                    done_count: 0, //已入库数量
                };
                //存储出库单状态信息
                let order_out = {
                    waiting_count: 0, //待出库数量
                    doing_count: 0, //拣货中数量
                    done_count: 0, //已入库数量
                };
                for (let i = 0; i < obj.WMS_ORDER_STATUS.length; i++) {
                    let status = obj.WMS_ORDER_STATUS[i];
                    if (status.order_type == "in") {
                        //入库单
                        if (status.wms_order_state === "waiting") {
                            order_in.waiting_count += status.count;
                        } else if (status.wms_order_state === "doing") {
                            order_in.doing_count += status.count;
                        } else if (status.wms_order_state === "done") {
                            order_in.done_count += status.count;
                        }
                    } else {
                        //出库单
                        if (status.wms_order_state === "waiting") {
                            order_out.waiting_count += status.count;
                        } else if (status.wms_order_state === "doing") {
                            order_out.doing_count += status.count;
                        } else if (status.wms_order_state === "done") {
                            order_out.done_count += status.count;
                        }
                    }
                }
                //显示进出库单状态...
            }
            if (
                KJScreen.isValid(obj.WMS_ORDER_IN_24_HOUR) &&
                obj.WMS_ORDER_IN_24_HOUR.length > 0
            ) {
                //当天入库量统计
                for (let i = 0; i < obj.WMS_ORDER_IN_24_HOUR.length; i++) {
                    let status = obj.WMS_ORDER_IN_24_HOUR[i];
                    //status.count //单量
                    //status.total_weight //总重量
                    //status.total_quantity //总数量
                    //status.day  //日期
                    //status.hour //小时
                }
            }
            if (
                KJScreen.isValid(obj.WMS_ORDER_OUT_24_HOUR) &&
                obj.WMS_ORDER_OUT_24_HOUR.length > 0
            ) {
                //当天出库量统计
                for (let i = 0; i < obj.WMS_ORDER_OUT_24_HOUR.length; i++) {
                    let status = obj.WMS_ORDER_OUT_24_HOUR[i];
                    //status.count //单量
                    //status.total_weight //总重量
                    //status.total_quantity //总数量
                    //status.day  //日期
                    //status.hour //小时
                }
            }
            if (
                KJScreen.isValid(obj.WMS_ORDER_IN_WEEK) &&
                obj.WMS_ORDER_IN_WEEK.length > 0
            ) {
                //当周入库量统计
                for (let i = 0; i < obj.WMS_ORDER_IN_WEEK.length; i++) {
                    let status = obj.WMS_ORDER_IN_WEEK[i];
                    //status.count //单量
                    //status.total_weight //总重量
                    //status.total_quantity //总数量
                    //status.day  //日期
                }
            }
            if (
                KJScreen.isValid(obj.WMS_ORDER_OUT_WEEK) &&
                obj.WMS_ORDER_OUT_WEEK.length > 0
            ) {
                //当周出库量统计
                for (let i = 0; i < obj.WMS_ORDER_OUT_WEEK.length; i++) {
                    let status = obj.WMS_ORDER_OUT_WEEK[i];
                    //status.count //单量
                    //status.total_weight //总重量
                    //status.total_quantity //总数量
                    //status.day  //日期
                }
            }
            if (
                KJScreen.isValid(obj.WMS_QUANTITY_WEEK) &&
                obj.WMS_QUANTITY_WEEK.length > 0
            ) {
                //当周库存量统计
                for (let i = 0; i < obj.WMS_QUANTITY_WEEK.length; i++) {
                    let status = obj.WMS_QUANTITY_WEEK[i];
                    //status.piec //件数
                    //status.weight //重量
                    //status.weight_t //重量(吨)
                    //status.quantity //数量
                    //status.volume  //体积
                }
            }
            if (KJScreen.isValid(obj.WMS_SPACE_USED)) {
                //仓库空间利用率
                //obj.WMS_SPACE_USED.volume //占用体积
                //obj.WMS_SPACE_USED.space //仓库容积
                //利用率 = 占用体积 / 仓库容积
            }
            if (KJScreen.isValid(obj.WMS_LOCATION_USED)) {
                //仓库库位利用率
                //obj.WMS_LOCATION_USED.count //总库位数
                //obj.WMS_LOCATION_USED.count_used //已用库位数
                //利用率 = 已用库位数 / 总库位数
            }
            if (KJScreen.isValid(obj.WMS_TASK) && obj.WMS_TASK.length > 0) {
                //员工任务信息
                for (let i = 0; i < obj.WMS_TASK.length; i++) {
                    let task = obj.WMS_TASK[i];
                    //task.waiting_count //待处理数量
                    //task.doing_count //处理中数量
                    //task.done_count //完成数量
                    //task.order_type //类型, in 入库, out 出库
                    //task.keeper  //员工帐号
                    //task.keeper_name  //员工姓名
                }
            }
        } else {
            alert("获取仓储统计信息失败");
        }
    },
    getCookie: function () {
        return this.jsessionid;
    },
    getLoginParams: function (username, password, logout) {
        let obj = {};
        obj.username = username;
        if (this.isValid(logout) && logout === true) {
            obj.expires = "0";
        } else {
            obj.expires = this.expires;
        }
        obj.app_type = "web-v3";
        if (KJScreen.loginCount <= 1) {
            if (KJScreen.nonce !== null) {
                let str;
                str =
                    KJScreen.username +
                    "&" +
                    KJScreen.password +
                    "&" +
                    KJScreen.realm +
                    "&" +
                    KJScreen.nonce +
                    "&login";
                obj.response = md5(str);
            }
        }
        let toStr = JSON.stringify(obj);
        let b64 = btoa(toStr);
        let data = encodeURIComponent(b64);
        b64 += password;
        let result = md5(b64);
        return "data=" + data + "&" + "result=" + result;
    },
    // 判断变量是否有效的函数
    isValid: function (variable) {
        return variable !== undefined && variable !== null && variable !== "";
    },

    sendQuery: function (api, callback, offset, rows, params, rparams) {
        let str;
        params.offset = offset;
        params.rows = rows;
        let toStr = JSON.stringify(params);
        let b64 = btoa(toStr);
        let url;
        url = "data=" + encodeURIComponent(b64);
        let jid = KJScreen.getCookie("jsessionid");
        if (jid != null && jid.length > 0) {
            str = KJScreen.getCookie("jsessionid") + b64 + KJScreen.password;
            url = url + "&result=" + md5(str);
        }
        url = api + "?" + url;

        fetch(url, {
            method: "GET", // 请求方法
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("网络响应错误：" + response.statusText);
                }
                //console.log("response:", response.text());
                return response.json(); // 假设返回的数据是 JSON 格式
            })
            /*
        .then(text => {
            console.log("原始 JSON 数据:", text);  // 打印查看
            //return eval("(" + text + ")");//转换为json对象
            return JSON.parse(text);  // 手动解析 JSON 数据
        })
        */
            .then((data) => callback(data, rparams))
            .catch((error) => console.error("请求失败:", error));

        //KJAJAX.request("get",url,"",callback,"application/x-www-form-urlencoded",rparams);
    },
};
