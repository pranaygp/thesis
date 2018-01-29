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

module.exports = {
  _c,
  _n,
  build,
  foldr
}