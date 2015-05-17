module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({

    srcFiles: [
      "src/**/*.purs",
      "bower_components/purescript-*/src/**/*.purs"
    ],

    clean: ["dist", "tmp", "output"],

    pscMake: {
      tests: {
        src: ["tests/Tests.purs", "<%=srcFiles%>"]
      }
    },

    psc: {
      options: {
        main: "Application.Main",
        modules: ["Application.Main"]
      },
      main: {
        src: ["<%=srcFiles%>"],
        dest: "output/app.js"
      }
    },

    dotPsci: ["<%=srcFiles%>"],

    copy: [
      {
        expand: true,
        cwd: "output",
        src: ["**"],
        dest: "tmp/node_modules"
      }, {
        src: ["js/index.js"],
        dest: "tmp/index.js"
      }, {
        src: ["output/app.js"],
        dest: "dist/app.js"
      }
    ],

    execute: {
      tests: {
        src: "tmp/index.js"
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-execute");
  grunt.loadNpmTasks("grunt-purescript");

  grunt.registerTask("test", ["pscMake:tests", "copy", "execute:tests"]);
  grunt.registerTask("make", ["psc:main", "dotPsci"]);
  grunt.registerTask("default", ["clean", "make", "test"]);
};
