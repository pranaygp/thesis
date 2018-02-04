const t = require("babel-types");

module.exports = function () {
  return {
    visitor: {
      CallExpression(path) {
        const {node} = path;

        // arrow function call
        if(node.callee.type === 'ArrowFunctionExpression' && node.callee.body.type !== 'BlockStatement') {
          let params = node.callee.params;
          const args = node.arguments;
          const body = node.callee.body;

          // We're only dealing with identifier args (ignore desructuring) since that's all our library will ever create
          // everything else is out of scope
          if(params.some(p => p.type !== 'Identifier')){
            return;
          }

          path.traverse(renameVisitor(params.map(p => p.name)));
          
          // We just renamed the params, so we update it
          params = node.callee.params;

          const paramMap = params.reduce((r, p, i) => { r[p.name] = args[i]; return r } , {});
          path.traverse(reducerVisitor(paramMap));
          
          path.replaceWith(body);
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