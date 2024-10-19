/* eslint-disable no-undef */
import router from "@/router";
import axios from "axios";
import { removeStore } from "./store";

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // baseURL: '/webapi',
    withCredentials: true, // send cookies when cross-domain requests
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
    }, // 设置传输内容的类型和编码
    timeout: 60000, // request timeout
});

// request interceptor
service.interceptors.request.use(
    (config) => {
        // do something before request is sent
        return config;
    },
    (error) => {
        // do something with request error
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    (response) => {
        const res = response.data;
        // 登录成功
        if (res.code === "0") {
            return res;
        }
        // 密码错误
        else if (res.code === "401") {
            console.error("err:" + '登录超时，请重新登录！'); // for debug
            removeStore({ name: "token" }); // 清空token
            router.push("/login");
            return Promise.reject(res);
        }
        // 402、403: 登录失效
        else {
            router.push("/login");
            // Vue.prototype.$baseMessage(res.msg || "系统错误", "error");
            return Promise.reject(res);
            // return res;
        }
    },
    (error) => {
        console.error("err:" + error); // for debug
        // Vue.prototype.$baseMessage(error.message, 'error')
        return Promise.reject(error);
    }
);

export default service;
