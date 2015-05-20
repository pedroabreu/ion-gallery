var gulp = require('gulp');
var jshint = require('gulp-jshint');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var ngAnnotate = require('gulp-ng-annotate');

var paths = {
    templatecache: ['./src/templates/*.html']
  };


gulp.task('default', ['compress','sass'], function() {
  // place code for your default task here
});

gulp.task('lint', function() {
  return gulp.src('./src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('templatecache',['lint'], function () {
    return gulp.src('./src/templates/*.html')
      .pipe(templateCache({standalone:true}))
      .pipe(gulp.dest('./src/js'));
  });

gulp.task('scripts', ['templatecache'], function() {
  return gulp.src('./src/js/*.js')
    .pipe(ngAnnotate())
    .pipe(concat('ion.gallery.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('compress',['scripts'], function() {
  return gulp.src('./dist/*.js')
    .pipe(uglify())
    .pipe(rename('ion.gallery.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function () {
    gulp.src('./src/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./dist'));
});
 