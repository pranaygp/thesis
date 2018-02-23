const template = require("babel-template");
const t = require("babel-types");

module.exports = function () {
  return {
    visitor: {
      VariableDeclaration(path){
        path.traverse(deforestImportVisitor, { parent: path })
      },
      CallExpression(path) {
        let {node} = path;

        // map
        if(node.callee.type === 'Identifier' && node.callee.name === 'map') {
          const f = node.arguments[0];
          const xs = node.arguments[1];
          
          // const map = (f, xs) => build((c, n) => foldr((a, b) => c(f(a), b), n, xs))
          const c = path.scope.generateUidIdentifier('c');
          const n = path.scope.generateUidIdentifier('n');
          const a = path.scope.generateUidIdentifier('a');
          const b = path.scope.generateUidIdentifier('b');
          const map = template(`
            build((c, n) => foldr((a, b) => c(f(a), b), n, xs))
          `)
          path.replaceWith(map({
            c, n, a, b, f, xs
          }))
        }

        // from
        if(node.callee.type === 'Identifier' && node.callee.name === 'from') {
          const a = node.arguments[0];
          const b = node.arguments[1];
          
          // const from = (a, b) => build((c, n) => {
          //   const from_ = (a_, b_) => p => a_>b_ ? n : c(a_, (() => { const _fn = from_(a_+1, b_); _fn._isCons = true; return _fn;})() )(p)
          //   const fn = from_(a, b)
          //   fn._isCons = true
          //   return fn
          // })
          const c = path.scope.generateUidIdentifier('c');
          const n = path.scope.generateUidIdentifier('n');
          const a_ = path.scope.generateUidIdentifier('a');
          const b_ = path.scope.generateUidIdentifier('b');
          const p = path.scope.generateUidIdentifier('p');
          const from = template(`
            build((c, n) => {
              const from_ = (a_, b_) => p => a_>b_ ? n : c(a_, (() => { const _fn = from_(a_+1, b_); _fn._isCons = true; return _fn;})() )(p)
              const fn = from_(a, b)
              fn._isCons = true
              return fn
            })
          `)
          path.replaceWith(from({
            c, n, a_, b_, p, a, b,
          }))
        }

        // upto
        if(node.callee.type === 'Identifier' && node.callee.name === 'upto') {
          const x = node.arguments[0];
          
          // const upto = x => build((c, n) => {
          //   const from_ = (a_, b_) => p => a_>b_ ? n : c(a_, (() => { const _fn = from_(a_+1, b_); _fn._isCons = true; return _fn;})() )(p)
          //   const fn = from_(1, x)
          //   fn._isCons = true
          //   return fn
          // })
          const c = path.scope.generateUidIdentifier('c');
          const n = path.scope.generateUidIdentifier('n');
          const a_ = path.scope.generateUidIdentifier('a');
          const b_ = path.scope.generateUidIdentifier('b');
          const p = path.scope.generateUidIdentifier('p');
          const upto = template(`
            build((c, n) => {
              const from_ = (a_, b_) => p => a_>b_ ? n : c(a_, (() => { const _fn = from_(a_+1, b_); _fn._isCons = true; return _fn;})())(p)
              const fn = from_(1, x)
              fn._isCons = true
              return fn
            })
          `)
          path.replaceWith(upto({
            c, n, a_, b_, p, x
          }))
        }

        // repeat
        if(node.callee.type === 'Identifier' && node.callee.name === 'repeat') {
          const x = node.arguments[0];
          
          // const repeat = x => build((c, n) => {
          //   const r = p => c(x, r)(p);
          //   r._isCons = true;
          //   return r;
          // })
          const c = path.scope.generateUidIdentifier('c');
          const n = path.scope.generateUidIdentifier('n');
          const r = path.scope.generateUidIdentifier('r');
          const p = path.scope.generateUidIdentifier('p');
          const repeat = template(`
            build((c, n) => {
              const r = p => c(x, r)(p);
              r._isCons = true;
              return r;
            })
          `)
          path.replaceWith(repeat({
            c, n, r, p, x
          }))
        }

        // join
        if(node.callee.type === 'Identifier' && node.callee.name === 'join') {
          const xs = node.arguments[0];
          
          // const join = xs => build((c, n) => foldr((x, y) => foldr(c, y, x), n, xs))
          const c = path.scope.generateUidIdentifier('c');
          const n = path.scope.generateUidIdentifier('n');
          const x = path.scope.generateUidIdentifier('x');
          const y = path.scope.generateUidIdentifier('y');
          const join = template(`
            build((c, n) => foldr((x, y) => foldr(c, y, x), n, xs))
          `)
          path.replaceWith(join({
            c, n, x, y, xs
          }))
        }

        // sum
        if(node.callee.type === 'Identifier' && node.callee.name === 'sum') {
          const xs = node.arguments[0];
          
          // const sum = xs => foldr((a, b) => a+b, 0, xs)
          const a = path.scope.generateUidIdentifier('a');
          const b = path.scope.generateUidIdentifier('b');
          const sum = template(`
            foldr((a, b) => a+b, 0, xs)
          `)
          path.replaceWith(sum({
            a, b, xs
          }))
        }

        // take
        if(node.callee.type === 'Identifier' && node.callee.name === 'take') {
          const k = node.arguments[0];
          const xs = node.arguments[1];
          
          // const take = (k, xs) => build((c, n) => foldr((x, y) => m => m ? c(x, y(m-1)) : n, n, xs)(k))
          const c = path.scope.generateUidIdentifier('c');
          const n = path.scope.generateUidIdentifier('n');
          const x = path.scope.generateUidIdentifier('x');
          const y = path.scope.generateUidIdentifier('y');
          const m = path.scope.generateUidIdentifier('m');
          const take = template(`
            build((c, n) => foldr((x, y) => m => m ? c(x, y(m-1)) : n, () => n, xs)(k))
          `)
          path.replaceWith(take({
            c, n, x, y, m, k, xs
          }))
        }

        // drop
        if(node.callee.type === 'Identifier' && node.callee.name === 'drop') {
          const k = node.arguments[0];
          const xs = node.arguments[1];
          
          // const drop = (k, xs) => build((c, n) => foldr((x, y) => m => m ? y(m-1) : c(x, y(m)), n, xs)(k))
          const c = path.scope.generateUidIdentifier('c');
          const n = path.scope.generateUidIdentifier('n');
          const x = path.scope.generateUidIdentifier('x');
          const y = path.scope.generateUidIdentifier('y');
          const m = path.scope.generateUidIdentifier('m');
          const drop = template(`
            build((c, n) => foldr((x, y) => m => m ? y(m-1) : c(x, y(m)), () => n, xs)(k))
          `)
          path.replaceWith(drop({
            c, n, x, y, m, k, xs
          }))
        }
        
        // adjust
        if(node.callee.type === 'Identifier' && node.callee.name === 'adjust') {
          const f = node.arguments[0];
          const i = node.arguments[1];
          const xs = node.arguments[2];
          
          // const adjust = (f, i, xs) => build((c, n) => foldr((x, y) => m => m === 0 ? c(f(x), y(m-1)) : c(x, y(m-1)), () => n, xs)(i))
          const c = path.scope.generateUidIdentifier('c');
          const n = path.scope.generateUidIdentifier('n');
          const x = path.scope.generateUidIdentifier('x');
          const y = path.scope.generateUidIdentifier('y');
          const m = path.scope.generateUidIdentifier('m');
          const adjust = template(`
            build((c, n) => foldr((x, y) => m => m === 0 ? c(f(x), y(m-1)) : c(x, y(m-1)), () => n, xs)(i))
          `)
          path.replaceWith(adjust({
            c, n, x, y, m, f, i, xs
          }))
        }
      },
    }
  };
};

const deforestImportVisitor = {
  CallExpression(path){
    const {node} = path;
    if(node.callee.type === 'Identifier' && node.callee.name === 'require') {
      const dep = node.arguments[0];
      if(dep.type === 'StringLiteral' && dep.value === 'deforest') { //TODO: don't harcode 'deforest' here
        this.parent.remove();
      }
    }
  }
}