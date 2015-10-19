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
    Server      = require("karma").Server,
    coveralls   = require('gulp-coveralls'),
    uglify      = require("gulp-uglify"),
    docco       = require("gulp-docco"),
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
//* BUILD
//******************************************************************************
var tsProject = tsc.createProject({
  removeComments : false,
  noImplicitAny : false,
  target : "ES5",
  module : "commonjs",
  declarationFiles : false,
  experimentalDecorators : true
});

gulp.task("build-source", function() {
  return gulp.src("source/**/**.ts")
             .pipe(tsc(tsProject))
             .js.pipe(gulp.dest("build/source/"));
});

var tsTestProject = tsc.createProject({
  removeComments : false,
  noImplicitAny : false,
  target : "ES5",
  module : "commonjs",
  declarationFiles : false,
  experimentalDecorators : true
});

gulp.task("build-test", function() {
  return gulp.src("test/*.test.ts")
             .pipe(tsc(tsTestProject))
             .js.pipe(gulp.dest("build/test/"));
});

gulp.task("build", function(cb) {
  runSequence("lint", "build-source", "build-test", cb);
});

//******************************************************************************
//* DOCUMENT
//******************************************************************************
gulp.task("document", function () {
  return gulp.src("build/source/*.js")
             .pipe(docco())
             .pipe(gulp.dest("documentation"));
});

//******************************************************************************
//* BUNDLE
//******************************************************************************
gulp.task("bundle-source", function () {
  var b = browserify({
    standalone : 'inversify',
    entries: "build/source/inversify.js",
    debug: true
  });

  return b.bundle()
    .pipe(source("inversify.js"))
    .pipe(buffer())
    .pipe(gulp.dest("bundled/source/"));
});

gulp.task("bundle-test", function () {

  var file = "all.test.js";

  var b = browserify({
    entries: "build/test/" + file,
    debug: true
  });

  return b.bundle()
    .pipe(source(file))
    .pipe(buffer())
    .pipe(gulp.dest("bundled/test/"));

});

gulp.task("bundle", function(cb) {
  runSequence("build", "bundle-source", "bundle-test", "document", cb);
});

//******************************************************************************
//* TEST
//******************************************************************************
gulp.task("karma", function(cb) {
  new Server({
      configFile: __dirname + '/karma.conf.js'
    }, cb).start();
});

gulp.task("cover", function() {
  return gulp.src("coverage/**/lcov.info")
      .pipe(coveralls());
});

gulp.task("test", function(cb) {
  runSequence("bundle", "karma", "cover", cb);
});

//******************************************************************************
//* BAKE
//******************************************************************************
gulp.task("compress", function() {
  return gulp.src("bundled/source/inversify.js")
             .pipe(uglify({ preserveComments : false }))
             .pipe(gulp.dest(__dirname + "/dist/"))
});

gulp.task("header", function() {

  var pkg = require("package.json");

  var banner = ["/**",
    " * <%= pkg.name %> v.<%= pkg.version %> - <%= pkg.description %>",
    " * Copyright (c) 2015 <%= pkg.author %>",
    " * <%= pkg.license %> inversify.io/LICENSE",
    " * <%= pkg.homepage %>",
    " */",
    ""].join("\n");

  return gulp.src("dist/inversify.js")
             .pipe(header(banner, { pkg : pkg } ))
             .pipe(gulp.dest("dist/"));
});

gulp.task("bake", function(cb) {
  runSequence("bundle", "compress", "header", cb);
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
    "document",
    "karma",
    "cover",
    "compress",
    "header",
    cb);
});
