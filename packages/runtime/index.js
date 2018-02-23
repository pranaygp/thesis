const functionNames = [
  "map",
  "sum",
  "adjust",
  "upto",
  "take",
  "repeat",
  "drop",
  "from",
  "join"
]

// Construct a map with dummy methods
const functionMap = {
}
functionNames.forEach(name => {
  functionMap[name] = () => {throw Error(`Function '${name}' from the 'deforest' library should not be called at runtime. Please set up babel-plugin-deforest to extract and optimize your code. Read more at https://github.com/pranaygp/deforest`)};
})

// Convert an array of chars to a string
const stringify = xs => xs.join('')

module.exports = {
  stringify,
  ...functionMap
}