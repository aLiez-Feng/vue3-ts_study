import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// 设置axios请求基本路径
axios.defaults.baseURL = "/api";

// 请求拦截
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
});

// 响应拦截
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.error == 1) {
      return Promise.reject(response.data.data);
    }
    return response.data.data;
  },
  (err) => {
    if (err) {
      return Promise.reject(err);
    }
  }
);

export default axios;
