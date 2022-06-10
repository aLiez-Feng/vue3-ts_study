<template>
  <div>
    <van-card
      v-for="(item, index) in lessonList"
      :key="item.id"
      :price="item.price"
      :title="item.title"
      :thumb="item.url"
    >
      <template #tags>
        <van-tag plain type="danger">
          {{ item.categoryName }}
        </van-tag>
      </template>
    </van-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ILesson } from "@/typings/home";

export default defineComponent({
  name: "HomeList",
  props: {
    lessonList: {
      type: Array as PropType<ILesson[]>, // 如果数据是一个对象数组，则使用该写法
    },
  },
  setup(props) {
    return { props };
  },
});
</script>

<style scoped></style>
