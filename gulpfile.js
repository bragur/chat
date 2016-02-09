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
        vendorPrefix + 'angular/angular.js',
        vendorPrefix + 'jquery/dist/jquery.js',
        vendorPrefix + 'bootstrap/dist/js/bootstrap.js',
    ],
       vendorCss = [vendorPrefix + 'bootstrap/dist/css/bootstrap.css'];


// #### Task Definitions ####

gulp.task('default', ['build']);

gulp.task('build', ['less', 'minifyApp', 'minifyVendors', 'minifyVendorCss', 'moveStuff']);

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
        .pipe(gulp.dest('build/css'))
});

gulp.task('minifyApp', function() {
    gulp.src(appFiles)
        .pipe(ngannotate({
            single_quotes: true
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});

gulp.task('minifyVendors', function() {
    // gulp.src(vendorFiles)
    //     .pipe(uglify())
    //     .pipe(concat('vendors.js'))
    //     .pipe(gulp.dest('.'))

    // gulp.src([angularJS, 'vendors.js'])
    //     .pipe(concat('vendor.js'))
    //     .pipe(gulp.dest('build'))

    gulp.src(vendorFiles)
        .pipe(ngannotate())
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('build'))
});

gulp.task('minifyVendorCss', function() {
    gulp.src(vendorCss)
        .pipe(concat('vendor.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('build/css'))
});

gulp.task('moveStuff', function() {
    gulp.src([userPrefix + '*.html'])
        .pipe(gulp.dest('build'))
});
