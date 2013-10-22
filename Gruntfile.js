module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON("package.json"),

		concat: {
			dist: {
				src: ["src/jquery.autosaveform.js"],
				dest: "dist/jquery.autosaveform.js"
			}
		},

		jshint: {
			files: ["src/jquery.autosaveform.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		uglify: {
			jqueryAutoSave: {
				src: ["dist/jquery.autosaveform.js"],
				dest: "dist/jquery.autosaveform.min.js"
			}
		},

		cssmin: {
			combine: {
				files: {
					'example/assets/css/style.css': ['example/assets/css/bootstrap.css', 'example/assets/css/custom.css']
				}
			},
			minify: {
				expand: true,
				cwd: 'example/assets/css/',
				src: ['style.css', '!*.min.css'],
				dest: 'example/assets/css/',
				ext: '.min.css'
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask("default", ["jshint", "concat", "uglify", "cssmin"]);
	grunt.registerTask("travis", ["jshint"]);

};