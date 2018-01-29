const { build, foldr } = require('../../core');

module.exports = ls => build((_c, _n) => ((_c2, _n2) => foldr((_a, _b) => _c2((l => l + '\n')(_a), _b), _n2, ls))((_x, _y) => foldr(_c, _y, _x), _n));