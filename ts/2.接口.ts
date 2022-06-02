// 用来描述对象形状的
interface ISchool {
  readonly name: string; // 只读属性
  age: number;
  address: string;
  other?: string; // 可选属性
}

let school: ISchool = {
  name: "test",
  age: 1,
  address: "",
};

// school.name = "" //报错

// 接口扩展
interface IOtherSchool extends ISchool {
  testParam: string;
  [key: string]: any; // 表示IOtherSchool 这个接口支持添加其他属性，key必须是string类型， 值可以是任意类型
}

let newSchool: IOtherSchool = {
  ...school,
  testParam: "test",
  haha: "dasdsa",
};

// 问题： 在IOtherSchool 这个接口中已经继承了ISchool 这个接口。
// 而 Ischool 这个接口没有设置 [key: string]: any;   又想加一些新的字段
// 使用类型断言：
let newSchool2: ISchool = {
  name: "1",
  age: 2,
  address: "111",
  asfhfgbah: "afagha",
} as ISchool;
