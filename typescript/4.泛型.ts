// 泛型
// 想创建一个数组

function createArr<T>(len, val: T): T[] {
  //: T[]表示当前函数返回的是一个T 类型的数组
  let result = [];
  for (let i = 0; i < len; i++) {
    result.push(val);
  }
  return result;
}

let arr1 = createArr(10, "aaa"); //自动推导
let arr2 = createArr<number>(10, 1); //传入泛型，将决定之后这个函数返回的必定是一个 数字类型数组
