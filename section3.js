// # 제너레이터/이터레이터
// - 제너레이터: 이터레이터이자 이터러블을 생성하는 함수

// 제너레이터를 통해 어떤 값도 순회하게 만들 수 있음

function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

let iter = gen();
console.log(iter[Symbol.iterator]() === iter);
