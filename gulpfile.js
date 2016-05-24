var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
    browserSync = require('browser-sync').create();


 
gulp.task('sass', function() {
  return gulp.src('scss/stylesheet.scss')
    .pipe(sass({outputStyle: 'compact'}))
    .pipe(autoprefixer('> 1%', 'last 2 versions', 'ie 9', 'Opera 12.1'))
    .pipe(gulp.dest('style'))
});

gulp.task('html', function() {
	return gulp.src('*.html')
});

var serve = require('gulp-serve'); 
gulp.task('serve', serve('public'));
gulp.task('serve-build', serve(['public', 'build']));
gulp.task('serve-prod', serve({
  root: ['public', 'build'],
  port: 80,
  middleware: function(req, res) {
    // custom optional middleware 
  }
}));

gulp.task('browser-sync', function() {
    browserSync.init(["style/*.css", "script/*.js", "*.html"],{
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch', function() {
	gulp.watch('scss/*.scss', ['sass'])
	gulp.watch('*.html', ['html'])
});

gulp.task('default', ['sass', 'watch', 'html', 'browser-sync']);
