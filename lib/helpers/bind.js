'use strict';

export default function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
//有意思的解释
//1.闭包
//2.原生的js 自带的bind 函数没法满足需求，他重写了一个 跟原生bind 效果一样
