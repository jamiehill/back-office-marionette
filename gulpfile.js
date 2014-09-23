var gulp = require('gulp'),
    gutil = require('gulp-util'),
    size = require('gulp-size'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    changed = require('gulp-changed'),
    watcher = require('gulp-watch'),
    chalk = require('chalk'),
    async = require('async'),
    open = require('gulp-open'),
    livereload = require('connect-livereload'),
    connect = require('connect'),
    http = require('http');
    opn = require('opn');
    path = require('path');
    gclean = require('gulp-clean'),
    debug = require('gulp-debug');
    express = require('express'),
    glivereload = require('gulp-livereload');


/*
 Properties ------------------------------------------------
 */


var PROD    = (gutil.env.type === 'production'),
    DEV     = (PROD === false),
    server  = require('gulp-connect');


/*
 Task runners ----------------------------------------------
 */


gulp.task('default', function () {
    chain(styles, watch, startExpress);
});


/*
 General -----------------------------------
 */


/**
 * Compiles all scss/sass styles to app.css
 * @param function cb async sequencial callback method
 */
function styles(cb) {
    gutil.log('Rebuilding application styles ---');
    gulp.src('./src/styles/styles.scss')
        .pipe(changed('./css'))
        .pipe(sass({
            includePaths: './src/styles',
            outputStyle: 'expanded',
            sourceComments: 'map'
        }))

        .pipe(prefixer('last 2 versions', {map: false }))
        .pipe(size({ showFiles: true }))
        .pipe(gulp.dest('./src/styles'))
        .pipe(server.reload())

        .on('end', cb || function(){})
        .on('error', gutil.log);
}


/**
 * [watch description]
 * @param function cb async sequencial callback method
 */
function watch(cb) {
    gulp.watch('./src/styles/**/*.scss', function (event) {
        chainReload([styles], event.path);
    });

    cb();
}


/*
 Server -----------------------------------
 */

function startExpress(cb) {
    server.server({
        port: 8000,
        livereload: true
    });
    opn('http://localhost:8000/src/index.html');
    cb();
}


function open(cb) {
    gulp.src('./src/index.html')
        .pipe(open("<%file.path%>", {url: 'http://localhost:3000'}));
    cb();
}


function chain() {
    var tasks = Array.prototype.slice.call(arguments);
    async.eachSeries(tasks, invoke);
}


function chainReload() {
    var args = Array.prototype.slice.call(arguments);
    async.eachSeries(args[0], invoke, function () {
        gutil.log(chalk.bgMagenta(' Reload: ' + args[1] + " ------- "));
//        server.reload();
    });
}


function invoke(func, cb) {
    var name = func.name.charAt(0).toUpperCase() + func.name.slice(1);
    gutil.log('Invoke: ' + chalk.red(name + ' -------------------'));

    func.apply(this, [cb || callback]);
}


function callback() {
    gutil.log(chalk.green('callback'));
}