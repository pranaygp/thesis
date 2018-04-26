
module.exports = n => (() => {
  let ret = ((_c2, _n2) => {
    let acc = _n2;

    for (let i = n; i >= 1; i--) {
      acc = _c2(i, acc);
    }

    return acc;
  })((_x, _y) => (_m) => _m ? ((_a2, _b2) => {
    return p => p(_a2, _b2);
  })(_x, _y(_m - 1)) : {
    __isNil: true
  }, () => ({
    __isNil: true
  }))(10);

  const fst = x => x;

  const snd = (_, y) => y;

  const acc = [];

  while (ret && !ret.__isNil) {
    acc.push(ret(fst));
    ret = ret(snd);
  }

  return acc;
})();