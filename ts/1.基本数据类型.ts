// 请配合 npm i ts-node -g  + code runner 进行

// ts 冒号后面的都是类型
const str: string = "";
const num: number = 1;
const bon: boolean = true;

// 联合类型
let age: number | string = "1";
age = 1;

// 数组
let arr: number[] = [1, 2];
// arr.push("1"); //报错
arr.push(3);

// 元祖
// 不允许在规定外的数组长度，以及规定的索引位数据类型
let tuple: [number, object] = [1, {}];

let n: null = null;
let u: undefined = undefined;

// 枚举
enum USER_ROLE {
  TEST, // 默认枚举值为 数字
  USER = "user", // 指定对应的枚举值
  MANAGER = "manager",
  ADMIN = "admin",
}

console.log(USER_ROLE.USER);
console.log(USER_ROLE.TEST);

// any 不写默认为any
let array = [1, 2, "", {}, []];

/*
  非原始数据类型
*/
// object
let create = (obj: object) => {};
create({});
create([]);
create(function () {});


// 对象

