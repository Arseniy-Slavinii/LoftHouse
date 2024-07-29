
const { src, dest, watch } = require('gulp');
const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'));

function buildStyles() {
  return src('../sass/style.sass')
    .pipe(sass())
    .pipe(dest('../css/'));
};

// function watchsass() {
//   return watch('../sass/style.sass', ['sass']);
// }

// gulp.task('sass', function () {
//   return src('../sass/style.sass')
//       .pipe(sass())
//       .pipe(dest('../css/'));
// })

// gulp.task('sass:watch', function() { 
//   watch('app/scss/app.scss', ['sass']);
// })

exports.buildStyles = buildStyles;
// exports.watchsass = watch;