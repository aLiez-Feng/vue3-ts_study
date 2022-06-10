import { CATEGORY_TYPES } from "@/typings/home";
import axios from "../index";

// 请求轮播图列表
export function getSliders<T>() {
  return axios.get<T, T>("/slider");
}

// 获取课程列表
export function getLessons<T>(
  category: CATEGORY_TYPES,
  offset: number = 0,
  limit: number = 5
) {
  // json-server 过滤查询直接传入对应数据键名=xxx即可， _page当前页数，_limit 当前一页多少条
  return axios.get<T, T>(
    `/lessonList?category=${category}&_page=${offset}&_limit=${limit}`
  );
}
