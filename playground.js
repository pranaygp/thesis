// Cons and Nil
const _c = (a, b) => [a, ...b]
const _n = []

// build and foldr
const build = f => f(_c, _n)
// const foldr = (k, z, xs) => xs.reduce((a, b) => k(b, a), z)
const foldr = (k, z, xs) => {
  if (xs.length === 0) {
    return z
  } else {
    return k(xs[0], foldr(k, z, xs.slice(1)))
  }
}

// producers
const from = (a, b) => build((c, n) => {
  const from_ = (a_, b_) => (c_, n_) => a_>b_ ? n_ : c_(a_, from_(a_+1, b_)(c_, n_))
  return from_(a, b)(c, n)
})
const upto = x => build((c, n) => {
  const from_ = (a_, b_) => (c_, n_) => a_>b_ ? n_ : c_(a_, from_(a_+1, b_)(c_, n_))
  return from_(1, x)(c, n)
})

// upto(n) |> map(x => x*x)  |> sum
// foldr] [build foldr] [build 
// [foldr build] [foldr build]


// consumers & producers
const map = (f, xs) => build((c, n) => foldr((a, b) => c(f(a), b), n, xs))
const filter = (f, xs) => build((c, n) => foldr((a, b) => f(a) ? c(a, b): b, n, xs))
const append = (xs, ys) => build((c, n) => foldr(c, foldr(c, n, ys), xs))
const join = xs => build((c, n) => foldr((x, y) => foldr(c, y, x), n, xs))

// consumers
const sum = xs => foldr((a, b) => a+b, 0, xs)
const stringify = xs => xs.join('')

// playground
let w = map(x => x*2, [1, 2, 3])
let x = filter(x => x%2 === 0, [1, 2, 3])
let y = append([1, 2, 3], [4, 5 ,6])
let z = join([[1, 2], [3, 4], [5, 6]])

let xw = (t, m) => filter(x => x < t, map(x => x*m, [1, 2, 3]))


console.log(w)
console.log(x)
console.log(y)
console.log(z)

console.log(xw(5, 2))

/**
 * Conversions
 */

 // build foldr c ->
 // We can remove the cons from this: build((_c, _n) => foldr((_a3, _b3) => _c({ val: _a3 * _a3 }.val + 1, _b3), _n, upto_n))
 // qualifiers:
 // build func returns a foldr call
 // foldr has nil as 2nd arg and first arg is a func that returns a call to cons
 // cons call shares same second arg as foldr param
((k, z, xs) => {
  let acc = [];
  let l = xs;
  for(let i = xs.length-1; i>=0; i--){
    // let y = first arg in c with substitutions ([foldr param 1] -> l[i], [foldr param 2] -> acc)
    acc.push(y)
  }
  return acc.reverse()
})()

// build f ->
// Just do a beta reduction

// foldr k z xs ->
((k, z, xs) => {
  let acc = z;
  let l = xs;
  for(let i = xs.length-1; i>=0; i--){
    acc = k(l[i], acc);
  }
  return acc;
})()

// list to cons
[1, 2, 3, 4] -> cons(1, cons(2, cons(3, cons(4, []))));
// const to list
cons(1, cons(2, cons(3, cons(4, [])))) -> [1, 2, 3, 4]

// ocaml example of final result
unlines ls = 
  foldr (\l b -> foldr (:) ('\n' : b) l) [ ] ls

// how about we convert the above to this?
unlines ls =
  (() => {
    const acc1 = [];
    for(const el1 in ls) {
      // acc1 := foldr (:) ('\n' : el1) acc1
      acc1 = (() => {
        const acc2 = ('\n' : el1);
        for(const el2 in ls) {
          // (:)
          acc2 = el2 : acc2
        }
        return acc2;
      })()
    }
    return acc1;
  })()

// or this?