var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    ghPages = require('gulp-gh-pages'),
    sourcemaps = require('gulp-sourcemaps'),
    stylus = require('gulp-stylus'),
    eslint = require('gulp-eslint');

gulp.task('stylus', function () {
    return gulp.src('src/stylus/global.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/assets/css'));
});

gulp.task('js',function(){
  gulp.src('src/js/scripts.js')
    .pipe(sourcemaps.init())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(gulp.dest('app/assets/js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/assets/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "app"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('ghpages', function() {
  return gulp.src('./app/**/*')
    .pipe(ghPages());
});

gulp.task('lint', () => {
    return gulp.src(['**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('default', ['stylus', 'js', 'lint', 'browser-sync'], function () {
    gulp.watch("src/stylus/**/*.styl", ['styl']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch("app/*.html", ['bs-reload']);
});
