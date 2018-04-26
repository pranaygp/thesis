const { stringify, } = require('deforest');

module.exports = n => stringify((() => {
  let ret = (_r = (_p) => ((_m) => _m ? (() => {
    let _acc = _r(_m - 1);

    const _l = String.fromCharCode(97) + '\n';

    for (let _i = _l.length - 1; _i >= 0; _i--) {
      _acc = ((_a3, _b3) => {
        return p => p(_a3, _b3);
      })(_l[_i], _acc);
    }

    return _acc;
  })() : {
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
})());