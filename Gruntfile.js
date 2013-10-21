module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON("package.json"),

		concat: {
			dist: {
				src: ["src/jquery.autosave.js"],
				dest: "dist/jquery.autosave.js"
			}
		},

		jshint: {
			files: ["src/jquery.autosave.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		uglify: {
			jqueryAutoSave: {
				src: ["dist/jquery.autosave.js"],
				dest: "dist/jquery.autosave.min.js"
			},
			jquery: {
				src: ["src/jquery-2.0.3.min.js"],
				dest: "dist/jquery-2.0.3.min.js"
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("default", ["jshint", "concat", "uglify"]);
	grunt.registerTask("travis", ["jshint"]);

};