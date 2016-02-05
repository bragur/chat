var        gulp = require('gulp'),
         uglify = require('gulp-uglify'),
          ngmin = require('gulp-ngmin'),
         jshint = require('gulp-jshint'),
         concat = require('gulp-concat'),
         cssmin = require('gulp-cssmin'),
           less = require('gulp-less'),
           path = require('path'),
    browserSync = require('browser-sync');

var appFiles = [
    'App.js',
];

var vendorPrefix = 'node_modules/';

var vendorFiles = [
    vendorPrefix + 'jquery/dist/jquery.js',
    vendorPrefix + 'bootstrap/dist/js/bootstrap.js',
]

var vendorCss = [
	vendorPrefix + 'bootstrap/dist/css/bootstrap.css',
]

var angularJS = vendorPrefix + 'angular/angular.min.js';


gulp.task('default', ['build']);
gulp.task('build', ['less', 'minifyApp', 'minifyVendors', 'minifyVendorCss', 'moveStuff']);

gulp.task('jshint', function() {
    gulp.src(appFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
});

gulp.task('less', function() {
    gulp.src('less/**/*.*')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(cssmin())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('build/css'))
});

gulp.task('minifyVendorCss', function() {
	gulp.src(vendorCss)
		.pipe(concat('vendor.min.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('build/css'))
});

gulp.task('minifyApp', function() {
    gulp.src(appFiles)
        .pipe(ngmin())
        .pipe(gulp.dest('build'))
});

gulp.task('minifyVendors', function() {
    gulp.src(vendorFiles)
	    .pipe(uglify())
	    .pipe(concat('vendors.js'))
	    .pipe(gulp.dest('.'))

    gulp.src([angularJS, 'vendors.js'])
    	.pipe(concat('vendor.js'))
    	.pipe(gulp.dest('build'))
});

gulp.task('moveStuff', function() {
	gulp.src(['*.html'])
		.pipe(gulp.dest('build'))
});