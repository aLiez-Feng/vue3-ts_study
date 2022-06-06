<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="image in sliders" :key="image">
      <img :src="image" />
    </van-swipe-item>
  </van-swipe>
</template>

<script lang="ts">
import { IGlobalState } from "@/store";
import * as Types from "@/store/action-types";
import { ISliders } from "@/typings/home";
import { computed, defineComponent, reactive, toRefs } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "HomeSwiper",
  setup() {
    debugger;
    // 先获取store 对象
    let store = useStore<IGlobalState>();
    // 从vuex 中获取数据
    let sliders = computed(() => store.state.home.sliders);
    // 如果数据不存在再去触发actions 请求，否则使用缓存数据
    if (sliders.value.length == 0) {
      // 触发actions
      store.dispatch(`home/${Types.SET_SLIDER_LIST}`);
    }
    

    return {
      sliders,
    };
  },
});
</script>

<style scoped></style>
