/*global require*/
(function () {
    'use strict';

    var gulp = require('gulp'),
        clean = require('gulp-rimraf'),
        concat = require('gulp-concat'),
        webpack = require('webpack-stream'),
        named = require('vinyl-named'),
        jsdoc = require('gulp-jsdoc3'),
        uglifycss = require('gulp-uglifycss'),
        uglify = require('gulp-uglify'),
        qunit = require('gulp-qunit'),
        jshint = require('gulp-jshint'),
        rename = require("gulp-rename");

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

    gulp.task('package-js', function () {
        return gulp.src(['src/no-reload/no-reload.js', 'src/no-reload-test/no-reload-test.js'])
            .pipe(named())
            .pipe(webpack())
            .pipe(gulp.dest('dist/'));
    });

    gulp.task('js-min', ['package-js'], function () {
        gulp.src('dist/no-reload.js')
            .pipe(uglify())
            .pipe(rename('no-reload.min.js'))
            .pipe(gulp.dest('dist/'));

        gulp.src('dist/no-reload-test.js')
            .pipe(uglify())
            .pipe(rename('no-reload-test.min.js'))
            .pipe(gulp.dest('dist/'));
    });

    gulp.task('minify', ['js-min', 'css-min'], function () {});

    gulp.task('package', ['package-js', 'package-css'], function () {});

    gulp.task('qunit', function () {
        return gulp.src('test/index.html')
            .pipe(qunit());
    });

    gulp.task('jshint', function () {
        return gulp.src('src/no-reload/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default', {
                verbose: true
            }))
            .pipe(jshint.reporter('fail'));
    });

    gulp.task('build', ['jshint', 'package', 'qunit', 'minify'], function () {});
}());
