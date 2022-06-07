import { CATEGORY_TYPES, IHomeState, ILessons, ISliders } from "@/typings/home";
import { Module, ActionContext } from "vuex";
import { IGlobalState } from "../index";
import * as Types from "../action-types";
import { getLessons, getSliders } from "@/api/modules/home";

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
    [Types.SET_LOADING](state: IHomeState, payload: boolean) {
      state.lessons.isLoading = payload;
    },
    [Types.SET_LESSON_LIST](state: IHomeState, payload) {
      let newArr = state.lessons.list.concat(payload);
      state.lessons.list = newArr;
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
    async [Types.SET_LESSON_LIST]({ commit }: ActionContext<IHomeState, any>) {
      if (state.lessons.isLoading) return;
      if (!state.lessons.hasMore) return;
      try {
        // 修改加载状态标识
        commit(Types.SET_LOADING, true);

        let lessons = await getLessons<ILessons>(
          state.currentCategory,
          state.lessons.offset,
          state.lessons.limit
        );

        commit(Types.SET_LESSON_LIST, lessons);
        commit(Types.SET_LOADING, false);
      } catch (error) {
        commit(Types.SET_LOADING, false);
      }
    },
  },
  state,
};

export default home;
