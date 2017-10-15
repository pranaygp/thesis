const Benchmark = require('benchmark');

const simpleMapMapInput = require('./__tests__/strippedInputs/simple_map_map');
const simpleMapMapOutput = require('./__tests__/outputs/simple_map_map');

const simpleMapMapMapInput = require('./__tests__/strippedInputs/simple_map_map_map');
const simpleMapMapMapOutput = require('./__tests__/outputs/simple_map_map_map');

const smallSuite = new Benchmark.Suite;
smallSuite
  .add('simple_map_map before',  function() {
    simpleMapMapInput(10);
  })
  .add('simple_map_map after transform',  function() {
    simpleMapMapOutput(10);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
    console.log('\nStarting medium test suite (n = 200)');
    startMedSuite();
  })

function startSmallSuite(){ smallSuite.run({ 'async': true }); }

const medSuite = new Benchmark.Suite;
medSuite
  .add('simple_map_map before',  function() {
    simpleMapMapInput(200);
  })
  .add('simple_map_map after transform',  function() {
    simpleMapMapOutput(200);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
    console.log('\nStarting large test suite (n = 1000)');
    startLargeSuite();
  })

function startMedSuite(){ medSuite.run({ 'async': true }); }

const largeSuite = new Benchmark.Suite;
largeSuite
  .add('simple_map_map before',  function() {
    simpleMapMapInput(1000);
  })
  .add('simple_map_map after transform',  function() {
    simpleMapMapOutput(1000);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
    console.log('\nStarting map_map_map test suite (n = 200)');
    startMapMapMapSuite();
  })

function startLargeSuite(){ largeSuite.run({ 'async': true }); }

const mapMapMapSuite = new Benchmark.Suite;
mapMapMapSuite
  .add('simple_map_map_map before',  function() {
    simpleMapMapMapInput(200);
  })
  .add('simple_map_map_map after transform',  function() {
    simpleMapMapMapOutput(200);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })

function startMapMapMapSuite(){ mapMapMapSuite.run({ 'async': true }); }

console.log('Starting small test suite (n = 10)');
startSmallSuite();