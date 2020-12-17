const mix = require('laravel-mix');

mix.ts('src/main.ts', 'public/assets/js/').sourceMaps();
mix.copy('resources/generated/sprites', 'public/assets/sprites');

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

