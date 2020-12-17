'use strict';

module.exports = [
    {
        src: './resources/img/sprites/tiles/**/*.{png,gif,jpg}',
        destImage: './resources/generated/sprites/tiles.png',
        destCSS: './resources/generated/sprites/tiles.json',
        cssName: 'tiles.json',
        cssFormat: 'json',
        cssTemplate: require('spritesmith-texturepacker'),
        imgPath: '../sprites/tiles.png',
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
        cssTemplate: require('spritesmith-texturepacker'),
        imgPath: '../sprites/furniture.png',
        padding: 2,
        algorithm: 'top-down',
        algorithmOpts: {sort: false},
        engine: 'pixelsmith',
    },
    {
        src: './resources/img/sprites/cinematic/**/*.{png,gif,jpg}',
        destImage: './resources/generated/sprites/cinematic.png',
        destCSS: './resources/generated/sprites/cinematic.json',
        cssName: 'cinematic.json',
        cssFormat: 'json',
        cssTemplate: require('spritesmith-texturepacker'),
        imgPath: '../sprites/cinematic.png',
        padding: 2,
        algorithm: 'top-down',
        algorithmOpts: {sort: false},
        engine: 'pixelsmith',
    }
];

