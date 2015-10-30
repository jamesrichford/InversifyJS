"use strict";

//******************************************************************************
//* DEPENDENCIES
//******************************************************************************
var gulp        = require("gulp"),
    fs          = require('fs'),
    browserify  = require("browserify"),
    source      = require("vinyl-source-stream"),
    buffer      = require("vinyl-buffer"),
    tslint      = require("gulp-tslint"),
    tsc         = require("gulp-typescript"),
    rename      = require("gulp-rename"),
    Server      = require("karma").Server,
    coveralls   = require('gulp-coveralls'),
    uglify      = require("gulp-uglify"),
    typedoc     = require("gulp-typedoc"),
    runSequence = require("run-sequence"),
    header      = require("gulp-header");

//******************************************************************************
//* LINT
//******************************************************************************
gulp.task("lint", function() {
  return gulp.src([
                "source/**/**.ts",
                "test/**/**.test.ts"
              ])
             .pipe(tslint())
             .pipe(tslint.report("verbose"));
});

//******************************************************************************
//* DOCUMENT
//******************************************************************************
gulp.task("document", function () {
  return gulp.src("source/inversify.ts")
             .pipe(typedoc({
                target : "ES5",
                module : "commonjs",
                includeDeclarations: false,
                out: "./docs",
                name: "InversifyJS",
                version: true,
             }));
});

//******************************************************************************
//* BUILD
//******************************************************************************
var tsProject = tsc.createProject("tsconfig.json");

var config = {
    app: {
        path: 'source',
        main: 'inversify.ts',
        result: 'inversify.js'
    }
};

gulp.task("build-source", function() {
  return gulp.src("source/**/**.ts")
             .pipe(tsc(tsProject))
             .js.pipe(gulp.dest("build/source/"));
});

var tsTestProject = tsc.createProject("tsconfig.json");

gulp.task("build-test", function() {
  return gulp.src("test/**/*.test.ts")
             .pipe(tsc(tsTestProject))
             .js.pipe(gulp.dest("build/test/"));
});

//******************************************************************************
//* BUNDLE
//******************************************************************************
gulp.task("bundle-source", function () {
  var b = browserify({
    standalone : 'inversify',
    entries: "build/source/inversify.js"
  });

  return b.bundle()
    .pipe(source("inversify.js"))
    .pipe(buffer())
    .pipe(gulp.dest("bundled/source/"));
});

gulp.task("bundle-test", function () {

  var file = "all.test.js";

  var b = browserify({
    entries: "build/test/" + file
  });

  return b.bundle()
    .pipe(source(file))
    .pipe(buffer())
    .pipe(gulp.dest("bundled/test/"));

});

//******************************************************************************
//* TEST
//******************************************************************************
gulp.task("karma", function(cb) {
  new Server({
      configFile: 'karma.conf.js'
    }, cb).start();
});

gulp.task("cover", function() {
  if (!process.env.CI) return;
  return gulp.src("coverage/**/lcov.info")
      .pipe(coveralls());
});

//******************************************************************************
//* BAKE
//******************************************************************************
gulp.task("compress", function() {
  return gulp.src("bundled/source/inversify.js")
             .pipe(uglify({ preserveComments : false }))
             .pipe(rename('inversify.min.js'))
             .pipe(gulp.dest("dist/"));
});

gulp.task("header", function() {

  var pkg = require("./package.json");

  var banner = ["/**",
    " * <%= pkg.name %> v.<%= pkg.version %> - <%= pkg.description %>",
    " * Copyright (c) 2015 <%= pkg.author %>",
    " * <%= pkg.license %> inversify.io/LICENSE",
    " * <%= pkg.homepage %>",
    " */",
    ""].join("\n");

  gulp.src("bundled/source/inversify.js")
             .pipe(header(banner, { pkg : pkg } ))
             .pipe(gulp.dest("dist/"));

  return gulp.src("dist/inversify.min.js")
             .pipe(header(banner, { pkg : pkg } ))
             .pipe(gulp.dest("dist/"));
});

//******************************************************************************
//* DEFAULT
//******************************************************************************
gulp.task("default", function (cb) {
  runSequence(
    "lint",
    "build-source",
    "build-test",
    "bundle-source",
    "bundle-test",
    "karma",
    "cover",
    "compress",
    "header",
    "document",
    cb);
});
