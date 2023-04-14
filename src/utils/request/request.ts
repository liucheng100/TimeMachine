/**
 *  @FileCreator: StevenGao
 * @Date: 2022/2/11
 */

import axios from "axios";
import type { AxiosInstance } from "axios";
import type { MYRequestInterceptors, MYRequestConfig } from "./type";
import { ElMessage } from "element-plus";
import { getToken, removeToken, setToken } from "@/utils/auth";

const DEFAULT_LOADING = true;

class MYRequest {
  instance: AxiosInstance;
  interceptors?: MYRequestInterceptors;
  showLoading: boolean;
  needHeader?: boolean;
  baseURL?: String;
  constructor(config: MYRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;
    this.needHeader = config.needHeader;

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
    this.instance.interceptors.request.use(
      (config) => {
        // console.log("所有实例已经拦截");
        if (this.showLoading) {
          // console.log("HERE IS THE LOADING");
        }
        return config;
      },
      (err) => {
        console.log("请求拦截失败");
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data as any;
        if (data.returnCode === "-1001") {
          console.log("请求失败,错误信息");
        } else {
          if (res.headers && res.headers["token"]) {
            if (getToken()) {
              setToken(res.headers["token"]);
            }
          }
          if (this.needHeader) return res;
          return data;
        }
      },
      (err) => {
        console.log("所有实例的拦拦截器:响应拦截失败");
        if (err.response && err.response.status === 404) {
          console.log("404的错误");
        } else if (err.response && err.response.status === 401) {
          // 不知道为什么这里写不生效！！
          // removeToken();
          // ElMessage.warning('token过期，请重新登录')
          // alert('token过期，请重新登录')
          // location.reload();
        }
        return err;
      }
    );
  }

  request<T>(config: MYRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }
      this.needHeader = config.needHeader;
      this.instance
        .request<any, any>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          this.showLoading = DEFAULT_LOADING;
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING;
          reject(err);
          return err;
        });
    });
  }

  get<T>(config: MYRequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: "GET",
    });
  }

  post<T>(config: MYRequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: "POST",
    });
  }

  delete<T>(config: MYRequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: "DELETE",
    });
  }
}

export default MYRequest;
