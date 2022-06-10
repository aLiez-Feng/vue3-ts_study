import { IGlobalState } from "@/store";
import { Ref, onMounted } from "vue";
import { Store } from "vuex";
import _ from "lodash";

export function useLoadMore(
  refreshElm: Ref<null | HTMLElement>,
  store: Store<IGlobalState>,
  type: string
) {
  let isLoading;
  let hasMore;
  // 防抖
  function _loadMore() {
    let containerHeight = element.clientHeight; //整个高度
    let scrollTop = element.scrollTop; // 滚动后距离顶部的高度
    let scrollHeight = element.scrollHeight; // 滚动条的高度

    if (containerHeight + scrollTop + 20 >= scrollHeight) {
      store.dispatch(type);
    }
  }

  let element: HTMLElement;
  onMounted(() => {
    element = refreshElm.value as HTMLElement; // 当页面挂载成功后，肯定是一个dom  则进行类型断言，由于形参指定的可能会为null
    element.addEventListener("scroll", _.debounce(_loadMore, 200));
  });

  return {
    isLoading: false,
    hasMore: false,
  };
}
