/* eslint-env node */
/* eslint no-console: 'off' */
/*
 * ISC License (ISC)
 *
 * Copyright (c) 2017 Brandon Sara (http://bsara.github.io/)
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

const gulp           = require('gulp');
const babel          = require('gulp-babel');
const del            = require('del');
const escapeRegex    = require('escape-string-regexp');
const ignore         = require('gulp-ignore');
const insert         = require('gulp-insert');
const eslint         = require('gulp-eslint');
const path           = require('path');
const rename         = require('gulp-rename');
const replace        = require('gulp-replace');
const runSequence    = require('run-sequence');
const sourcemaps     = require('gulp-sourcemaps');
const uglifyHarmony  = require('uglify-js-harmony');
const uglifyMinifier = require('gulp-uglify/minifier');
const util           = require('gulp-util');




// ------------------------- //
// String Extensions         //
// ------------------------- //

String.EMPTY = '';
String.SPACE = ' ';




// ------------------------- //
// Configuration             //
// ------------------------- //

const config = {
  pkg: require('./package.json'),

  isDist: false,

  build: { dir: 'build' },
  dist:  { dir: 'dist' },
  src:   { dir: 'src' },
  test:  { dir: 'test' }
};


config.partialFullLicenseComment =
`
 * ISC License (ISC)
 *
 * Copyright (c) ${(new Date()).getFullYear()} Brandon Sara (http://bsara.github.io/)
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
`;

config.oldFullFileHeader = `/**!${config.partialFullLicenseComment}`;

config.newFullFileHeader =
`/**!
 * ${config.pkg.name}.js (${config.pkg.version})
 *${config.partialFullLicenseComment}`;

config.minifiedFileHeader =
`/**!
 * ${config.pkg.name}.js (${config.pkg.version})
 * Copyright (c) ${(new Date()).getFullYear()} Brandon Sara (http://bsara.github.io)
 * Licensed under the ISC license (https://github.com/${config.pkg.repository}/blob/master/LICENSE)
 */
`;


config.umdHeader =
`;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
    return;
  }
  if (typeof exports === 'object') {
    module.exports = factory(require, exports, module);
    return;
  }
  root.Proto = factory(undefined, {}, undefined);
}(this, function(require, exports, module) {
`;

config.umdFooter = '\n}));\n';




// ------------------------- //
// Helpers                   //
// ------------------------- //

function onError(err) {
  let msg = String.EMPTY;

  if (err.fileName != null) {
    msg = `ERROR IN ${err.fileName}`;

    if (err.lineNumber != null) {
      msg += ` (line number: ${err.lineNumber})`;
    }

    msg += ':\n              ';
  }

  if (err.message != null) {
    msg += err.message;
  } else if (typeof err === 'string') {
    msg = err;
  }

  util.log(util.colors.red(msg));
}




// ------------------------- //
// Tasks                     //
// ------------------------- //

gulp.task('default', [ 'help' ]);


gulp.task('help', function() {
  const header = util.colors.bold.blue;
  const task   = util.colors.green;

  console.log(String.EMPTY);
  console.log(header(`${config.pkg.name}.js Gulp Tasks`));
  console.log(header(`------------------------------------------------------------------------------`));
  console.log(`  ${task("help")} (${util.colors.yellow("default")}) - Displays this message.`);
  console.log(String.EMPTY);
  console.log(`  ${task("build")}          - Builds the project.`);
  console.log(`  ${task("rebuild")}        - Cleans the build folder, then builds the project.`);
  console.log(`  ${task("dist")}           - Performs all needed tasks to prepare the built project`);
  console.log(`                   for a new release.`);
  console.log(String.EMPTY);
  console.log(`  ${task("clean")}          - Runs all available cleaning tasks in parallel.`);
  console.log(`  ${task("clean:build")}    - Cleans the build output directory.`);
  console.log(`  ${task("clean:dist")}     - Cleans the distribution output directory.`);
  console.log(String.EMPTY);
  console.log(`  ${task("lint")}           - Runs all available linting tasks in parallel.`);
  console.log(String.EMPTY);
});



// Build Tasks
// ----------------

gulp.task('build', function() {
  return gulp.src(path.join(config.src.dir, '**/*.js'))
             .pipe(replace(new RegExp(escapeRegex(config.oldFullFileHeader), 'g'), config.newFullFileHeader))
             .pipe(gulp.dest(config.build.dir))
             .pipe(sourcemaps.init())
               .pipe(babel())
               .pipe(replace(new RegExp(escapeRegex(config.newFullFileHeader), 'g'), String.EMPTY))
               .pipe(rename({ suffix: '.es5' }))
               .pipe(replace(/exports\.default\s=/g, "return exports.default ="))
               .pipe(insert.prepend(config.umdHeader))
               .pipe(insert.append(config.umdFooter))
               .pipe(insert.prepend(config.newFullFileHeader))
             .pipe(sourcemaps.write('.', { sourceRoot: null }))
             .pipe(gulp.dest(config.build.dir))
             .pipe(ignore.exclude('*.map'))
             .pipe(sourcemaps.init({ loadMaps: true }))
               .pipe(uglifyMinifier({ verbose: true, mangle: true }, uglifyHarmony)).on('error', onError)
               .pipe(insert.prepend(config.minifiedFileHeader))
               .pipe(rename({ suffix: '.min' }))
             .pipe(sourcemaps.write('.', { sourceRoot: null }))
             .pipe(gulp.dest(config.build.dir));
});


gulp.task('rebuild', function(callback) {
  return runSequence('clean:build', 'build', callback);
});


gulp.task('dist', function(callback) {
  config.isDist = true;

  return runSequence('lint', 'test', 'clean:dist', function(err) {
    if (err) {
      callback(err);
      return;
    }

    gulp.src(path.join(config.build.dir, '**/*'))
        .pipe(gulp.dest(config.dist.dir));

    callback();
  });
});



// Test Tasks
// ----------------

gulp.task('test', [ 'rebuild' ], function() {
  util.log(util.colors.yellow.bold("Tests not yet implemented!"));
});



// Clean Tasks
// ----------------

gulp.task('clean', [ 'clean:build', 'clean:dist' ]);

gulp.task('clean:build', () => del(config.build.dir));
gulp.task('clean:dist',  () => del(config.dist.dir));



// Lint Tasks
// ----------------

gulp.task('lint', function() {
  gulp.src([
        /* eslint-disable indent */
        'gulpfile.js',
        'package.json',
        path.join(config.src.dir, '**/*.js'),
        path.join(config.test.dir, '**/*.js')
      ]) /* eslint-enable indent */
      .pipe(eslint({ rules: (config.isDist ? { 'no-console': 'error', 'no-debugger': 'error' } : undefined) }))
      .pipe(eslint.format('stylish'))
      .pipe(eslint.failAfterError());
});
