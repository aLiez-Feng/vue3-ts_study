export enum CATEGORY_TYPES {
  ALL,
  REACT,
  VUE,
  NODE,
}

export interface ISliders {
  url: string;
}

export interface ILesson {
  title: string;
  video: string;
  poster: string;
  category?: string; //选填
}

export interface ILessons {
  hasMore: boolean; // 更多
  isLoading: boolean; // 加载？
  offset: number; //位置
  limit: number; // 页条数
  list: ILesson[]; // 列表
}

export interface IHomeState {
  currentCategory: CATEGORY_TYPES;
  sliders: ISliders[];
  lessons: ILessons;
}
