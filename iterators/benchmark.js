const Benchmark = require('benchmark');
const chalk = require('chalk');
const Iterator = require('./.').default;

const PRODUCERS = {};
const CONSUMER_PRODUCERS = {
    'map': x => x + 100,
    'filter': x => x % 2 == 1,
};
const CONSUMERS = {
    'collect': undefined,
}

for (let fn in new Iterator()) {

  fn = String(fn);
  const suite = new Benchmark.Suite;

  if (fn in PRODUCERS) {

  } else if (fn in CONSUMER_PRODUCERS) {

    const XS_LENGTH = 1e7;
    const xs = Array.from(new Array(XS_LENGTH), (x, i) => i + 1);
    const arg = CONSUMER_PRODUCERS[fn];
    suite
      .add(fn + ' once', () => {
          if (arg)
              xs.toIter()[fn](arg).collect()
          else
              xs.toIter()[fn]().collect()
      })
      .add(fn + ' twice', () => {
          if (arg)
              xs.toIter()[fn](arg)[fn](arg).collect()
          else
              xs.toIter()[fn]()[fn]().collect()
      })
      .add(fn + ' 4-chain', () => {
          if (arg)
              xs.toIter()[fn](arg)[fn](arg)[fn](arg)[fn](arg).collect()
          else
              xs.toIter()[fn]()[fn]()[fn]()[fn]().collect()
      })
      .add(fn + ' 8-chain', () => {
          if (arg)
              xs.toIter()[fn](arg)[fn](arg)[fn](arg)[fn](arg)[fn](arg)[fn](arg)[fn](arg)[fn](arg).collect()
          else
              xs.toIter()[fn]()[fn]()[fn]()[fn]()[fn]()[fn]()[fn]()[fn]().collect()
      })
      .on('cycle', e => console.log(String(e.target)))

  } else if (fn in CONSUMERS) {

    const XS_LENGTH = 1e7;
    const xs = Array.from(new Array(XS_LENGTH), (x, i) => i + 1);
    suite
      .add(fn, () => {
          const arg = CONSUMERS[fn];
          if (arg)
              xs.toIter()[fn](arg)
          else
              xs.toIter()[fn]()
      })
      .on('cycle', e => console.log(String(e.target)))

  } else {
    console.log(
      'error: ' +
      fn +
      ' is not a producer, producer-consumer, or a consumer'
    );
    continue;
  }

  console.log('\nStarting benchmark test for ' + fn)

  suite.run()
}
