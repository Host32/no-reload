/*global require, console,  process*/
(function () {
    'use strict';

    var gulp = require('gulp'),
        qunit = require('gulp-qunit'),
        jshint = require('gulp-jshint');

    gulp.task('watch-test', function () {
        return gulp.src('test/index.html')
            .pipe(qunit());
    });

    gulp.task('watch-jshint', function () {
        return gulp.src('src/**/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'));
    });

    gulp.task('watch', function () {
        gulp.watch('test/**/*', ['watch-test']);

        gulp.watch('src/**/*', ['watch-jshint']);
    });

}());
