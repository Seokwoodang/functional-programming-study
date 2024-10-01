// ## 기존과 달라진 ES6에서의 리스트 순회
// - for i++
// - for of

// ES5 에서의 순회
// const list = [1, 2, 3];
// for (var i = 0; i < list.length; i++) {
//   console.log(list[i]);
// }
// const str = "abc";
// for (var i = 0; i < str.length; i++) {
//   console.log(str[i]);
// }

// // ES6 에서의 순회
// for (const a of list) {
//   console.log(a);
// }
// for (const a of str) {
//   console.log(a);
// }

// ## 이터러블/이터레이터 프로토콜
// - 이터러블: 이터레이터를 리턴하는 [Symbol.iterator]() 를 가진 값
// - 이터레이터: { value, done } 객체를 리턴하는 next() 를 가진 값
// - 이터러블/이터레이터 프로토콜: 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록한 규약

// ### Array를 통해 알아보기

// console.log("Arr -----------");
// const arr = [1, 2, 3];
// console.log(arr[Symbol.iterator]); // f values() { [native code] }

// /**
//  * iterator를 null로 바꿔버리면 for of문을 사용할 수 없다.
//  * TypeError: arr is not iterable
//  */
// // arr[Symbol.iterator] = null;
// for (const a of arr) console.log(a);

// let iter1 = arr[Symbol.iterator]();
// console.log(iter1.next()); // {value: 1, done: false}
// for (const a of iter1) console.log(a); // 2 3

// // ### Set을 통해 알아보기

// console.log("Set -----------");
// const set = new Set([1, 2, 3]);
// /**
//  * index로 접근은 불가는 하나 for문을 통해 순회는 가능
//  * for문을 통해 순회할 때는 Symbol.iterator를 통해 순회
//  */
// console.log(set[0], set[1], set[2]); // undefined undefined undefined
// for (const a of set) console.log(a); // 1 2 3

// ### Map을 통해 알아보기

// console.log("Map -----------");
// const map = new Map([
//   ["a", 1],
//   ["b", 2],
//   ["c", 3],
// ]);
// for (const a of map.keys()) console.log(a); // a b c
// for (const a of map.values()) console.log(a); // 1 2 3
// for (const a of map.entries()) console.log(a); // ['a', 1] ['b', 2] ['c', 3]
// console.clear();

// ### 사용자 정의 이터러블을 통해 알아보기

const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i === 0 ? { done: true } : { value: i--, done: false };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  },
};

let iterator = iterable[Symbol.iterator]();
iterator.next();
for (a of iterator) console.log(a);
console.log(iterator === iterator[Symbol.iterator]()); // true => Symbol.iterator는 자기 자신을 return하기 때문

for (const a of document.querySelectorAll("*")) log(a); // 브라우저에서 사용되는 dom과 관련된 여러 값들도 이터레이터 프로토콜을 따르고 있다.
const all = document.querySelectorAll("*");
let iter3 = all[Symbol.iterator]();
log(iter3.next());
log(iter3.next());
log(iter3.next());
