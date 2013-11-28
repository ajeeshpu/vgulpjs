module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        htmlSnapshot: {
            all: {
                options: {
                    //that's the path where the snapshots should be placed
                    //it's empty by default which means they will go into the directory
                    //where your Gruntfile.js is placed
                    snapshotPath: './public/snapshots/',
                    //This should be either the base path to your index.html file
                    //or your base URL. Currently the task does not use it's own
                    //webserver. So if your site needs a webserver to be fully
                    //functional configure it here.
                    sitePath: 'http://localhost:3000/index.html',
                    //you can choose a prefix for your snapshots
                    //by default it's 'snapshot_'
                    fileNamePrefix: '',
                    //by default the task waits 500ms before fetching the html.
                    //this is to give the page enough time to to assemble itself.
                    //if your page needs more time, tweak here.
                    msWaitForPages: 10000,
                    //sanitize function to be used for filenames. Converts '#!/' to '_' as default
                    //has a filename argument, must have a return that is a sanitized string
                    sanitize: function (requestUri) {
                        //returns 'index.html' if the url is '/', otherwise a prefix
                        grunt.log.error('This is called-->', requestUri)
                        return requestUri.replace(/#!/g, '').replace(/\.html/g, '')

                    },
                    //if you would rather not keep the script tags in the html snapshots
                    //set `removeScripts` to true. It's false by default
                    removeScripts: false,
                    //set `removeLinkTags` to true. It's false by default
                    removeLinkTags: false,
                    //set `removeMetaTags` to true. It's false by default
                    removeMetaTags: false,
                    //Replace arbitrary parts of the html
                    replaceStrings: [
                        {'localhost:3000': 'beta.app.vgulp.com',
                            'vgulp.com': 'gobblengulp.com',
                            'src="img/': 'src="../img/',
                            "src='img/": "src='../img/"}
                    ],
                    // allow to add a custom attribute to the body
                    bodyAttr: 'data-prerendered',
                    //here goes the list of all urls that should be fetched
                    urls: ['#!', "#!about.html"],
                    // a list of cookies to be put into the phantomjs cookies jar for the visited page
                    cookies: [
                        {"path": "/", "domain": "localhost", "name": "lang", "value": "en-gb"}
                    ]
                }
            }
        } ,
        clean:['target/work'],
        copy: {
            main: {
                files: [
                    // includes files within path and its sub-directories
                    {expand: true, src: ['www/**'], dest: 'target'},
                    //{expand: true, cwd: 'target/', src: ['**'], dest: 'target/work'},
                ]
            }
        },
        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [
                    {
                        // Set to true to enable the following options…
                        expand: true,
                        // cwd is 'current working directory'
                        cwd: 'public/img/',
                        src: ['**/*.png'],
                        // Could also match cwd line above. i.e. project-directory/img/
                        dest: 'target/img',
                        ext: '.png'
                    }
                ]
            },
            jpg: {
                options: {
                    progressive: true
                },
                files: [
                    {
                        // Set to true to enable the following options…
                        expand: true,
                        // cwd is 'current working directory'
                        cwd: 'public/img/',
                        src: ['**/*.jpg'],
                        // Could also match cwd. i.e. project-directory/img/
                        dest: 'target/www/img',
                        ext: '.jpg'
                    }
                ]
            }
        },
        requirejs:{
            compile:{
                options:{
                    appDir:"public",
                    dir:"target/",
                    optimizeCss:'standard',
                    uglify: {
                        toplevel: true,
                        ascii_only: true,
                        beautify: true,
                        max_line_length: 1000,

                        //How to pass uglifyjs defined symbols for AST symbol replacement,
                        //see "defines" options for ast_mangle in the uglifys docs.
                        defines: {
                            DEBUG: ['name', 'false']
                        },

                        //Custom value supported by r.js but done differently
                        //in uglifyjs directly:
                        //Skip the processor.ast_mangle() part of the uglify call (r.js 2.0.5+)
                        no_mangle: true
                    },
                    paths: {
                        'text': '../lib/require/text',
                        'durandal':'../lib/durandal/js',
                        'plugins' : '../lib/durandal/js/plugins',
                        'transitions' : '../lib/durandal/js/transitions',
                        'knockout': '../lib/knockout/knockout-2.3.0',
                        'bootstrap': '../lib/bootstrap/js',
                        'jquery': '../lib/jquery/jquery-1.9.1',
                        'prettyPhoto':'../lib/prettyPhoto/js',
                        'shareThis':'../lib/shareThis/js',
                        'jqueryPlugins':'../lib/jquery',
                        'domReady':'../lib/require/domReady',
                        'hogan':'../lib/hogan/hogan.min',
                        'json':'../lib/require/json',
                        'async':'../lib/require/async',
                        'facebook': '//connect.facebook.net/en_US/all',
                        'fb':'../lib/facebook/fb'

                    },
                    shim: {
                        'bootstrap': {
                            deps: ['jquery'],
                            exports: 'jQuery'
                        },
                        'bootstrap-carousel': {
                            deps: ['jquery'],
                            exports: 'jQuery'
                        },
                        'bootstrap-modal': {
                            deps: ['jquery'],
                            exports: 'jQuery'
                        },
                        'prettyPhoto/jqueryPrettyPhoto':{
                            deps:['jquery','jqueryPlugins/jquery.migrate.1.2.1'],
                            exports:'jQuery'
                        },
                        'jqueryPlugins/jquery.cookie':{
                            deps:['jquery','jqueryPlugins/jquery.migrate.1.2.1'],
                            exports:'jQuery'
                        } ,
                        'facebook' : {
                            export: 'FB'
                        }

                    },
                    modules:[
                        {
                            name:'main'
                            //insertRequire:['../app/plain-html-modules/main']
                        }/*
                         {
                         name:'../app/careers/main',
                         insertRequire:['../app/careers/main']
                         },
                         {
                         name:'../app/deal/main',
                         insertRequire:['../app/deal/main']
                         },  */
                    ],
                    throwWhen: {
                        //If there is an error calling the minifier for some JavaScript,
                        //instead of just skipping that file throw an error.
                        optimize: true
                    },
                    //fileExclusionRegExp:"WEB-INF|config",
                    done:function (done, output) {
                        var duplicates = require('rjs-build-analysis').duplicates(output);

                        if (duplicates.length > 0) {
                            grunt.log.subhead('Duplicates found in requirejs build:')
                            grunt.log.warn(duplicates);
                            done(new Error('r.js built duplicate modules, please check the excludes option.'))
                        }

                        done();
                    }
                }
            }
        }


    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-html-snapshot');

    grunt.registerTask('snapshotMySite', 'takes an html shot of the site with all routes configured', function () {
        var routes = grunt.file.readJSON('public/app/routes.json')
        var allUrlsToScrape = []
        for (var i = 0; i < routes.length; i++) {
            allUrlsToScrape.push('#!' + routes[i].slug)
        }
        grunt.log.writeln(allUrlsToScrape)
        global.snapshotUrls = allUrlsToScrape
        grunt.config.set('htmlSnapshot.all.options.urls', allUrlsToScrape)
        //grunt.task.run('htmlSnapshot')
    })
    grunt.registerTask('ts', ['snapshotMySite', 'htmlSnapshot']);
    grunt.registerTask('buildWWW',['clean','copy','imagemin','requirejs'])
    /* grunt.registerTask('test', ['jshint', 'qunit']);

     grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);*/

};
