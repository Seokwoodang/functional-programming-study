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
