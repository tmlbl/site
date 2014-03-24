module.exports = function (grunt) {
	grunt.initConfig({
		simplemocha: {
			options: {
				timeout: 3000,
				ignoreLeaks: false,
				reporter: 'tap'
			},
			all: { 
        src: ['test/mocha/*.js'] 
      }
		},
    express: {
      options: {
        // Override defaults
      },
      dev: {
        options: {
          script: 'index.js'
        }
      },
      prod: {
        options: {
          script: 'index.js',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'index.js'
        }
      }
    },
		watch: {
			views: {
				files: ['views/**'],
				options: {
					livereload: true
				}
			},
			scripts: {
				files: ['source/js/**'],
        tasks: ['browserify:dev'],
				options: {
					livereload: true
				}
			},
			styles: {
				files: ['source/scss/**'],
        tasks: ['sass'],
				options: {
					livereload: true
				}
			},
      server: {
        files: ['index.js'],
        tasks: ['express:dev']
      }
		},
    browserify: {
      lib: {
        src: ['source/js/lib.js'],
        dest: 'public/dist/lib.js',
        options: {
          transform: ['debowerify'],
          debug: false
        }
      },
      prod: {
        src: ['source/js/main.js'],
        dest: 'public/dist/browser.js',
        options: {
          transform: ['debowerify'],
          debug: false
        }
      },
      dev: {
        src: ['source/js/main.js'],
        dest: 'public/build/browser.js',
        options: {
          transform: ['debowerify'],
          debug: true
        }
      }
    },
    sass: {
      dist: {
        style: 'compressed',
        files: {'public/dist/styles.css': 'source/scss/styles.scss'}
      },
      dev: {
        sourcemap: true,
        files: {'public/build/styles.css': 'source/scss/styles.scss'}
      }
    },
    casper: {
      acceptance: {
        options: {
          test: true
        },
        files: {
          'test/acceptance/log.xml': ['test/casper/*.js']
        }
      }
    }
	});
  grunt.loadNpmTasks('grunt-casper');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.registerTask('default', ['express:dev', 'watch', 'browserify:lib']);
	grunt.registerTask('test', ['express:test', 'simplemocha', 'casper']);
  grunt.registerTask('build', ['sass', 'browserify']);
};
