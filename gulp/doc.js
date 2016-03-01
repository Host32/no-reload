/*global require, console,  process*/
(function () {
    'use strict';

    var gulp = require('gulp'),
        clean = require('gulp-rimraf'),
        jsdoc = require('gulp-jsdoc3');

    gulp.task('clean-doc', function () {
        return gulp.src('docs/', {
            read: false
        }).pipe(clean());
    });

    gulp.task('doc', ['clean-doc'], function () {
        gulp.src(['README.md', './src/**/*.js'], {
            read: false
        }).pipe(jsdoc());
    });
}());
