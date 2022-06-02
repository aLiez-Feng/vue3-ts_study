// 函数主要考虑 函数的参数  函数的返回值
// 方式1
function testFn(a: number, b: number): number {
  return a + b;
}
testFn(1, 2);

// 方式2， 可以像普通数据类型一样直接冒号  (参数:类型,参数2:类型) => 返回值类型
let fun2: (a: string, b: string) => string = (a, b) => a + b;

fun2("哈哈", "嘻嘻");

// 方式3 （类型）
// 仅仅是一个别名，一般定义联合类型（ | 类型 ） ，在定义临时变量时，可以使用类型来定义函数参数返回值类型
type fun3type = ((a: number, b: number) => number) | string; //要么是一个函数类型，要么是一个字符串
let fun3: fun3type = (a, b) => a + b;
fun3(2, 3);
fun3 = "aaaaa"; //联合类型

// 方式4 （接口）
// 可以继承，可以被类来实现
interface fun4Interface {
  (a: number, b: number): number;
}
let fun4: fun4Interface = (a, b) => a + b;
