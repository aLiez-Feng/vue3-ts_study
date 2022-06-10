<template>
  <div class="home">
    <!-- 首页头部 -->
    <HomeHeader
      :category="category"
      @setCurrentCategory="setCurrentCategory"
      style="z-index: 999"
    ></HomeHeader>
    <div class="mainContent" ref="refreshElm">
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
      <HomeList :lessonList="lessonList"></HomeList>
    </div>
  </div>
</template>

<script lang="ts">
import { IGlobalState } from "@/store";
import { CATEGORY_TYPES } from "@/typings/home";
import { computed, defineComponent, onMounted, ref } from "vue";
import { Store, useStore } from "vuex";
import HomeHeader from "./components/HomeHeader.vue";
import HomeList from "./components/HomeList.vue";
import HomeSwiper from "./components/HomeSwiper.vue";
import * as Types from "@/store/action-types";
import { useLoadMore } from "@/hooks/useLoadMore";

// 一个专门 获取 / 修改 分类状态的方法 （一个函数一个模块一个功能，模块化规范<composition api>）
function useCategory(store: Store<IGlobalState>) {
  // 获取分类状态   computed 是 composition api 响应式的
  let category = computed(() => store.state.home.currentCategory);

  // 设置分类状态
  function setCurrentCategory(category: CATEGORY_TYPES) {
    store.commit(`home/${Types.SET_CATEGORY}`, category);
    // 需要清理原有数组
    useLessonList(store, true);
  }

  // return 出去供setup内使用
  return {
    category,
    setCurrentCategory,
  };
}

// 获取 home 页面列表函数
function useLessonList(store: Store<IGlobalState>, isClear: boolean) {
  const lessonList = computed(() => store.state.home.lessons.list);
  console.log("aaaaaaa", lessonList.value);
  // 此时更改了顶部课程选项，需要充值列表重新获取
  if (isClear === true)
    store.dispatch(`home/${Types.SET_LESSON_LIST}`, isClear);

  onMounted(() => {
    if (lessonList.value.length === 0) {
      console.log("传入", isClear);

      store.dispatch(`home/${Types.SET_LESSON_LIST}`, isClear);
    }
  });
  return { lessonList };
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
    // 分类和设置分类
    let { category, setCurrentCategory } = useCategory(store);
    // 列表获取
    let { lessonList } = useLessonList(store, false);

    // 获取真实dom
    const refreshElm = ref<null | HTMLElement>(null);

    const { isLoading, hasMore } = useLoadMore(
      refreshElm,
      store,
      `home/${Types.SET_LESSON_LIST}`
    );
    return {
      category,
      setCurrentCategory,
      lessonList,
      refreshElm,
    };
  },
});
</script>

<style lang="scss" scoped></style>
