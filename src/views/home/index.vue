<template>
  <div class="home">
    <!-- 首页头部 -->
    <HomeHeader
      :category="category"
      @setCurrentCategory="setCurrentCategory"
    ></HomeHeader>
    <div class="mainContent">
      <Suspense>
        <template #default>
          <!-- 轮播图 -->
          <HomeSwiper></HomeSwiper>
        </template>
        <template #fallback>
          <div>loading...</div>
        </template>
      </Suspense>
      <!-- 课程列表 -->
      <HomeList></HomeList>
    </div>
  </div>
</template>

<script lang="ts">
import { IGlobalState } from "@/store";
import { CATEGORY_TYPES } from "@/typings/home";
import { computed, defineComponent } from "vue";
import { Store, useStore } from "vuex";
import HomeHeader from "./components/HomeHeader.vue";
import HomeList from "./components/HomeList.vue";
import HomeSwiper from "./components/HomeSwiper.vue";
import * as Types from "@/store/action-types";

// 一个专门 获取 / 修改 分类状态的方法 （一个函数一个模块一个功能，模块化规范<composition api>）
function useCategory(store: Store<IGlobalState>) {
  // 获取分类状态   computed 是 composition api 响应式的
  let category = computed(() => store.state.home.currentCategory);

  // 设置分类状态
  function setCurrentCategory(category: CATEGORY_TYPES) {
    store.commit(`home/${Types.SET_CATEGORY}`, category);
  }

  // return 出去供setup内使用
  return {
    category,
    setCurrentCategory,
  };
}

export default defineComponent({
  name: "home",
  components: {
    HomeHeader,
    HomeList,
    HomeSwiper,
  },
  setup(props, context) {
    // 需要vuex数据，分类状态
    let store = useStore<IGlobalState>();
    let { category, setCurrentCategory } = useCategory(store);
    return {
      category,
      setCurrentCategory,
    };
  },
});
</script>

<style lang="scss" scoped></style>
