<template>
  <div class="header_info">
    <img class="topLogo" src="@/assets/logo.png" alt="" />
    <van-dropdown-menu class="select_wrap">
      <!-- 注意，vue2 中v-model 是使用 input / change 事件的 + value 属性去双向绑定的，而vue3不是 -->
      <van-dropdown-item
        :modelValue="category"
        @change="headerSelectChange"
        :options="categoryOptions"
      />
    </van-dropdown-menu>
  </div>
</template>

<script lang="ts">
import { CATEGORY_TYPES } from "@/typings/home";
import { defineComponent, PropType, reactive, toRefs } from "vue";

export default defineComponent({
  name: "HomeHeader",
  props: {
    category: {
      type: Number as PropType<CATEGORY_TYPES>, //使用类型断言，让setup里的形参props，指定当前类型
    },
  },
  emits: ["setCurrentCategory"], // （可以不写）但是为了提示用
  // props 是 组件内props 接受的参数， context 是当前组件上下文，
  setup(props, context) {
    // 此时这样获取到的是 number | undefined 类型(应该是一个枚举类型) 需要在props 里使用类型断言
    // let category = props.category;
    let state = reactive({
      categoryOptions: [
        { text: "全部课程", value: CATEGORY_TYPES.ALL },
        { text: "react课程", value: CATEGORY_TYPES.REACT },
        { text: "vue课程", value: CATEGORY_TYPES.VUE },
        { text: "node课程", value: CATEGORY_TYPES.NODE },
      ],
    });
    let headerSelectChange = (value: CATEGORY_TYPES) => {
      context.emit("setCurrentCategory", value);
    };

    return {
      // 多个state 内部数据，直接在模板中使用，不需要state.xxx
      ...toRefs(state),
      headerSelectChange,
    };
  },
});
</script>

<style scoped lang="scss">
.header_info {
  height: 65px;
  background: #2a2a2a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  .topLogo {
    height: 30px;
    width: 10%;
    padding-left: 10px;
  }
  .select_wrap {
    width: 40%;
    height: 100%;
    ::v-deep .van-dropdown-menu__bar {
      background: none;
      box-shadow: none;
      height: 100%;
    }
    ::v-deep .van-dropdown-menu__item {
      height: 100%;
    }

    ::v-deep .van-dropdown-menu__title {
      color: #fff;
    }
  }
}
</style>
