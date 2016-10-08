/**
 * 
 */
var gulp = require('gulp'),
	concat = require('gulp-concat');

//var watch = require('gulp-watch');


var jsPath = ['./app/**/*.js', './node_modules/angular/angular.min.js'];
/*[
  '/path/to/app.js',
  '/path/to/mymodule/mymodule.js',
  '/path/to/mymodule/mymodule/*.js'
]
 * */
gulp.task('js-concat', function () {
gulp.src(jsPath)
    .pipe(concat('concat.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
gulp.watch(jsPath, ['js-concat']);
});

gulp.task('default', ['js-concat', 'watch']);



