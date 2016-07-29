// Generated on 2016-07-27 using generator-tr-fefapp 1.3.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        html2js: {
          options: {
              base: '<%= yeoman.app %>/',
              module: 'systemhackerdll-templates'
          },
          main: {
              src: ['<%= yeoman.app %>/js/**/*html'],
              dest: '<%= yeoman.app %>/js/systemhackerdll-temp.js'
          }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= yeoman.app %>/js/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            less: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.less'],
                tasks: ['less:server'],
                options: {
                    livereload: '<% connect.options.livereload %>'
                }
            },
            ts: {
                files: ['<%= yeoman.app %>/js/{,**/}*.ts'],
                tasks: ['newer:tslint', 'typescript:base'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            tsTest: {
                files: ['test/spec/{,*/}*.ts'],
                tasks: ['newer:tslint', 'typescript:spec']
            },
            styles: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            
            html: {
                files: ['<%= yeoman.app %>/js/*.html', '<%= yeoman.app %>/js/components/**/*.html'],
                tasks: ['html2js'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            

            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                    task: ['html2js']
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            proxies: [{
                context: '/rest',
                port: 8081,
                host: 'localhost',
                headers: {
                    'host': 'localhost'
                },
                changeOrigin: true,
                rewrite: {
                    '^/rest': ''
                }
            }],
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= yeoman.app %>'
                    ],
                    middleware: function (connect, options) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

                        middlewares.push(connect.static('.tmp'));
                        middlewares.push(connect().use('/bower_components', connect.static('./bower_components')));
                        middlewares.push(connect.static(appConfig.app));

                        options.base.forEach(function(base) {
                            middlewares.push(connect.static(base));
                        });

                        var directory = options.directory || options.base[options.base.length - 1];
                        middlewares.push(connect.directory(directory));

                        return middlewares;
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                'Gruntfile.js',
                '<%= yeoman.app %>/js/{,**/}*.js',
                '!<%= yeoman.app %>/js/systemhackerdll-temp.js',
                '!<%= yeoman.app %>/js/generated/ts/{,**/}*.js'
                ]
            },
            test: {
                src: [
                    'test/spec/{,*/}*.js',
                    '!test/spec/generated/ts/{,**/}*.js'
                ]
            }
        },
        typescript: {
            base: {
                src: [
                    '<%= yeoman.app %>/js/{,**/}*.ts'
                ],
                dest: '<%= yeoman.app %>/js/generated/ts',
                options: {
                    target: 'es5',
                    basePath: '<%= yeoman.app %>/js/',
                    sourceMap: true,
                    comments: true,
                    noImplicitAny: true
                }
            },
            spec: {
                src: [
                    'test/spec/{,**/}*.ts'
                ],
                dest: 'test/spec/generated/ts',
                options: {
                    target: 'es5',
                    // using commonjs for e2e testing. if you need AMD for frontend assets,
                    // then you need to split this typescript target into frontend and e2e tasks.
                    module: 'commonjs',
                    basePath: 'test/spec/',
                    sourceMap: true,
                    comments: true,
                    noImplicitAny: true
                }
            }
        },

        tslint: {
            options: {
                configuration: grunt.file.readJSON('tslint.json')
            },
            files: {
                src: [
                    '<%= yeoman.app %>/js/{,**/}*.ts',
                    'test/spec/{,**/}*.ts'
                ]
            }
        },

        // Empties folders to start fresh
        clean: {
            options: {
                force:true
            },
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/{,*/}*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= yeoman.dist %>/js/{,*/}*.js',
                    '<%= yeoman.dist %>/styles/{,*/}*.css',
                    '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= yeoman.dist %>/styles/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html', '<%= yeoman.dist %>/**/*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>','<%= yeoman.dist %>/images']
            }
        },

        // The following *-min tasks will produce minified files in the dist folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/systemhackerdll.css': [
                        '.tmp/styles/{,*/}*.css'
                    ]
                }
            }
        },

        uglify: {
            generated: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true
                }
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', 'js/**/*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // ngAnnotate tries to make the code safe for minification automatically by
        // using the Angular long form for dependency injection. It doesn't work on
        // things like resolve or inject so those have to be done manually.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/js',
                    src: '*.js',
                    dest: '.tmp/concat/js'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'js/**/*.html',
                        'images/{,*/}*.{webp}',
                        'languages/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }]
            },

            bentoFonts: {
                expand: true,
                cwd: '<%= yeoman.app %>/bower_components/bento-modern/fonts',
                dest: '<%= yeoman.dist %>/fonts',
                src: ['*']
            },

            modDist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        'languages/**/*'
                    ]
                }]
            },

            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                // 'imagemin',
                'svgmin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: false
            }
        },

        protractor: {
            options: {
                keepAlive: true,
                configFile: 'test/protractor.conf.js'
            },
            run: {}
        },

        less: {
            options: {
                paths: '<%= yeoman.app%>/styles'
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app%>/styles',
                    src: ['*.less'],
                    dest: '<%= yeoman.app%>/styles',
                    ext: '.css'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app%>/styles',
                    src: ['*.less'],
                    dest: '.tmp/styles',
                    ext: '.css'
                }]
            }
        }
    });

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'html2js', 
            'configureProxies:server',
            'concurrent:server',
            'less:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'html2js', 
        'concurrent:test',
        'less:server',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('e2e', [
        'clean:server',
        'concurrent:test',
        'less:server',
        'autoprefixer',
        'connect:test',
        'protractor:run'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'less:dist',
        'autoprefixer',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'copy:bentoFonts',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);


    grunt.registerTask('modBuild', [
        'clean:dist',
        'html2js',
        'useminPrepare',
        'concurrent:dist',
        'less:dist',
        'autoprefixer',
        'concat',
        'ngAnnotate',
        'copy:modDist',
        'cssmin:dist',
        'uglify',
        'usemin'
    ]);


    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};