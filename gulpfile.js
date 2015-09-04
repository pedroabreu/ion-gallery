var gulp = require('gulp');
var jshint = require('gulp-jshint');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var ngAnnotate = require('gulp-ng-annotate');
var stripDebug = require('gulp-strip-debug');
var del = require('del');
var karma = require('karma').server;

gulp.task('default', ['compress','sass'], function() {
  del(['.tmp/'], function (err, paths) {
    console.log('Deleted files/folders:\n', paths.join('\n'));
  });
});

/**
* Test task, run test once and exit
*/
gulp.task('test', function(done) {
  karma.start({
    configFile: __dirname + '/tests/my.conf.js',
    singleRun: true
  }, function() {
    done();
  });
});

gulp.task('lint', function() {
  return gulp.src('./src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('templatecache',['lint'], function () {
    return gulp.src('./src/templates/*.html')
      .pipe(templateCache({standalone:true}))
      .pipe(gulp.dest('./.tmp/'));
  });

gulp.task('scripts', ['templatecache'], function() {
  return gulp.src('./src/js/*.js')
    .pipe(ngAnnotate())
    .pipe(concat('ion-gallery.js'))
    .pipe(gulp.dest('./.tmp/'));
});

gulp.task('compress',['scripts'], function() {
  return gulp.src('./.tmp/*.js')
    .pipe(concat('ion-gallery.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(rename('ion-gallery.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function () {
    gulp.src('./src/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./dist'));
});
 