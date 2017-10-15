const Benchmark = require('benchmark');

let suite = new Benchmark.Suite;

const n = 1000;

suite
  .add('sum (map square (upto 1 n))',  function() {
    let upto_n = [];
    for (let i = 0; i < n; i++) upto_n.push(i+1);

    upto_n
      .map(n => Math.pow(n, 2))
      .reduce((p, c) => p+c, 0)
  })
  .add('recursive call (from Wadler\'s deforestation paper)', function() {
    function h (a, m, n) {
      if (m > n) 
        return a
      else
        return h (a + Math.pow(n, 2), m+1, n);
    }
    h(0, 1, n)
  })
  .add('simple for loop', function() {
    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum += Math.pow(i+1, 2);
    }
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ 'async': true });