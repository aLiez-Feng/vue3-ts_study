<template>
  <div class="home">
    {{ category }}
    <!-- 首页头部 -->
    <HomeHeader></HomeHeader>
    <!-- 轮播 -->
    <HomeSwiper></HomeSwiper>
    <!-- 课程列表 -->
    <HomeList></HomeList>
  </div>
</template>

<script lang="ts">
import { IGlobalState } from "@/store";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import HomeHeader from "./components/HomeHeader.vue";
import HomeList from "./components/HomeList.vue";
import HomeSwiper from "./components/HomeSwiper.vue";

export default defineComponent({
  name: "home",
  components: {
    HomeHeader,
    HomeList,
    HomeSwiper,
  },
  setup(props, context) {
    const store = useStore<IGlobalState>();
    let category = computed(() => {
      return store.state.home.currentCategory;
    });

    return { category };
  },
});
</script>

<style lang="scss" scoped></style>
