<template>
  <div class="home">
    <!-- 首页头部 -->
    <HomeHeader></HomeHeader>
    <!-- 轮播 -->
    <HomeSwiper></HomeSwiper>
    <!-- 课程列表 -->
    <HomeList></HomeList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
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
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
