const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

// Compile SCSS to CSS
gulp.task('styles', () => {
    return gulp.src('./src/scss/**/*.scss') // Source SCSS files
        .pipe(sass().on('error', sass.logError)) // Compile SCSS
        .pipe(cleanCSS()) // Minify CSS
        .pipe(gulp.dest('./dist/css')) // Output folder
        .pipe(browserSync.stream()); // Reload browser
});

// Minify and Bundle JavaScript
gulp.task('scripts', () => {
    return gulp.src('./src/js/**/*.js') // Source JS files
        .pipe(concat('main.js')) // Combine into main.js
        .pipe(uglify()) // Minify JS
        .pipe(gulp.dest('./dist/js')) // Output folder
        .pipe(browserSync.stream()); // Reload browser
});

// Watch for Changes and Live Reload
gulp.task('watch', () => {
    browserSync.init({
        server: { baseDir: './' } // Serve files from the current folder
    });
    gulp.watch('./src/scss/**/*.scss', gulp.series('styles')); // Watch SCSS
    gulp.watch('./src/js/**/*.js', gulp.series('scripts')); // Watch JS
    gulp.watch('./*.html').on('change', browserSync.reload); // Watch HTML
});

// Default Task
gulp.task('default', gulp.series('styles', 'scripts', 'watch'));



//Default Gulp Task
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);

//Build Gulp Task
exports.build = series(scssTask, jsTask);

