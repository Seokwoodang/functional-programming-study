// const reduce = (f, acc, iter) => {
//   if (!iter) {
//     iter = acc[Symbol.iterator]();
//     // 1번째 값으로 초기화
//     acc = iter.next().value;
//   }
//   for (const a of iter) {
//     acc = f(acc, a);
//   }
//   return acc;
// };

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

// const L = {};
// L.range = function* (l) {
//   let i = -1;
//   while (++i < l) {
//     yield i;
//   }
// };

// var list = L.range(4);
// console.log(list);
// console.log(reduce(add, list));

// ## take

// const curry =
//   (f) =>
//   (a, ..._) =>
//     _.length ? f(a, ..._) : (..._) => f(a, ..._);

// const take = curry((l, iter) => {
//   let res = [];
//   for (const a of iter) {
//     res.push(a);
//     if (res.length == l) return res;
//   }
//   return res;
// });
// console.time("");
// go(range(10000), take(5), reduce(add), log);
// console.timeEnd("");

// console.time("");
// go(L.range(10000), take(5), reduce(add), log);
// console.timeEnd("");

//  ### range, map, filter, take, reduce 중첩 사용

const range = (l) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

const map = curry((f, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (f(a)) res.push(a);
  }
  return res;
});

const take = curry((l, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(a);
    if (res.length == l) return res;
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    acc = f(acc, a);
  }
  return acc;
});

// ### L.range, L.map, L.filter, take, reduce 중첩 사용

L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

L.map = curry(function* (f, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    yield f(a);
  }
});

L.filter = curry(function* (f, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (f(a)) {
      yield a;
    }
  }
});

// ### map, filter 계열 함수들이 가지는 결합 법칙

// - 사용하는 데이터가 무엇이든지
// - 사용하는 보조 함수가 순수 함수라면 무엇이든지
// - 아래와 같이 결합한다면 둘 다 결과가 같다.

// [[mapping, mapping], [filtering, filtering], [mapping, mapping]]
// =
// [[mapping, filtering, mapping], [mapping, filtering, mapping]]
