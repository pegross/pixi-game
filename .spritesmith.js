'use strict';

module.exports = {
    src: './resources/img/sprites/tiles/**/*.{png,gif,jpg}',
    destImage: './resources/generated/sprites/tiles.png',
    destCSS: './resources/generated/tiles.json',
    cssName: 'tiles.json',
    cssFormat: 'json',
    imgPath: '../img/tiles.png',
    padding: 2,
    algorithm: 'top-down',
    algorithmOpts: {sort: false},
    engine: 'pixelsmith',
};

