module.exports = function(grunt){
	var path = require('path');
	var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
	var matchde = require('matchdep');
	var folderMount = function folderMount(connect, point) {
		return connect.static(path.resolve(point));
	};
	// load all grunt-plugin tasks
	matchde.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// init config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Default livereload listening port.
		livereload: {
			port: 35729
		},

		// Setup Server
		connect: {
			livereload: {
				options: {
					port: 9001,
					base: './example',
					middleware: function(connect, options) {
						return [lrSnippet, folderMount(connect, options.base)]
					}
				}
			}
		},

		// copy files to example dir
		 copy: {
			app: {
				files: [
					{src: ['src/js/lib/raphael/raphael-min.js'], dest: 'example/js/lib/raphael-min.js', filter: 'isFile'},
					{src: ['src/js/script.js'], dest: 'example/js/script.js', filter: 'isFile'}
				]
			}
		},

		// Configuration to be run (and then tested)
		watch: {
			livereload: {
				files: ['example/*.html', 'src/script.js'],
				tasks: ['copy', 'livereload']
			}
		}
	});

	// remove when regarde task is renamed
	grunt.renameTask('regarde', 'watch');

	// resiter tasks
	grunt.registerTask('default', ['copy', 'livereload-start', 'connect', 'watch']);
};
