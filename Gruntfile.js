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
			my_target: {
				src: ["dist/jquery.autosave.js"],
				dest: "dist/jquery.autosave.min.js"
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("default", ["jshint", "concat", "uglify"]);
	grunt.registerTask("travis", ["jshint"]);

};