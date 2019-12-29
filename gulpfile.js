const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const rimraf = require('rimraf')
const autoprefixer = require('gulp-autoprefixer');

const browserSync = require('browser-sync').create();


function processCSS(cb) {
    gulp.src('src/scss/*.scss')
        .pipe(concat('all.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ cascade: false }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream());
    cb();
}

function copyFontello(cb) {
    gulp.src('src/fonts/*.*', { allowEmpty: true})
        .pipe(gulp.dest('build/fonts'));
    cb();
}

function processHTML(cb) {
    gulp.src('src/*.html')
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream());
    cb();
}

function processIMG(cb) {
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
    cb();
}

function processJS(cb) {
    gulp.src('src/js/*.js')
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.stream());
    cb();
}

function spyCSS(cb) {
    gulp.watch('src/scss/*.scss', processCSS);
    cb();
}

function spyHTML(cb) {
    gulp.watch('src/*.html', processHTML);
    cb();
}

function spyIMG(cb) {
    gulp.watch('src/img/*', processIMG);
    cb();
}

function spyJS(cb) {
    gulp.watch('src/js/*.js', processJS);
    cb();
}

function spyFontello(cb) {
    gulp.watch('src/fonts/*.*', copyFontello);
    cb();
}

function removeBuild(cb) {
    rimraf('build', cb);
    cb();
}

function reload(cb) {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    })
    cb();
}

exports.default = gulp.series(removeBuild, processHTML, processCSS, processIMG, processJS, copyFontello,  gulp.parallel(spyHTML, spyCSS, spyIMG, spyJS, spyFontello, reload));


