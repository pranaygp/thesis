// const test = require('./__tests__/outputs/from_map')
// const test = require('./__tests__/outputs/simple_map_map')
// const test = require('./__tests__/outputs/simple_map_map_map')
// const test = require('./__tests__/outputs/take')
// const test = require('./__tests__/outputs/drop')
// const test = require('./__tests__/outputs/repeat')
// const test = require('./__tests__/outputs/sum_repeat')
// const test = require('./__tests__/outputs/adjust')
// const test = require('./__tests__/outputs/wadler_map_reduce')
// const test = require('./__tests__/outputs/unlines')
// const test = require('./__tests__/inputs/from_take')
// const test = require('./__tests__/outputs/double_diamond.js')


const mockery = require('mockery');

const deforestMock = require('./__mocks__/deforest');
mockery.registerMock('deforest', deforestMock);
mockery.enable({
  useCleanCache: true
});

// const test = require('./__tests__/inputs/wadler_map_reduce')
const test = require('./__tests__/outputs/wadler_map_reduce')

// const test = require('./__tests__/inputs/sum_repeat')
// const test = require('./__tests__/outputs/sum_repeat')

// const test = require('./__tests__/inputs/simple_map_map')
// const test = require('./__tests__/outputs/simple_map_map')


console.log(test(1e6))