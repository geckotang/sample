module.exports = function(grunt){
	var path = require('path');
	var matchde = require('matchdep');

	// load all grunt-plugin tasks
	matchde.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// init config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// compile scss to css
		connect: {
			server: {
				options: {
					port: 9001,
					base: 'www'
				}
			}
		},
		compass: {
			app: {
				options: {
					config: 'config.rb'
				}
			}
		},
		// watch some files status
		watch: {
			app: {
				files: ['_scss/*.scss'],
				tasks: ['compass']
			}
		}
	});

	// resiter tasks
	grunt.registerTask('default', ['connect:server', 'watch']);
};

