<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in sliders" :key="item.url">
      <img class="swipe_item" :src="item.url" />
    </van-swipe-item>
  </van-swipe>
</template>

<script lang="ts">
import { IGlobalState } from "@/store";
import * as Types from "@/store/action-types";
import { computed, defineComponent, reactive, toRefs } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "HomeSwiper",
  // setup 不能单独使用async 和 await 需要配合 vue3 的Suspense 组件，异步组件，规定默认显示和请求中显示内容
  async setup() {
    // 先获取store 对象
    let store = useStore<IGlobalState>();
    // 从vuex 中获取数据
    let sliders = computed(() => store.state.home.sliders);
    // 如果数据不存在再去触发actions 请求，否则使用缓存数据
    if (sliders.value.length == 0) {
      // 触发actions
      await store.dispatch(`home/${Types.SET_SLIDER_LIST}`);
    }

    return {
      sliders,
    };
  },
});
</script>

<style scoped lang="scss">
.swipe_item {
  width: 100%;
  height: 20%;
}
</style>
