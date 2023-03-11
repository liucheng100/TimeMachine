import MYRequest from "@/utils/request/request";
import { BASE_URL, TIMEOUT } from "@/utils/request/config";
import qs from "querystring";
import { getToken } from "../auth";

const myRequest = new MYRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestInterceptor: (config) => {
      let token = getToken();
      if (token) {
        const configs = config.headers as any;
        configs.token = `${token}`;
      }
      return config;
    },
    requestInterceptorCatch: (err) => {
      console.log("请求拦截失败");
      return err;
    },
    responseInterceptor: (res) => {
      return res;
    },
    responseInterceptorCatch: (err) => {
      console.log("响应失败的拦截");
      return err;
    },
  },
  transformers: [
    (oldData, headers) => {
      if (headers === undefined) {
        headers = {};
        headers["Content-Type"] = "application/x-www-form-urlencoded";
        return qs.stringify(oldData);
      } else {
        switch (headers["Content-Type"]) {
          case "multipart/form-data":
            return oldData;
          case "application/json":
            return JSON.stringify(oldData);
          default:
            return qs.stringify(oldData);
        }
      }
    },
  ],
});

export default myRequest;
