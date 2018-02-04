const _c = (a, b) => [a, ...b]
const _n = []

// build and foldr
const build = f => f(_c, _n)

// const foldr = (k, z, xs) => xs.reduce((a, b) => k(b, a), z)
// foldr k z xs ->
// (() => {
//   const acc = z;
//   for(let i = xs.length-1; i>=0; i--){
//     acc = k(x, acc);
//   }
//   return acc;
// })()
const foldr = (k, z, xs) => {
  let acc = z;
  for(let i = xs.length-1; i>=0; i--){
    acc = k(xs[i], acc);
  }
  return acc;
}

// Convert an array of chars to a string
const stringify = xs => xs.join('')

module.exports = {
  _c,
  _n,
  build,
  foldr,
  stringify
}