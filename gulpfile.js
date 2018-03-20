
//** ******************** **//
//** Runs on Node v.8.6.0 **//
//** ******************** **//

var   gulp = require('gulp'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify'),
      gulpIf = require('gulp-if'), 
      imagemin = require('gulp-imagemin'),
      gulpSequence = require('gulp-sequence'),
      del = require('del'),
      jshint = require('gulp-jshint'),
      stylish = require( 'jshint-stylish' ),
      autoprefixer = require('gulp-autoprefixer'),
      fileinclude = require('gulp-file-include'),
      browserSync = require('browser-sync').create();


// paths & files
var path = {
        src: 'src/',
        html: 'src/**/*.html',
        ignoreInc: 'src/inc/**/*.html',
        distHtml: 'dist/**/*.html',
        js: 'src/js/**/*.js',
        distJs: 'dist/js/',
        sass: 'src/sass/**/*.scss',
        css: 'src/css/',
        distCss: 'dist/css/',
        img: 'src/img/**/*.+(png|jpg|gif|svg)',
        distImg: 'dist/img/',
        dist: 'dist/',
};



// compile SCSS
gulp.task( 'sass', function() {
  gulp.src( path.sass ) // Where we get the sass files from
    .pipe( sass({
      outputStyle: [ 'compressed' ],
      sourceComments: 'normal',
      errLogToConsole: true
    })) //pipe this through gulp-sass to convert it
    .pipe( autoprefixer() )
    .pipe( gulp.dest( path.distCss ) ) //Send the results here
    .pipe(browserSync.reload({ stream: true }));
});

// HTML
gulp.task('html', function(){
  return gulp.src([ path.html, '!' + path.ignoreInc ] )
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(path.dist))
    .pipe(browserSync.reload({ stream: true }));
});


// JS-Hinting
gulp.task( 'jshint', function() {
  gulp.src( 'src/js/*.js' )
    .pipe( jshint() )
    .pipe( jshint.reporter( stylish ) );
});

// JAVASCRIPT non-min
gulp.task('js', function() {
  gulp.src([ path.js ])
  .pipe( gulp.dest( path.distJs ) )
  .pipe( browserSync.reload({ stream: true }) );
});

//IMG non-min
gulp.task('img', function(){
  gulp.src([ path.img ])
  .pipe(gulp.dest( path.distImg ))
});



//** PRODUCTION BUILD TASKS **//
//** **************** **//

  // JAVASCRIPT MINIFIED
    gulp.task('js-min', function() {
      gulp.src([path.js])
      .pipe(gulpIf('*.js', uglify()))
      .pipe(gulp.dest(path.distJs))
      .pipe(browserSync.reload({ stream: true }));
    });

  //IMG OPTIMISED
   gulp.task('img-opt', function(){
    gulp.src([ path.img ])
    .pipe( imagemin() )
    .pipe(gulp.dest( path.distImg ))
  });

//** *************** **//



gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist/'
    },
    port: 3000,
    notify: false
  })
})


//Clean dist folder when running gulp
gulp.task('clean', function () {
  return del([ 'dist/**/*' ]);
});


// Gulp watch for file changes
gulp.task('watch', ['browserSync'], function (){
  gulp.watch( path.js, ['jshint'] );
  gulp.watch( path.js, ['js'] );
  gulp.watch( path.html, ['html'] );
  gulp.watch( path.sass, ['sass'] );
  // Other watchers
})

// DEFAULT task
gulp.task( 'default', function(cb){
  gulpSequence(['clean'], ['js', 'sass', 'img'], ['html'], ['watch'] )(cb);
});


// BUILD FOR PRODUCTION
gulp.task( 'build', function(cb){
  gulpSequence(['clean'], ['js-min', 'sass', 'img-opt'], ['html'], ['watch'] )(cb);
});


