# Rewrite rules

- [x] "map/map"    -> forall f g xs. xs.map(f).map(g) = xs.map(_ => g(f(_)))

- [ ] "map/reduce" -> forall f g a xs. xs.map(f).reduce(g, a) = ...

# Benchmark tests

```
Starting small test suite (n = 10)
simple_map_map before x 1,207,933 ops/sec ±0.70% (89 runs sampled)
simple_map_map after transform x 1,392,790 ops/sec ±0.64% (91 runs sampled)
Fastest is simple_map_map after transform

Starting medium test suite (n = 200)
simple_map_map before x 88,580 ops/sec ±1.07% (83 runs sampled)
simple_map_map after transform x 101,507 ops/sec ±1.27% (86 runs sampled)
Fastest is simple_map_map after transform

Starting large test suite (n = 1000)
simple_map_map before x 14,561 ops/sec ±1.65% (85 runs sampled)
simple_map_map after transform x 14,759 ops/sec ±1.77% (85 runs sampled)
Fastest is simple_map_map after transform

Starting map_map_map test suite (n = 200)
simple_map_map_map before x 68,221 ops/sec ±0.67% (89 runs sampled)
simple_map_map_map after transform x 31,319 ops/sec ±0.83% (85 runs sampled)
Fastest is simple_map_map_map before
```