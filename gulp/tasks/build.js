var gulp = require('gulp');

gulp.task('build', ['browserify', 'markup', 'sass', 'fonts', 'muiFonts']);
