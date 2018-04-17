const fs = require('fs');
const path = require('path');
const Benchmark = require('benchmark');
const chalk = require('chalk')

const a = [];
const b = []

function reset(fn) {
  a.length = 0;
  b.length = 0;
  for (let i = 0; i < 1e5; i++){
    a.push(fn(i));
    b.push(fn(i));
  }
}

reset(i => i);
global.junk1 = 0;
global.junk2 = 0;

let suite = new Benchmark.Suite;
suite
  .add('loop before fusion', () => {
    for (let i = 0; i < a.length; i++)
      global.junk1 += (a[i] + 3);
    for (let i = 0; i < b.length; i++)
      global.junk2 += (b[i] + 4);
  })
  .add('loop after fusion', () => {
    for (let i = 0; i < a.length; i++) {
      global.junk1 += (a[i] + 3);
      global.junk2 += (b[i] + 4);
    }
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
    console.log(global.junk1)
    console.log(global.junk2)
    global.junk1 = 0;
    global.junk2 = 0;
  })
  .on('complete', function() {
    console.log('Fastest is ' + chalk.green(this.filter('fastest').map('name')));
  })

console.log('\nStarting benchmark test')

suite.run()

reset(i => ([i, i+1]));
global.junk = []

suite = new Benchmark.Suite;
suite
  .add('unzip before', () => {
    global.junk = [...global.junk, [a.map(x => x[0]), a.map(x => x[1])]]
  })
  .add('unzip after', () => {
    global.junk = [...global.junk, a.reduce(([fa, sa], [fv, sv]) => { fa.push(fv); sa.push(sv); return [fa, sa] },[[], []])]
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
    console.log(global.junk.length)
    global.junk.length = 0;
  })
  .on('complete', function() {
    console.log('Fastest is ' + chalk.green(this.filter('fastest').map('name')));
  })

console.log('\nStarting benchmark test')

suite.run()

global.junk = 0

suite = new Benchmark.Suite;
suite
  .add('before beta reduction', () => {
    const add = (x, y) => x + y
    const sub = (x, y) => add(x, -y)
    global.junk += sub(2, 1)
  })
  .add('after beta reduction', () => {
    const sub = (x, y) => x + (-y)
    global.junk += sub(2, 1)
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
    console.log(global.junk)
    global.junk = 0;
  })
  .on('complete', function() {
    console.log('Fastest is ' + chalk.green(this.filter('fastest').map('name')));
  })

console.log('\nStarting benchmark test')

suite.run()