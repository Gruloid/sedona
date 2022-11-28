const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const clean = require("del");
const webp = require("gulp-webp");

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Mincss

const stylesMin = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}
exports.stylesMin = stylesMin;

// Html

const htmlMin = () => {
  return gulp.src("source/*.html")
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest("build"))
};

exports.htmlMin = htmlMin;

//Copy

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff,woff2}",
    "source/*.ico",
    "source/js/*.js"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

//Delete

const del = () => {
  return clean("build")
}

exports.del = del;

// optimg

const minImg = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({quality: 75, progressive: true}),
	    imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
};

exports.minImg = minImg;

//CreateWebP

const createWebP = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp())
    .pipe(gulp.dest("build/img"))
}

exports.createWebP = createWebP;

//build

const build = gulp.series(
  del,
  copy,
  minImg,
    gulp.parallel(
      htmlMin,
      stylesMin,
      createWebP
      ),
  );

  exports.build = build;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  styles, server, watcher
);
