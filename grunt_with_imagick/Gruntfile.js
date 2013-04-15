module.exports = function(grunt){
	var fs = require('fs'),
	    path = require('path'),
	    matchde = require('matchdep'),
	    im = require('node-imagemagick');

	// load all grunt-plugin tasks
	matchde.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerMultiTask('imagemagick', 'description...', function () {
		var done = this.async();
		    inputDir = this.data.inputDir || 'input',
		    outputDir = this.data.outputDir || 'input',
		    outputExt = this.data.outputExt || 'jpg',
		    outputQuality = this.data.quality || 0.8,
		    customArgs = this.data.customArgs || ['-flatten'],
		    _count = 0;
		fs.readdir(inputDir, function (err, file_or_dir) {
			if (err) {
				throw err;
			}
			var files = file_or_dir.map(function (file) {
					return path.join(inputDir, file);
				})
				.filter(function (file) {
					return fs.statSync(file).isFile();
				});
			files.forEach(function (f) {
				_convert(files, f, done);
			});
		});
		/**
		 * @param files {Array} ファイルのパス群
		 * @param file {String} ファイルのパス
		 * @param async {Function} 非同期処理が完了したことを伝える
		 */
		function _convert(files, file, async) {
			var extname = path.extname(file),
			    basename = path.basename(file, extname),
			    _src = [inputDir, basename, extname].join(''),
			    _dst = [outputDir, basename, outputExt].join(''),
			    param = {
				srcPath: _src, // input file name
				dstPath: _dst, // output file name
				quality: outputQuality,
				width: null, // magic word
				customArgs: customArgs
			    };
			im.resize(param, function(err, stdout, stderr){
				if (err) {
					throw err;
				}
				_count++;
				console.log('%s/%s : %s -> %s', _count, files.length, _src, _dst);
				if (_count >= files.length){
					console.log('Thanks for a job well done!');
					done();
				}
			});
		}
	});

	// init config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		imagemagick: {
			app: {
				inputDir: 'input/',
				outputDir: 'output/',
				outputExt: '.jpg',
				customArgs: ['-antialias', '-flatten'],
				quality: 1
			}
		},
		watch: {
			app: {
				files: ['input/*.*'],
				tasks: ['imagemagick']
			}
		}
	});

	grunt.registerTask('default', ['imagemagick', 'watch']);
};
