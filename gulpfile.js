// Adiciona os modulos instalados
const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

// Função para compilar o SASS e adicionar os prefixos
function compilaSass() {
    return gulp
        .src('css/scss/main.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            Browserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream())
}

// Tarefa de gulp para função de SASS
gulp.task('sass', compilaSass)

// Função para juntar o Javascript
function gulpJS() {
    return gulp
        .src('js/main/*.js')
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('js/'))
        .pipe(browserSync.stream())
}

gulp.task('mainjs', gulpJS)

// JS Plugins
// function pluginJS() {
//     return gulp
//         .src(['node_modules/jquery/dist/jquery.min.js'])
//         .pipe(concat('plugins.js'))
//         .pipe(gulp.dest('js/'))
//         .pipe(browserSync.stream())
// }

//gulp.task('pluginjs', pluginJS)

// Função para iniciar o Browser
function browser() {
    browserSync.init({
        server: {
            baseDir: "./"
        }    
    })
}

// Tarefa do browser-sync
gulp.task('browser-sync', browser)


// Função de watch do Gulp
function watch() {
    gulp.watch('css/scss/**/*.scss', compilaSass)
    gulp.watch('js/main/*.js', gulpJS)
    //gulp.watch('js/plugins/*.js', pluginJS)
    gulp.watch(['*.html']).on('change', browserSync.reload)
}

// Inicia a tarefa de watch
gulp.task('watch', watch)

// Tarefa padrão do Gulp que inicia o watch e o browser-sync no momento
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'mainjs'))