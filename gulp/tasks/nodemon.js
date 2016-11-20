var gulp = require('gulp');
var nodemon = require('nodemon');

gulp.task('nodemon', function() {
  nodemon({
    script: './bin/www',
    watch: 'index.js'
  });
});