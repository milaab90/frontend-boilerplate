'use strict';

module.exports = function(grunt){

  /* Configure
  ============================ */
  var configs = {   
    
    css_combine_files : [
      'assets/css/main.css'],
    
    js_combine_files : [
      'src/scripts/main.js'
    ],
    
    js_hint_files : [
      'src/scripts/main.js'
    ],

    watch_files : [
      'src/less/*/*',
      'src/scripts/*',]
  }

  /* Init
  ============================ */
  grunt.initConfig({
    less: {
      production: {
        files: {
          "assets/css/main.css" : "src/less/main.less"
        }
      }
    },
    // jshint: {
    //   beforeconcat: configs.js_hint_files
    // },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: configs.js_combine_files,
        dest: 'src/scripts/main.js',
      },
    },
    uglify: {
        my_target: {
          files: {
            'assets/scripts/main.min.js' : 'src/scripts/main.js'
          }
        }
    },
    cssmin: {
      combine: {
        files: {
          'assets/css/main.min.css' : configs.css_combine_files
        }
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, src: ['assets/images/**'], dest: 'dist'},

          {expand: true, src: ['assets/css/*'], dest: 'dist'},

          {expand: true, src: ['assets/scripts/*'], dest: 'dist'},

          {expand: true, src: ['assets/vendor/**'], dest: 'dist'},
          
          // includes files within path and its sub-directories
          {expand: true, src: ['index.html'], dest: 'dist'}
        ],
      },
    },
    watch: {
      src: {
        files: configs.watch_files,
        tasks: ['build']
      }
    }
  });

  // Add plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Register tasks
  grunt.registerTask('build', ['less','cssmin','concat','uglify','copy']);
  grunt.registerTask('default', ['less','cssmin','concat','uglify','copy']);

  grunt.event.on('watch', function(action, filepath) {
    grunt.log.writeln(filepath + ' has ' + action);
  });

};
