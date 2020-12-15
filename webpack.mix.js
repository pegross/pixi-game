const mix = require('laravel-mix');

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

