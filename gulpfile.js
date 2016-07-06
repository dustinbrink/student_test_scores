var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    inject = require('gulp-inject'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    mochaPhantomJS = require('gulp-mocha-phantomjs'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    stylish = require('jshint-stylish'),
    glob = require('glob'),
    browserify = require('browserify'),
    browserSync = require('browser-sync').create(),
    packageJSON  = require('./package');

var isDevelopment = true;
var paths =  packageJSON.gulpPaths;
var jshintConfig = packageJSON.jshintConfig;
var jshintTestConfig = packageJSON.jshintTestConfig;
jshintConfig.lookup = false;
jshintTestConfig.lookup = false;

var getBundleName = function (subname) {
  var names = [paths.build.jsDir + '/' + packageJSON.name, packageJSON.version, 'min.js'];
  if(subname) {
    names.splice(names.length-1, 0, subname);
  }
  return  names.join('.');
};

var onError = function(error) {
  //gutil.log(gutil.colors.magenta('ERROR:'), error.message);
  gutil.log(error.stack);
  //gutil.beep();
  this.emit('end');
};

// Delete the dist directory
gulp.task('clean', function() {
  return gulp
    .src(paths.src.dest, {read: false})
    .on('error', onError)
    .pipe(clean());
});

// Build all scripts
gulp.task('browserify', ['lint', 'test'], function() {
  var bundleStream = browserify({
    basedir: paths.src.base,
    entries: paths.src.indexJS,
    insertGlobals: isDevelopment, 
    debug: isDevelopment
  });

  return bundleStream
    .bundle()
    .on('error', onError)
    .pipe(source(getBundleName()))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: isDevelopment}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.src.dest))
    .on('finish', browserSync.reload);
});

// Build all test scripts
gulp.task('browserify-test', ['lint-test'], function() {
  var files = glob.sync(paths.test.base + '/**/*.test.js');

  var bundleStream = browserify({
    //basedir: paths.test.base,
    entries: files,//paths.test.indexJS,
    insertGlobals: isDevelopment,
    paths: ['./node_modules', paths.src.base],
    debug: isDevelopment
  });

  return bundleStream
    .bundle()
    //.pipe(plumber({errorHandler: onError}))
    .on('error', onError)
    .pipe(source(getBundleName('test')))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: isDevelopment}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.test.dest))
    .on('finish', browserSync.reload);
});

// Copy all other files to dist directly
gulp.task('copy', ['clean'], function() {
  // Copy html
  return gulp
    .src(paths.html, {base: paths.src.base})
    .on('error', onError)
    .pipe(gulp.dest(paths.src.dest));
});

// Lint client scripts
gulp.task('lint', function() {
  jshintConfig.devel = isDevelopment;

  return gulp
    .src(paths.src.base+'/*.js', {base: paths.src.base})
    .on('error', onError)
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter(stylish));
});

// Lint test scripts
gulp.task('lint-test', function() {
  jshintConfig.devel = isDevelopment;

  return gulp
    .src(paths.test.base+'/**/*.js')
    .on('error', onError)
    .pipe(jshint(jshintTestConfig))
    .pipe(jshint.reporter(stylish));
});

// Run Mocha in phantom browser
gulp.task('test-phantom', function() {
  return gulp
    .src(paths.test.dest+'/'+paths.test.indexHTML)
    .on('error', onError)
    .pipe(mochaPhantomJS({
      reporter: 'spec'
    }));
});

gulp.task('test-mochify', function() {
  mochify('./test/*.js', {
    reporter : 'tap',
    cover    : true
  }).bundle();
});

// Inject source files into index.html
gulp.task('injectIndex', ['browserify'], function() {
  var path = paths.src.dest+paths.build.jsDir;

  return gulp
    .src(paths.src.base+'/'+paths.src.indexHTML)
    .on('error', onError)
    
    // inject compiled source js
    .pipe(inject(
      gulp.src([path+'/*.js', path+'/*.css'], {read:false}), {
        ignorePath: paths.src.dest
    }))

    .pipe(gulp.dest(paths.src.dest));
});

// Inject source files into test index.html
gulp.task('injectIndex-test', ['browserify-test', 'copy-mocha'], function() {
  var pathLib = paths.test.dest+paths.build.libDir;
  var path = paths.test.dest+paths.build.jsDir;

  return gulp
    .src(paths.test.base+'/'+paths.test.indexHTML)
    .on('error', onError)
    
    // inject mocha
    .pipe(inject(
      gulp.src([pathLib+'/*.js', pathLib+'/*.css'], {read:false}), {
        //cwd: paths.src.dest,
        //relative: true,
        ignorePath: paths.test.dest,
        addRootSlash: false,
        name: 'mocha'
    }))

    // // inject compiled source js
    // .pipe(inject(
    //   gulp.src(paths.src.dest+paths.build.jsDir+'/*.js', {read:false}), {
    //     ignorePath: paths.src.dest,
    //     addRootSlash: false,
    //     addPrefix: '..'
    // }))

    // inject compiled test js
    .pipe(inject(
      gulp.src(path+'/*.js', {read:false}), {
        ignorePath: paths.test.dest,
        addRootSlash: false,
        name: 'tests'
    }))


    .pipe(gulp.dest(paths.test.dest))
    .on('finish', browserSync.reload);
});

// Copy mocha node-modules
gulp.task('copy-mocha', [], function() {
   return gulp
    .src(paths.test.mocha)
    .on('error', onError)
    .pipe(gulp.dest(paths.test.dest+paths.build.libDir));
});

// Browser Sync webserver
gulp.task('browser-sync', ['build-all'], function() {
  browserSync.init({
    server: {baseDir: paths.src.dest},
    port: 8080,
    logLevel: isDevelopment ? 'debug' : 'silent',
  });
  
});

// Watch for changes and lint, build,, run tests
gulp.task('watch', ['browser-sync'], function() {
  gulp.watch(paths.src.base+'/*.js', ['update-scripts']);
  gulp.watch(paths.test.base+'/**/*.js', ['update-test']);
  gulp.watch(paths.test.base+'/**/*.html', ['injectIndex-test']);
  //gulp.watch(paths.src.dest+'**/*', ['test']);
});


gulp.task('test', ['test-phantom']);
gulp.task('update-scripts', ['browserify']);
gulp.task('update-test', ['browserify-test']);
gulp.task('build-all', ['injectIndex', 'injectIndex-test']);
