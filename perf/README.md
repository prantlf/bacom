# Benchmark Results

## Count Lines

    Counting lines in a string...
      by splitting x 2,201 ops/sec ±1.19% (92 runs sampled)
      by searching x 4,010 ops/sec ±0.98% (93 runs sampled)

## Minify CSS

| minifier | output css size | source map size | run time [ms] |
| -------- | ---------------:| ---------------:| -------------:|
|  despace |          164094 |               0 |      2379.397 |
|     nano |          162483 |          279795 |      3044.743 |
|    clean |          163824 |          287102 |      1620.173 |
|     csso |          161483 |          273104 |      1398.703 |
|  esbuild |          162200 |          339021 |      2072.450 |
|    crass |          158817 |               0 |      1148.339 |

**Note**: Minifiers with an empty source map do not support generating source maps.

## Minify HTML

| minifier      | output html size | run time [ms] |
| ------------- | ----------------:| -------------:|
|      htmlnano |           115648 |      1062.445 |
| html-minifier |           113277 |       134.702 |
