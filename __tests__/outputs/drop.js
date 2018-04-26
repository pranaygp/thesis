
module.exports = n => (() => {
  let ret = ((_c4, _n4) => {
    let acc = _n4;

    for (let i = n; i >= 1; i--) {
      acc = _c4(i, acc);
    }

    return acc;
  })((_x, _y) => (_m) => _m ? _y(_m - 1) : ((_a4, _b4) => {
    return p => p(_a4, _b4);
  })(_x * _x + '', _y(_m)), () => ({
    __isNil: true
  }))(n - 10);

  const fst = x => x;

  const snd = (_, y) => y;

  const acc = [];

  while (ret && !ret.__isNil) {
    acc.push(ret(fst));
    ret = ret(snd);
  }

  return acc;
})();