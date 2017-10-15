const babel = require('babel-core');
const fs = require('fs');
const path = require('path');
const plugin = require('../');

const INPUTS_DIR = path.resolve(__dirname, 'inputs');
const STRIPPED_INPUTS_DIR = path.resolve(__dirname, 'strippedInputs');
const OUTPUTS_DIR = path.resolve(__dirname, 'outputs');

it('Compilations match snapshots', () => {
  let inputs = fetchFiles(INPUTS_DIR);
  inputs.forEach(({content}) => {
    const {code} = babel.transform(content, {plugins: [plugin]});
    expect(code).toMatchSnapshot();
  })
})

const strippedInputFiles = fs.readdirSync(STRIPPED_INPUTS_DIR);
strippedInputFiles.forEach(fName => {
  const inputFName = path.resolve(STRIPPED_INPUTS_DIR, fName);
  const outputFName = path.resolve(OUTPUTS_DIR, fName);
  const input = require(inputFName);
  const output = require(outputFName);

  it(fName + ' is functionally equivalent before and after compilation', () => {
    expect(input(200)).toEqual(output(200));
  })
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