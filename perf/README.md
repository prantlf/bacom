# Benchmark Results

## Count Lines

    Counting lines in a string...
      by splitting x 2,341 ops/sec ±1.46% (90 runs sampled)
      by searching x 4,275 ops/sec ±0.77% (90 runs sampled)

## Minify CSS

| minifier | output css size | source map size | run time [ms] |
| -------- | ---------------:| ---------------:| -------------:|
|  despace |          164094 |               0 |      2356.410 |
|     nano |          162285 |          279404 |      3086.176 |
|    clean |          163824 |          287100 |      1618.117 |
|     csso |          161483 |          273102 |      1393.009 |
|  esbuild |          163143 |          256302 |      1866.984 |
|    crass |          158817 |               0 |      1092.888 |

**Note**: Minifiers with an empty source map do not support generating source maps.
