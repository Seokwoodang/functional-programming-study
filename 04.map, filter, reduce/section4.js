// # map

// const products = [
//   { name: "반팔티", price: 15000 },
//   { name: "긴팔티", price: 20000 },
//   { name: "핸드폰케이스", price: 15000 },
//   { name: "후드티", price: 30000 },
//   { name: "바지", price: 25000 },
// ];

// const map = (f, iter) => {
//   let res = [];
//   for (const a of iter) {
//     res.push(f(a));
//   }
//   return res;
// };

// console.log(map((p) => p.name, products));

// # 이터러블 프로토콜을 따른 map의 다형성

console.log([1, 2, 3].map((a) => a + 1)); // [2,3,4]

// document.querySelectorAll('*').map(el => el.nodeName); // Error
// console.log(document.querySelectorAll('*').map); // undefined => 순회 가능할 것 같으나 querySelectorAll에 map 메서드가 없음

const it = document.querySelectorAll("*")[Symbol.iterator]();
console.log(it); // ArrayIterator{}

// document.querySelectorAll('*')는 이터러블 프로토콜을 따르고 있고,
// 위에서 생성한 map 함수는 이터러블 프로토콜을 따르는 for-of 구문을 사용하기 때문에 순회 가능

console.log(map((el) => el.nodeName, document.querySelectorAll("*"))); // ['HTML', 'HEAD', 'META', ...]

function* gen() {
  yield 2;
  if (false) yield 3;
  yield 4;
}

log(map((a) => a * a, gen())); // [4, 16]
