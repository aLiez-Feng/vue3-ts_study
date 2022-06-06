import { CATEGORY_TYPES, IHomeState, ISliders } from "@/typings/home";
import { Module, ActionContext } from "vuex";
import { IGlobalState } from "../index";
import * as Types from "../action-types";
import { getSliders } from "@/api/modules/home";

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
  mutations: {
    //  [Types.SET_CATEGORY] 将所有mutaions 名 放入外部文件
    [Types.SET_CATEGORY](state: IHomeState, payload: CATEGORY_TYPES) {
      state.currentCategory = payload;
    },
    [Types.SET_SLIDER_LIST](state: IHomeState, payload: ISliders[]) {
      state.sliders = payload;
    },
  },
  actions: {
    async [Types.SET_SLIDER_LIST]({ commit }: ActionContext<IHomeState, any>) {
      try {
        let result = await getSliders<ISliders>();
        commit(Types.SET_SLIDER_LIST, result);
      } catch (error) {
        console.log(error);
        Promise.reject(error);
      }
    },
  },
  state,
};

export default home;
