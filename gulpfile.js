// #### Initialize ####

// ### Gulp requirements ###
var        gulp = require('gulp'),
         uglify = require('gulp-uglify'),
     ngannotate = require('gulp-ng-annotate'),
         jshint = require('gulp-jshint'),
         concat = require('gulp-concat'),
         cssmin = require('gulp-cssmin'),
           less = require('gulp-less'),
           path = require('path'),
    browserSync = require('browser-sync'),
        stylish = require('jshint-stylish');

// 

var   userPrefix = 'src/',
        appFiles = [userPrefix + 'App.js'],
    vendorPrefix = 'node_modules/',
     vendorFiles = [
        vendorPrefix + 'jquery/dist/jquery.js',
        vendorPrefix + 'angular/angular.js',
        vendorPrefix + 'bootstrap/dist/js/bootstrap.js',
    ],
       vendorCss = [vendorPrefix + 'bootstrap/dist/css/bootstrap.css'];


// #### Task Definitions ####

gulp.task('default', ['build']);

gulp.task('build', ['less', 'minifyApp', 'minifyVendors', 'minifyVendorCss', 'moveStuff'], function() {
    console.log('-- Build complete. Have fun.');
});

gulp.task('jshint', function() {
    gulp.src(appFiles)
        .pipe(jshint({
            "curly":  true,
            "immed":  true,
            "newcap": true,
            "noarg":  true,
            "sub":    true,
            "boss":   true,
            "eqnull": true,
            "node":   true,
            "undef":  true,
            "globals": {
                "angular": false,
                "_":       false,
                "jQuery":  false,
                "$":       false,
                "moment":  false,
                "console": false,
                "io":      false,
            },
        }))
        .pipe(jshint.reporter(stylish))
});


// ### Build dependencies

gulp.task('less', function() {
    gulp.src(userPrefix + 'less/**/*.*')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(cssmin())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('build/css'));

    console.log('-- All files in folder /less minified.');
});

gulp.task('minifyApp', function() {
    gulp.src(appFiles)
        .pipe(ngannotate({
            single_quotes: true
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build'));

    var i = 0;
    appFiles.forEach( function(element) {
        i++;
        console.log('** ' + element)
    });
    console.log('-- ' + i + ' file(s) were minified to app.js');
});

gulp.task('minifyVendors', function() {
    gulp.src(vendorFiles)
        .pipe(ngannotate())
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('build'))

    var i = 0;
    vendorFiles.forEach( function(element) {
        i++;
        console.log('** ' + element);
    });
    console.log('-- ' + i + ' file(s) were minified to vendor.js');
});

gulp.task('minifyVendorCss', function() {
    gulp.src(vendorCss)
        .pipe(concat('vendor.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('build/css'))

    var i = 0;
    vendorCss.forEach( function(element) {
        i++;
        console.log('** ' + element);
    });
    console.log('-- ' + i + ' file(s) were minified to vendor.min.js');
});

gulp.task('moveStuff', function() {
    gulp.src([userPrefix + '*.html'])
        .pipe(gulp.dest('build'))

    console.log('-- All HTML-files were copied to build folder')
});
