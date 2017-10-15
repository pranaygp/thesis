const Benchmark = require('benchmark');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const INPUTS_DIR = path.resolve(__dirname, '__tests__/inputs');
const STRIPPED_INPUTS_DIR = path.resolve(__dirname, '__tests__/strippedInputs');
const OUTPUTS_DIR = path.resolve(__dirname, '__tests__/outputs');

const strippedInputFiles = fs.readdirSync(STRIPPED_INPUTS_DIR);
strippedInputFiles.forEach(fName => {
  const inputFName = path.resolve(STRIPPED_INPUTS_DIR, fName);
  const outputFName = path.resolve(OUTPUTS_DIR, fName);
  const input = require(inputFName);
  const output = require(outputFName);

  const suite = new Benchmark.Suite;
  suite
    .add(fName + ' before', () => {
      input(200);
    })
    .add(fName + ' after', () => {
      output(200);
    })
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    .on('complete', function() {
      console.log('Fastest is ' + chalk.green(this.filter('fastest').map('name')));
    })

  console.log('\nStarting benchmark test for ' + fName)
    
  suite.run()
})