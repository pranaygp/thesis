// TODO: this file needs to be updated to benchmark the new version of the library

const fs = require('fs');
const path = require('path');
const Benchmark = require('benchmark');
const chalk = require('chalk');
const mockery = require('mockery');

const INPUTS_DIR = path.resolve(__dirname, '__tests__/inputs');
const OUTPUTS_DIR = path.resolve(__dirname, '__tests__/outputs');

const deforestMock = require('./__mocks__/deforest');
mockery.registerMock('deforest', deforestMock);

const args = process.argv.slice(2).map(a => a + '.js');
const inputFiles = args.length ? args : fs.readdirSync(INPUTS_DIR);

inputFiles.forEach(fName => {
  const inputFName = path.resolve(INPUTS_DIR, fName);
  const outputFName = path.resolve(OUTPUTS_DIR, fName);
  
  mockery.registerAllowable(inputFName);
  mockery.registerAllowable(outputFName);

  mockery.enable({
    useCleanCache: true
  });
  const input = require(inputFName);

  // mockery.deregisterMock('deforest');
  mockery.disable();
  const output = require(outputFName);
  
  let totalMemBefore = 0;
  let numBefore = 0;
  let totalMemAfter = 0;
  let numAfter = 0;

  const suite = new Benchmark.Suite;
  suite
    .add(fName + ' before', () => {
      // console.log(gc)
      // gc();
      // const baseMemUsage = process.memoryUsage();
      input(1e3);
      // const memoryUsage = process.memoryUsage();
      // totalMemBefore += memoryUsage.heapUsed - baseMemUsage.heapUsed;
      // numBefore++;
    })
    .add(fName + ' after', () => {
      // gc();
      // const baseMemUsage = process.memoryUsage();
      output(1e3);
      // const memoryUsage = process.memoryUsage();
      // totalMemAfter += memoryUsage.heapUsed - baseMemUsage.heapUsed;
      // numAfter++;
    })
    .on('cycle', function(event) {
      if (numBefore > 0) {
        const memUsage = Math.round(totalMemBefore/numBefore);
        totalMemBefore = 0;
        numBefore = 0;
        console.log("Avg. memory usage before: " + chalk.red("%d") + " bytes", memUsage);
      }

      if (numAfter > 0) {
        const memUsage = Math.round(totalMemAfter/numAfter);
        totalMemAfter = 0;
        numAfter = 0;
        console.log("Avg. memory usage after: " + chalk.red("%d") + " bytes", memUsage);
      }

      console.log(String(event.target));
    })
    .on('complete', function() {
      console.log('Fastest is ' + chalk.green(this.filter('fastest').map('name')));
      mockery.disable();
    })

  console.log('\nStarting benchmark test for ' + fName)
  
  suite.run()
})