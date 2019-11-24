var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssdeclsort = require('css-declaration-sorter');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var mozjpeg = require('imagemin-mozjpeg');

// scss compile
gulp.task('sass', function() {
return gulp
.src( './sass/**/*.scss' )
.pipe( plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }) )
.pipe( sass({outputStyle: 'expanded'}))
.pipe( postcss([ autoprefixer() ]) )
.pipe( postcss([ cssdeclsort({ order: 'alphabetically' }) ]) )
.pipe(gulp.dest('css'));
});

// watch
gulp.task( 'watch', function() {
gulp.watch( './sass/**/*.scss', gulp.task('sass') );
});

// default
gulp.task('default', gulp.series(gulp.parallel('watch')));

//圧縮率の定義
var imageminOption = [
pngquant({ quality: [70-85], }),
mozjpeg({ quality: 85 }),
imagemin.gifsicle({
interlaced: false,
optimizationLevel: 1,
colors: 256
}),
imagemin.jpegtran(),
imagemin.optipng(),
imagemin.svgo()
];
// 画像の圧縮
gulp.task('imagemin', function () {
return gulp
.src('./src/img/base/*.{png,jpg,gif,svg}')
.pipe(imagemin(imageminOption))
.pipe(gulp.dest('./src/img'));
});