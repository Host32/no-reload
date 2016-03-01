/*global require, process*/
(function () {
    'use strict';

    var gulp = require('gulp'),
        gulpUtil = require('gulp-util'),
        concat = require('gulp-concat'),
        webpack = require('webpack-stream'),
        named = require('vinyl-named'),
        uglifycss = require('gulp-uglifycss'),
        uglify = require('gulp-uglify'),
        qunit = require('gulp-qunit'),
        jshint = require('gulp-jshint'),
        rename = require('gulp-rename'),
        map = require('map-stream'),

        exitOnJshintError = map(function (file, cb) {
            if (!file.jshint.success) {
                process.exit(1);
            }

            cb();
        });

    gulp.task('package-css', function () {
        return gulp.src('src/no-reload-test/**/*.css')
            .pipe(concat('no-reload-test.css'))
            .pipe(gulp.dest('dist/'));
    });

    gulp.task('css-min', ['package-css'], function () {
        gulp.src('dist/no-reload-test.css')
            .pipe(uglifycss())
            .pipe(rename('no-reload-test.min.css'))
            .pipe(gulp.dest('dist/'));
    });

    gulp.task('jshint', function () {
        return gulp.src('src/**/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(exitOnJshintError);
    });

    gulp.task('package-js', ['jshint'], function () {
        return gulp.src(['src/no-reload/no-reload.js', 'src/no-reload-test/no-reload-test.js'])
            .pipe(named())
            .pipe(webpack())
            .pipe(gulp.dest('dist/'));
    });

    gulp.task('qunit', ['package-js'], function () {
        return gulp.src('test/index.html')
            .pipe(qunit());
    });

    gulp.task('js-min', ['qunit'], function () {
        gulp.src('dist/no-reload.js')
            .pipe(uglify())
            .pipe(rename('no-reload.min.js'))
            .pipe(gulp.dest('dist/'));

        gulp.src('dist/no-reload-test.js')
            .pipe(uglify())
            .pipe(rename('no-reload-test.min.js'))
            .pipe(gulp.dest('dist/'));
    });

    gulp.task('build', ['js-min', 'css-min'], function () {});

}());
