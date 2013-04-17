module.exports = function(grunt){
	var matchde = require('matchdep');

	// load all grunt-plugin tasks
	matchde.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// init config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// minify js files
		uglify: {
			my_target: {
				options: {
					beautify: false
				},
				files: {
					'dest/js/output.min.js': ['src/js/input.js']
				}
			}
		},

		// generate css from scss
		compass: {
			app: {
				options: {
					config: 'config.rb'
				}
			}
		},

		// watch some files status
		regarde: {
			js: {
				files: 'src/js/*.js',
				tasks: ['uglify'],
				spawn: true
			},
			css: {
				files: 'src/scss/*.scss',
				tasks: ['compass'],
				events: true
			}
		}
	});

	// remove when regarde task is renamed
	//grunt.renameTask('regarde', 'watch');

	// resiter tasks
	grunt.registerTask('default', ['regarde']);
};

