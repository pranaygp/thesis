const template = require("babel-template");
const traverse = require ("@babel/traverse");
const t = require("babel-types");

module.exports = function () {
  return {
    visitor: {
      CallExpression(path) {
        const {node} = path;

        // build..._..._
        if(node.callee.type === 'Identifier' && node.callee.name === 'build' && node.arguments.length === 1 && node.arguments[0].type === '') {
          const g = node.arguments[0];

          // build...foldr..._
          if(g.type === 'ArrowFunctionExpression' && g.body.type === 'CallExpression' && g.body.callee.type === 'Identifier' && g.body.callee.name === 'foldr') {
            const foldrNode = g.body;
            const k = foldrNode.arguments[0];
            const z = foldrNode.arguments[1];
            const xs = foldrNode.arguments[2];
            
            // if z is not nil, return
            if(z.type !== 'Identifier' || z.name !== g.params[1].name) { return }

            // build...foldr...c
            if(k.type === 'ArrowFunctionExpression' && k.body.type === 'CallExpression' && k.body.callee.type === 'Identifier' && k.body.callee.name === g.params[0].name) {
              const consNode = k.body;
              const a = consNode.arguments[0];
              const b = consNode.arguments[1];
              
              // if b is not equal to the second param of foldr, return
              if(b.type !== 'Identifier' || b.name !== k.params[1].name) { return }

              
            }
          }

          
          // build...foldr
          // if(xs.type === 'CallExpression' && xs.callee.type === 'Identifier' && xs.callee.name === 'build') {

            // foldr(k, z, build(g)) -> g(k, z)
            // path.replaceWith(
            //   t.callExpression(g, [k, z])
            // )
          // }
        }
      },
    }
  };
};



const renameLogic = params => path => {
  params.forEach(p => path.scope.rename(p));
}
// Is this exhaustive?
const renameVisitor = params => ({
  ArrowFunctionExpression: renameLogic(params),
  FunctionExpression: renameLogic(params),
  FunctionDeclaration: renameLogic(params)
})

const reducerVisitor = paramMap => ({
  Identifier(path){
    const {node} = path;
    if(paramMap[node.name]) {
      path.replaceWith(paramMap[node.name]);
    }
  }
})