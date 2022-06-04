import { IHomeState } from "@/typings/home";
import { createStore } from "vuex";
import home from "./modules/home";

export interface IGlobalState {
  home: IHomeState;
}

const store = createStore<IGlobalState>({
  // state: {},
  mutations: {},
  actions: {},
  modules: {
    home,
  },
});

export default store;
