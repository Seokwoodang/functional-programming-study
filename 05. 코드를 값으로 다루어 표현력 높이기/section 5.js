const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

const add = (a, b) => a + b;

// 읽기 힘듦
console.log(
  reduce(
    add,
    map(
      (p) => p.price,
      filter((p) => p.price < 20000, products)
    )
  )
);

// # 코드를 값으로 다루어 표현력 높이기

// ## go, pipe

// 첫번째 인자를 그 다음 인자인 함수에 적용하여 값을 반환하는 과정을 반복
const go = (...args) => reduce((a, f) => f(a), args);

// 함수를 reudce로 연속적으로 실행, pipe는 함수를 return
const pipe =
  (f, ...fs) =>
  (...as) =>
    go(f(...as), ...fs);

go(
  add(0, 1), // 1
  (a) => a + 10, // 11
  (a) => a + 100, // 111
  console.log
);
// 111

const f = pipe(
  (a, b) => a + b,
  (a) => a + 10,
  (a) => a + 100
);

console.log(f(0, 1)); // 111

go(
  products,
  (products) => filter((p) => p.price < 20000, products), // 20000 미만인 상품들
  (products) => map((p) => p.price, products), // 20000 미만인 상품들의 가격
  (prices) => reduce(add, prices), // 20000 미만인 상품들의 가격 총합
  log
);

// 함수를 받아 함수를 리턴한다. 받아둔 함수가 두개라면 즉시 실행, 아니라면 추가적으로 받았을 때 실행해준다.
const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

const mult = curry((a, b) => a * b);

console.log(mult(2)); // (..._) => f(a, ..._) => 나머지 인자를 더 전달했을 때, 함수에게 받어두둔 인자와 함께 실행
console.log(mult(1)(2)); // 2

const mult3 = mult(3); // 첫 인자가 3으로 고정된 mult 함수
console.log(mult3(10)); // 30
console.log(mult3(5)); // 15
console.log(mult3(3)); // 9

// curry 를 사용할 경우 map, filter, reduce 를 전부 curry 로 선언해준 뒤에 아래와 같이 작성할 수 있다.
go(
  products,
  (products) => filter((p) => p.price < 20000)(products),
  (products) => map((p) => p.price)(products),
  (products) => reduce(add)(products),
  console.log
);
// 또 아래와 같이 다시 한번 줄일 수 있다.
go(
  products,
  filter((p) => p.price < 20000),
  map((p) => p.price),
  reduce(add),
  console.log
);
