
module.exports = n => (() => {
  let ret = ((_c, _n) => {
    let acc = _n;

    for (let i = (_r = (_p2) => ((_m) => _m ? 1 + _r(_m - 1) : 0)(_p2))(n); i >= 1; i--) {
      acc = _c(i, acc);
    }

    return acc;
  })((_a3, _b3) => {
    return p => p(_a3, _b3);
  }, {
    __isNil: true
  });

  const fst = x => x;

  const snd = (_, y) => y;

  const acc = [];

  while (ret && !ret.__isNil) {
    acc.push(ret(fst));
    ret = ret(snd);
  }

  return acc;
})();


