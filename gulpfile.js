  var gulp = require('gulp'),
  watch = require('gulp-watch'),
  prefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  rigger = require('gulp-rigger'),
  cssmin = require('gulp-clean-css'),
  imagemin = require('gulp-imagemin'),
  svgSymbols = require('gulp-svg-symbols'),
  svgstore = require('gulp-svgstore'),
  svgmin = require('gulp-svgmin'),
  cheerio = require('gulp-cheerio'),
  replace = require('gulp-replace'),
  rename = require('gulp-rename'),
  pngquant = require('imagemin-pngquant'),
  rimraf = require('rimraf'),
  size = require('gulp-size'),
  browserSync = require('browser-sync'),
  pug = require('gulp-pug'),
  reload = browserSync.reload;

  var $ = {
    gutil: require('gulp-util'),
    svgSprite: require('gulp-svg-sprite'),
    svg2png: require('gulp-svg2png'),
    size: require('gulp-size'),
  }

  var path = {
      build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
      },
      src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        pug: 'src/pages/*.pug',
        pugAll: 'src/**/*.pug',
        js: 'src/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.woff'
      },
      watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        pugAll: 'src/**/*.pug',
        js: 'src/js/**/*.js',
        style: 'src/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
      },
      clean: './build'
    };

    var config = {
      server: {
        baseDir: "./build"
      },
      tunnel: true,
      host: 'localhost',
      port: 3000
    };

  //Pug assembly
  gulp.task('pug:build', function () {
      gulp.src(path.src.pug) //Выберем файлы по нужному пути
          .pipe(pug({pretty: true, doctype: 'html'}))
          .pipe(gulp.dest(path.build.html))
          .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
        });

  //Html assembly
  gulp.task('html:build', function () {
      gulp.src(path.src.html) //Выберем файлы по нужному пути
          .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
          .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
        });

  //JS assembly
  gulp.task('js:build', function () {
      gulp.src(path.src.js) //Найдем наш main файл
          .pipe(rigger()) //Прогоним через rigger

          .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
          .pipe(reload({stream: true})); //И перезагрузим сервер
        });

  //Style assembly
  gulp.task('style:build', function () {
      gulp.src(path.src.style) //Выберем наш main.scss
          .pipe(sass()) //Скомпилируем
          .pipe(prefixer()) //Добавим вендорные префиксы
          .pipe(cssmin()) //Сожмем
          .pipe(gulp.dest(path.build.css)) //И в build
          .pipe(reload({stream: true}));
        });

  //Img assembly
  gulp.task('image:build', function () {
      gulp.src(path.src.img) //Выберем наши картинки
          .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
          }))
          .pipe(gulp.dest(path.build.img)) //И бросим в build
          .pipe(reload({stream: true}));
        });

  // Сборка SVG-спрайта для блока sprite-svg--localstorage
  gulp.task('svg:build', function () {
    return gulp.src('src/img/svg/*.svg')
    .pipe(svgmin(function (file) {
      return {
        plugins: [{
          cleanupIDs: {
            minify: true
          }
        }]
      }
    }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(cheerio(function ($) {
      $('svg').attr('style',  'display:none');
      $('[fill]').removeAttr('fill');
      $('[stroke]').removeAttr('stroke');
    }))
    .pipe(rename('sprite-svg.svg'))
    .pipe(size({
      title: 'Размер',
      showFiles: true,
      showTotal: false,
    }))
    .pipe(gulp.dest(path.build.img))
  });

  //Fonts assembly
  gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
  });

  //Gulp watch
  gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
      gulp.start('html:build');
    });
    watch([path.watch.pugAll], function(event, cb) {
      gulp.start('pug:build');
    });
    watch([path.watch.style], function(event, cb) {
      gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
      gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
      gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
      gulp.start('fonts:build');
    });
  });

  //Tasks

  //Task build
  gulp.task('build', [
    'html:build',
    'pug:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'svg:build'
    ]);

  //Task webserver
  gulp.task('server', function () {
    browserSync(config);
  });

  //Task clean build
  gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
  });

  //Task default
  gulp.task('default', ['build', 'server', 'watch']);
