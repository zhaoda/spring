module.exports = function(grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({

		// Task configuration.
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			build: {
				src: 'js/*.js'
			}
		},

		concat: {
			js: {
				options: {
					separator: ';'
				},
				src: [
					'js/lib/zepto.js',
					'js/lib/detect.js',
					'js/lib/touch.js',
					'js/lib/spa.js',
					'js/lib/template.js',
					'js/lib/marked.js',
					'js/lib/highlight.js',
					'js/boot.js',
					'js/pull2refresh.js',
					'js/issuelist.js',
					'js/side.js',
					'js/menu.js',
					'js/home.js',
					'js/labels.js',
					'js/issues.js'
				],
				dest: 'dist/main.js'
			}
		},

		uglify: {
			js: {
				files: {
					'dist/main.min.js': 'dist/main.js'
				}
			}
		},

		less: {
			production: {
				options: {
					cleancss: true
				},
				files: {
					'dist/main.min.css': 'css/boot.less'
				}
			}
		},

		clean: {
			temporary: ['dist/main.js', 'dest/main.min.css']
		}
		
	})

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat')
	grunt.loadNpmTasks('grunt-contrib-jshint')
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-less')
	grunt.loadNpmTasks('grunt-contrib-clean')


	// Default task.
	grunt.registerTask(
		'default', 
		[
		'jshint', 
		'concat', 
		'uglify',
		'less',
		'clean'
	])

	// // Test task.
	grunt.registerTask('test', ['jshint'])

}