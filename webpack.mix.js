const mix = require('laravel-mix');
const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');

mix.ts('src/main.ts', 'public/assets/js/');

mix.browserSync({
    proxy: false,
    files: [
        'public/assets/js/main.js'
    ],
    watch: true,
    port: '3030',
    server: {
        baseDir: 'public'
    }
});

// mix.webpackConfig({
//     module: {
//         rules: [
//             {test: /\.styl$/, use: [
//                     'style-loader',
//                     'css-loader',
//                     'stylus-loader'
//                 ]},
//             {test: /\.png$/, use: [
//                     'file-loader?name=i/[hash].[ext]'
//                 ]}
//         ]
//     },
//     resolve: {
//         modules: ["node_modules", "spritesmith-generated"]
//     },
//     plugins: [
//         new SpritesmithPlugin({
//             src: {
//                 cwd: path.resolve(__dirname, 'resources/img/sprites/tiles/'),
//                 glob: '*.png'
//             },
//             target: {
//                 image: path.resolve(__dirname, 'public/assets/img/tiles.png'),
//                 css: path.resolve(__dirname, 'resources/sass/sprites/tiles.sass')
//             },
//             apiOptions: {
//                 cssImageRef: "../tiles.png"
//             }
//         })
//     ]
// });
