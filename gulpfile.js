const { src, dest, watch, series, parallel } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));

const paths = {
   scripts: 'js/scripts/*.js',
   scripts_concat_output: 'application.min.js',
   scripts_output: 'js/compiled/',
   scss: 'css/sass/*.scss',
   scss_concat_output: 'application.min.css',
   scss_output: 'css/compiled/',
   vendor_scripts: 'js/scripts/vendor/**/*.js',
   vendor_scripts_concat_output: 'vendor.min.js',
   vendor_scss: 'css/sass/vendor/**/*.scss',
   vendor_scss_concat_output: 'vendor.min.css',
};

/* Minify JS task: compiles JS files and outputs them to minified JS. */
function minifyJs() {
   return src(paths.scripts, { sourcemaps: true })
      .pipe(uglify())
      .pipe(concat(paths.scripts_concat_output))
      .pipe(dest(paths.scripts_output, { sourcemaps: '.' }));
}

/* Minify SCSS task: compiles SCSS files and outputs them to minified CSS. */
function minifyScss() {
   return src(paths.scss, { sourcemaps: true })
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(concat(paths.scss_concat_output))
      .pipe(dest(paths.scss_output, { sourcemaps: '.' }));
}

/* Minify vendor JS task: compiles vendor JS files and outputs them to minified JS. */
function minifyVendorJs() {
   return src(paths.vendor_scripts, { sourcemaps: true })
      .pipe(uglify())
      .pipe(concat(paths.vendor_scripts_concat_output))
      .pipe(dest(paths.scripts_output, { sourcemaps: '.' }));
}

/* Minify vendor SCSS task: compiles vendor SCSS files and outputs them to minified CSS. */
function minifyVendorScss() {
   return src(paths.vendor_scss)
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(concat(paths.vendor_scss_concat_output))
      .pipe(dest(paths.scss_output));
}

/* Watch task: watches for changes in JS and SCSS files. */
function watchFiles() {
   watch(paths.scripts, minifyJs);
   watch(paths.scss, minifyScss);
   watch(paths.vendor_scripts, minifyVendorJs);
   watch(paths.vendor_scss, minifyVendorScss);
}

// Export tasks for CLI access
exports['minify-js'] = minifyJs;
exports['minify-scss'] = minifyScss;
exports['minify-vendor-js'] = minifyVendorJs;
exports['minify-vendor-scss'] = minifyVendorScss;
exports.watch = watchFiles;
exports.default = parallel(minifyJs, minifyScss, minifyVendorJs, minifyVendorScss);