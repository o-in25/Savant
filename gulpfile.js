var gulp = require('gulp');
var pug = require('gulp-pug');

gulp.task('html', function(){
    return gulp.src('client/templates/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('build/html'))
});

gulp.task('default', [ 'html', 'css', 'js' ]);