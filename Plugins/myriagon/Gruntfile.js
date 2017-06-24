module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        options: {
            livereload: true
        },
        copy: {
          main: {
            files: [
              { expand: true, cwd: './src', src: ['myriagon.css'], dest: './build/' },
            ],
          },
        },
        cssmin: {
          options: {
            processImport: false
          },
          client: {
            files: [{
              expand: true,
              cwd: './build',
              src: ['myriagon.css'],
              dest: './build',
              ext: '.min.css'
            }]
          }
        },
        babel: {
            options: {
                sourceMap: false,
                presets: ['es2015']
            },
            dist: {
                files: [
                  {
                      "expand": true,
                      "cwd": "src",
                      "src": ["myriagon.js"],
                      "dest": "build",
                      "ext": ".js"
                  },
              ]
            }
        },
        uglify: {
            js_client: {
                src: './build/myriagon.js',
                dest: './build/myriagon.min.js'
            },
        },
        watch: {
            scripts: {
                files: ['./src/myriagon.js'],
                tasks: ['babel'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['./src/myriagon.css'],
                tasks: ['copy'],
                options: {
                    spawn: false,
                },
            },
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    require('load-grunt-tasks')(grunt);

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.

    grunt.registerTask('default', ['babel',  'copy', 'watch']);
    grunt.registerTask('production', ['babel', 'copy', 'uglify', 'cssmin']);

};
