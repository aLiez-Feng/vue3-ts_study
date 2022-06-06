// 泛型
// 想创建一个数组
// 用来在代码执行时，传入的类型来确定结果
function createArr<T>(len: number, val: T): T[] {
  //: T[]表示当前函数返回的是一个T 类型的数组
  let result = [];
  for (let i = 0; i < len; i++) {
    result.push(val);
  }
  return result;
}

let arr1 = createArr(10, "aaa"); //自动推导
let arr2 = createArr<number>(10, 1); //传入泛型，将决定之后这个函数返回的必定是一个 数字类型数组

console.log(arr1);
// 多个泛型 泛型交换
const swap = <T, K>(tuple: [T, K]): [K, T] => {
  return [tuple[1], tuple[0]];
};

let result = swap<number, number>([1, 2]);
console.log("swap", result);
