const babel = require('babel-core');
const plugin = require('../');

// example from http://homepages.inf.ed.ac.uk/wadler/papers/deforest/deforest.ps
var example = `
const n = 1000;
let upto_n = [];
for (let i = 0; i < n; i++) upto_n.push(i+1);

upto_n
  .typedMap(n => n*n, 'a', 'a')             // [a] -> [a] 
  .typedMap(n => n + '', 'a', 'b')          // [a] -> [b]
  .typedReduce((p, c) => p+c, 0, 'a', 'a')  // [a], a -> a
`;

it('works', () => {
  const {code} = babel.transform(example, {plugins: [plugin]});
  expect(code).toMatchSnapshot();
});