# Benchmark Results

## Count Lines

    Counting lines in a string...
      by splitting x 2,262 ops/sec ±6.24% (88 runs sampled)
      by searching x 4,323 ops/sec ±6.46% (85 runs sampled)

## Minify CSS

| minifier | output css size | source map size | run time [ms] |
| -------- | ---------------:| ---------------:| -------------:|
|  despace |          164094 |               0 |      1916.871 |
|     nano |          162285 |          279406 |      2511.531 |
|    clean |          163824 |          287102 |      1440.927 |
|     csso |          161483 |          273104 |      1241.457 |
|  esbuild |          163143 |          256304 |      1591.319 |
|    crass |          158817 |               0 |       967.721 |

**Note**: Minifiers with an empty source map do not support generating source maps.

## Minify HTML

| minifier      | output html size | run time [ms] |
| ------------- | ----------------:| -------------:|
|      htmlnano |           115115 |       858.905 |
| html-minifier |           113277 |       142.990 |
