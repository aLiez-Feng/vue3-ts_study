import axios from "../index";

// 请求轮播图列表
export function getSliders<T>() {
  return axios.get<T, T>("/slider");
}
