var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var template = require('gulp-template');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var html2js = require('gulp-html2js');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var isLiveReload = process.argv.indexOf('--live-reload') !== -1 || process.argv.indexOf('--livereload') !== -1;

// task to concat the bower libs together
gulp.task('js:libs', function() {

    return gulp.src([
        "./web/src/lib/q/q.js",
        "./web/src/lib/angular/angular.js"
    ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('./web/www/js/'));
});

// task to browserify `worker`
gulp.task('js:worker', function() {
    var b = browserify({
        entries: './mypackage/worker.js',
        debug: true
    });
    
    return b.bundle()
      .pipe(source('worker.js'))
      .pipe(buffer())
      .pipe(gulp.dest('./web/www/js/'));
});

// task to concat the angular app
gulp.task('js:app', function() {

    return gulp.src([
        './web/src/js/**/*.js'
    ])
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('./web/www/js/'));
});

// watch task
gulp.task('watch', function() {
    // enable livereload?
    if (isLiveReload) {
        livereload.listen();
    }

    gulp.watch(['./web/www/index.html'], ['livereload']);
    gulp.watch(['./web/src/js/**/*.js'], ['js:app:livereload']);
    gulp.watch(['./mypackage/**/*.js'], ['js:browserify-lib:livereload']);
});

// task to trigger rebuild and then livereload
gulp.task('js:app:livereload', ['js:app'], function() {
    livereload.reload();
});

// task to trigger rebuild and then livereload
gulp.task('js:browserify-lib:livereload', ['js:worker'], function() {
    livereload.reload();
});

// task to trigger rebuild and then livereload
gulp.task('livereload', function() {
    livereload.reload();
});

gulp.task('js', ['js:libs', 'js:worker', 'js:app']);
gulp.task('default', ['js']);
