const babel = require('babel-core');
const fs = require('fs');
const path = require('path');
const plugin = require('../');

// TODO: can we automate these from the paths (alternatively, use an index.js file)
const simpleMapMapInput = require('./strippedInputs/simple_map_map');
const simpleMapMapOutput = require('./outputs/simple_map_map');

const INPUTS_DIR = path.resolve(__dirname, 'inputs');

it('Compilations match snapshots', () => {
  let inputs = fetchFiles(INPUTS_DIR);
  inputs.forEach(({content}) => {
    const {code} = babel.transform(content, {plugins: [plugin]});
    expect(code).toMatchSnapshot();
  })
})

it('has the same behaviour on simple_map_map', () => {
  expect(simpleMapMapInput(10)).toEqual(simpleMapMapOutput(10));
  expect(simpleMapMapInput(100)).toEqual(simpleMapMapOutput(100));
})

function fetchFiles(dir) {
  return fs
          .readdirSync(dir)
          .map(name => (
            {
              name,
              content: fs.readFileSync(path.resolve(dir, name), 'utf8')
            }
          ))
}