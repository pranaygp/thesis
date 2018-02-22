//TODO: fix test runner

const babel = require('babel-core');
const fs = require('fs');
const path = require('path');
// const plugin = require('../packages/babel-plugin/');

const INPUTS_DIR = path.resolve(__dirname, 'inputs');
const OUTPUTS_DIR = path.resolve(__dirname, 'outputs');

const inputFiles = fetchFiles(INPUTS_DIR);

// it('Compilations match snapshots', () => {
//   inputFiles.forEach(({content}) => {
//     console.log(content);
//     const {code} = babel.transform(content, {plugins: [plugin]});
//     expect(code).toMatchSnapshot();
//   })
// })

inputFiles.forEach(({name}) => {
  const inputFile = path.resolve(INPUTS_DIR, name);
  const outputFile = path.resolve(OUTPUTS_DIR, name);
  const input = require(inputFile);
  const output = require(outputFile);

  it(name + ' is functionally equivalent before and after compilation', () => {
    expect(output(10)).toEqual(input(10));
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