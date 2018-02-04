const { foldr } = require('../../core');

module.exports = function (n) {
  let upto_n = [];
  for (let i = 0; i < n; i++) upto_n.push(i + 1);

  return ((() => {
    let _acc = [];

    for (let _i = upto_n.length - 1; _i >= 0; _i--) {
      _acc = ((([((upto_n[_i] * upto_n[_i]) + ''), ..._acc])));
    }

    return _acc;
  }));
};