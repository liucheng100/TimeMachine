/**
 *  @FileCreator: StevenGao
 * @Date: 2022/2/11
 */

import type { AxiosRequestConfig, AxiosRequestTransformer } from "axios";

export interface MYRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: any) => any;
  responseInterceptorCatch?: (error: any) => any;
}

export interface MYRequestConfig extends AxiosRequestConfig {
  interceptors?: MYRequestInterceptors;
  transformers?: Array<AxiosRequestTransformer>;
  showLoading?: boolean;
  needHeader?: boolean;
}
