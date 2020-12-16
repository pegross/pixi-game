'use strict';

module.exports = [
    {
        src: './resources/img/sprites/tiles/**/*.{png,gif,jpg}',
        destImage: './resources/generated/sprites/tiles.png',
        destCSS: './resources/generated/sprites/tiles.json',
        cssName: 'tiles.json',
        cssFormat: 'json',
        imgPath: '../img/tiles.png',
        padding: 2,
        algorithm: 'top-down',
        algorithmOpts: {sort: false},
        engine: 'pixelsmith',
    },
    {
        src: './resources/img/sprites/furniture/**/*.{png,gif,jpg}',
        destImage: './resources/generated/sprites/furniture.png',
        destCSS: './resources/generated/sprites/furniture.json',
        cssName: 'furniture.json',
        cssFormat: 'json',
        imgPath: '../img/furniture.png',
        padding: 2,
        algorithm: 'top-down',
        algorithmOpts: {sort: false},
        engine: 'pixelsmith',
    }
];

