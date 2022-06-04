import { CATEGORY_TYPES, IHomeState } from "@/typings/homt";
import { Module } from "vuex";
import { IGlobalState } from "../index";

const state: IHomeState = {
  // 定义数据类型。在src 下创建了一个typings 文件夹用来存放ts type
  currentCategory: CATEGORY_TYPES.ALL,
  sliders: [],
  lessons: {
    hasMore: false, // 更多
    isLoading: false, // 加载？
    offset: 0, //位置
    limit: 5, // 页条数
    list: [], // 列表
  },
};

const home: Module<IHomeState, IGlobalState> = {
  namespaced: true,
  state,
};

export default home;
