
module.exports = n => (() => {
  let ret = (_r = (_p) => ((_m) => _m ? ((_a, _b) => {
    return p => p(_a, _b);
  })(42, _r(_m - 1)) : {
    __isNil: true
  })(_p))(n);

  const fst = x => x;

  const snd = (_, y) => y;

  const acc = [];

  while (ret && !ret.__isNil) {
    acc.push(ret(fst));
    ret = ret(snd);
  }

  return acc;
})();