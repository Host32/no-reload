/*global module:false*/
module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['src/<%= pkg.name %>-test/style.css'],
                dest: 'dist/<%= pkg.name %>-test.css'
            }
        },
        webpack: {
            main: {
                entry: './src/<%= pkg.name %>/main.js',
                output: {
                    path: './dist/',
                    filename: '<%= pkg.name %>.js'
                },
                target: 'web'
            },
            test: {
                entry: './src/<%= pkg.name %>-test/main.js',
                output: {
                    path: './dist/',
                    filename: '<%= pkg.name %>-test.js'
                },
                target: 'web'
            }
        },
        cssmin: {
            target: {
                files: {
                    './dist/<%= pkg.name %>-test.min.css': ['./src/<%= pkg.name %>-test/style.css']
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            build: {
                files: [
                    {
                        src: 'dist/<%= pkg.name %>.js',
                        dest: 'dist/<%= pkg.name %>.min.js'
                    }, {
                        src: 'dist/<%= pkg.name %>-test.js',
                        dest: 'dist/<%= pkg.name %>-test.min.js'
                    }
                ]
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {}
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib_test: {
                src: ['src/**/*.js', 'test/lib/**/*.js']
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        jsdoc: {
            dist: {
                src: ['src/**/*.js', 'test/**/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        },
        clean: {
            doc: ['doc'],
            dist: ['dist']
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            concat: {
                files: 'src/**/*.css',
                tasks: ['concat']
            },
            webpack: {
                files: 'src/**/*.js',
                tasks: ['webpack']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test', 'qunit']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-webpack');

    // Default task.
    grunt.registerTask('package', ['clean:dist', 'concat', 'webpack']);
    grunt.registerTask('minify', ['cssmin', 'uglify']);
    grunt.registerTask('doc', ['clean:doc', 'jsdoc']);
    grunt.registerTask('default', ['jshint', 'package', 'qunit', 'minify', 'doc']);

};