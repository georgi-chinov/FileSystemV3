var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jsFiles = ['*.js', '**/*.js'];
gulp.task('serve', function() {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            "PORT": 3000
        },
        watch: jsFiles
    };
    return nodemon(options);
});
gulp.task('default', ['serve']);
