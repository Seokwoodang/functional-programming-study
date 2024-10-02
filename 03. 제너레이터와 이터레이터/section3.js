// # 제너레이터/이터레이터
// - 제너레이터: 이터레이터이자 이터러블을 생성하는 함수

// 제너레이터를 통해 어떤 값도 순회하게 만들 수 있음

// 문장을 통해 순회할 수 있는 값을
// function* gen() {
//   yield 1;
//   yield 2;
//   yield 3;
//   return 100; // 리턴 값은 done이 true 가 되었을 때 value에 반환된다. 또한 return값은 순환에 포함되지 않는다.
// }

// let iter = gen();
// console.log(iter[Symbol.iterator]() === iter);
// iter.next();
// iter.next();
// iter.next();
// iter.next();
// for (a of iter) console.log(a);

function* infinity(i = 0) {
  while (true) yield i++;
}

// # odd 제너레이터
// function* odd(l) {
//   for (let i = 0; i < l; i++) {
//     if (i % 2) {
//       yield i;
//     }
//   }
// }
// let iter1 = odd(5);
// console.log(iter2.next());
// console.log(iter2.next());
// console.log(iter2.next());

// # limit을 이용한 odd 제너레이터
// function* odd(l) {
//   for (const a of infinity(l)) {
//     if (a % 2) yield a;
// if (a === l) return;
//   }
// }

// let iter2 = odd(10);

function* limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (a === l) return;
  }
}

function* odds(l) {
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
  }
}

let iter2 = odds(40);

// console.log(iter2.next());
// console.log(iter2.next());
// console.log(iter2.next());
// console.log(iter2.next());
// console.log(iter2.next());
// console.log(iter2.next());
// console.log(iter2.next());
// console.log(iter2.next());
// console.log(iter2.next());
// console.log(iter2.next());

for (const a of iter2) console.log(a);

// limit
