var gulp = require('gulp');
var config = require('../config').markup;
var path = require('path');

gulp.task('external', function() {
  var file = path.join(__dirname, '../../node_modules/react-image-gallery/styles/css/image-gallery.css');
  return gulp.src(file)
    .pipe(gulp.dest(config.dest));
});