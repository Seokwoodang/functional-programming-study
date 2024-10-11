const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    // 1번째 값으로 초기화
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};

// ## range

let add = (a, b) => a + b;

// const range = (l) => {
//   let i = -1;
//   let res = [];
//   while (++i < l) {
//     res.push(i);
//   }
//   return res;
// };

// let list = range(4);
// console.log(list);
// console.log(reduce(add, list));

// 느긋한 L.range
// generator로 생성된 함수로 순회를 시작하는 next()가 실행되어야 결과가 꺼내진다.

const L = {};
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

var list = L.range(4);
console.log(list);
console.log(reduce(add, list));
