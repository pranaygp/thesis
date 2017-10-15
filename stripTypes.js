module.exports = {
  CallExpression(path) {
    let {node} = path;
    if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier") {
      switch(node.callee.property.name) {
        case 'typedMap':
          node.callee.property.name = 'map';
          node.arguments = [node.arguments[0]];
          break;
        case 'typedReduce':
          node.callee.property.name = 'reduce';
          node.arguments = [node.arguments[0], node.arguments[1]];
          break;
      }
    }
  }
}