class Iterator {}

Array.prototype.toIter = function() {
    let nextIndex = 0;
    const it = new Iterator();
    it.next = () => nextIndex < this.length ?
        {value: this[nextIndex++], done: false} : {done: true}
    return it;
}

Iterator.prototype.map = function(f) {
    const it = new Iterator();
    it.next = () => {
        const maybeVal = this.next();
        if (maybeVal.done) return {done: true};
        return {value: f(maybeVal.value), done: false};
    }
    return it;
}

Iterator.prototype.filter = function(f) {
    const it = new Iterator();
    it.next = () => {
        while (true) {
            const maybeVal = this.next();
            if (maybeVal.done) return {done: true};
            if (!f(maybeVal.value)) continue;
            return {value: maybeVal.value, done: false};
        }
    }
    return it;
}

Iterator.prototype.collect = function() {
    let ret = [];
    while (true) {
        const maybeVal = this.next();
        if (maybeVal.done) break;
        ret.push(maybeVal.value);
    }
    return ret;
}

const toIterExample = () => {
    let xs   = Array.from(new Array(10), (x, i) => i + 1);
    let xsIt = xs.toIter();

    while (true) {
        let maybeVal = xsIt.next();
        if (maybeVal.done) break;
        console.log(maybeVal.value);
    }
}

const mapCollectExample = () => {
    let xs = Array.from(new Array(10), (x, i) => i + 1);

    let myIt = xs.toIter()
        .map(x => x*x)
        .filter(x => x % 2 == 0)
        .map(x => x*x)
        .filter(x => x % 2 == 0)
        .map(x => x*x)
        .filter(x => x % 2 == 0)
        .collect();
}

module.exports.default = Iterator;
