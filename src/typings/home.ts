export enum CATEGORY_TYPES {
  ALL,
  REACT,
  VUE,
  NODE,
}

export interface ISliders {
  url: string;
}

// 列表数组对象中的属性
export interface ILesson {
  id: string;
  category: number;
  categoryName: string;
  url: string;
  hasMore: boolean;
  price: number;
  title: string;
}

export interface IHomeMainData {
  id: string;
  hasMore: boolean; // 更多
  isLoading: boolean; // 加载？
  offset: number; //位置
  limit: number; // 页条数
  list: Array<ILesson>; // 列表
}

// home state 中的数据
export interface IHomeState {
  currentCategory: CATEGORY_TYPES;
  sliders: ISliders[];
  lessons: IHomeMainData;
}
