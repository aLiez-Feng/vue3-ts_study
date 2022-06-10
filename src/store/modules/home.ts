import { CATEGORY_TYPES, IHomeState, ILesson, ISliders } from "@/typings/home";
import { Module, ActionContext } from "vuex";
import { IGlobalState } from "../index";
import * as Types from "../action-types";
import { getLessons, getSliders } from "@/api/modules/home";

const state: IHomeState = {
  // 定义数据类型。在src 下创建了一个typings 文件夹用来存放ts type
  currentCategory: CATEGORY_TYPES.ALL,
  sliders: [],
  lessons: {
    id: "",
    hasMore: true, // 更多
    isLoading: false, // 加载？
    offset: 1, //位置
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
    [Types.CLEAR_HOME_LIST](state: IHomeState, payload: boolean) {
      if (payload === true) state.lessons.list = [];
    },
    [Types.SET_LESSON_LIST](state: IHomeState, payload) {
      let newArr = state.lessons.list.concat(payload);
      state.lessons.list = newArr;
      // state.lessons.hasMore = state.lessons.list.length === payload.total;
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
    async [Types.SET_LESSON_LIST](
      { commit }: ActionContext<IHomeState, any>,
      isClear: boolean
    ) {
      if (state.lessons.isLoading) return;
      if (!state.lessons.hasMore) return;
      try {
        // 修改加载状态标识
        commit(Types.SET_LOADING, true);

        let lessons = await getLessons<ILesson>(
          state.currentCategory,
          state.lessons.offset,
          state.lessons.limit
        );

        console.log(isClear);
        commit(Types.CLEAR_HOME_LIST, isClear);
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
