var gulp = require('gulp'),
   concat = require('gulp-concat'),
   sourcemaps = require('gulp-sourcemaps'),
   handlebars = require('gulp-handlebars'),
   uglify = require('gulp-uglify'),
   sass = require('gulp-sass');

var paths = {
   scripts: 'js/scripts/*.js',
   scripts_concat_output: 'application.min.js',
   scripts_output: 'js/compiled/',
   scss: 'css/sass/*.scss',
   scss_concat_output: 'application.min.css',
   scss_output: 'css/compiled/',
   sourcemaps: './',
   vendor_scripts: 'js/scripts/vendor/**/*.js',
   vendor_scripts_concat_output: 'vendor.min.js',
   vendor_scss: 'css/sass/vendor/**/*.scss',
   vendor_scss_concat_output: 'vendor.min.css',
};

/*Minify js task, compiles js
files and outputs them to minified JS.*/
gulp.task('minify-js',function(){
   return gulp.src(paths.scripts)
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat(paths.scripts_concat_output))
      .pipe(sourcemaps.write(paths.sourcemaps))
      .pipe(gulp.dest(paths.scripts_output));
});

/*Minify scss task, compiles SCSS
files and outputs them to minified CSS.*/
gulp.task('minify-scss',function(){
   return gulp.src(paths.scss)
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}).on('error',sass.logError))
      .pipe(concat(paths.scss_concat_output))
      .pipe(sourcemaps.write(paths.sourcemaps))
      .pipe(gulp.dest(paths.scss_output));
});

/*Minify vendor js task, compiles vendor js
files and outputs them to minified JS.*/
gulp.task('minify-vendor-js',function(){
   return gulp.src(paths.vendor_scripts)
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat(paths.vendor_scripts_concat_output))
      .pipe(sourcemaps.write(paths.sourcemaps))
      .pipe(gulp.dest(paths.scripts_output));
});

/*Minify vendor scss task, compiles vendor SCSS
files and outputs them to minified CSS.*/
gulp.task('minify-vendor-scss',function(){
   return gulp.src(paths.vendor_scss)
      .pipe(sass({outputStyle: 'compressed'}).on('error',sass.logError))
      .pipe(concat(paths.vendor_scss_concat_output))
      .pipe(gulp.dest(paths.scss_output));
});

gulp.task('watch',[]);

gulp.task('default',['minify-js','minify-scss','minify-vendor-js','minify-vendor-scss']);