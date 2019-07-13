const { src, dest, parallel, watch, series } = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const minify = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("imagemin-webp");
const extReplace = require("gulp-ext-replace");
const del = require("del");
const browserSync = require("browser-sync").create();

function browser() {
    browserSync.init({
        server: {
            baseDir: "build/"
        },
        notify: false,
    })
}
function html() {
    return src("src/*.html")
    .pipe(dest("build"));
}
function css() {
    return src("src/sass/**/*.scss")
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit("end");
        }
    }))
    .pipe(sass({
        includePaths: require('node-normalize-scss').includePaths
    }))
    .pipe(postcss([
        autoprefixer("last 2 version")
    ]))
    .pipe(dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(dest("build/css"))
    .pipe(browserSync.stream());
}
function watchFiles() {
    watch("src/sass/**/*.scss", css);
    watch("src/*.html", html).on("change", browserSync.reload);
}
function images() {
    return src("src/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.jpegtran({progressive: true}),
        imagemin.svgo()
    ]))
    .pipe(dest("build/img"));
}
function exportWebp() {
    return src("src/img/**/*.{png,jpg}")
    .pipe(imagemin([
        webp({
            quality: 75
        })
    ]))
    .pipe(extReplace(".webp"))
    .pipe(dest("build/img"));
}
function copy() {
    return src([
        "src/fonts/**/*.{woff,woff2}",
        "src/img/**",
        "src/js/**",
        "src/css/**"
    ], {
        base: "src"
    })
    .pipe(dest("build"));
}
function clean() {
    return del("build");
}

exports.images = images;
exports.webp = exportWebp;
exports.html = html;
exports.css = css;
exports.default = series(
    series(clean, copy, html, css), 
    parallel(browser, watchFiles)
);
