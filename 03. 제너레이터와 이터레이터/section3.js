// # 제너레이터/이터레이터
// - 제너레이터: 이터레이터이자 이터러블을 생성하는 함수

// 제너레이터를 통해 어떤 값도 순회하게 만들 수 있음

// 문장을 통해 순회할 수 있는 값을
function* gen() {
  yield 1;
  yield 2;
  yield 3;
  return 100; // 리턴 값은 done이 true 가 되었을 때 value에 반환된다. 또한 return값은 순환에 포함되지 않는다.
}

let iter = gen();
console.log(iter[Symbol.iterator]() === iter);
iter.next();
iter.next();
iter.next();
iter.next();
for (a of iter) console.log(a);
