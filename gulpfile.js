const { src, watch, dest, parallel}=require('gulp');
const sass =require("gulp-sass") (require('sass'));
const plumber= require('gulp-plumber');

//imagenes 
const webp= require('gulp-webp');
const imagemin=require('gulp-imagemin');
const cache=require('gulp-cache');
const avif=require('gulp-avif');

function css(done) {
//identificar el archivo sass
src("src/scss/**/*.scss")
.pipe(plumber())
// compilarlo
.pipe(sass())
//almacenarlo
.pipe(dest("build/css"))
    done();
}
 
function imagenes(done) {
const opciones= {
optimizationlevel: 3
}
src('src/img/**/*.{png,jpg}')
.pipe(cache(imagemin(opciones)))
.pipe(dest('build/img'))
done();
}
function versionWebp(done) {
const opciones = {
    quality: 50
}
src('src/img/**/*.{png,jpg}')
.pipe(webp(opciones))
.pipe(dest('build/img'))
done();
    
}

function versionAvif(done) {
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{png,jpg}')
    .pipe(avif(opciones))
    .pipe(dest('build/img'))
    done();
}

function javascript(done) {
src('src/js/**/*.js')
.pipe(dest('build/js'))
done();

}
function dev(done) {
watch("src/scss/**/*.scss", css)
watch('src/js/**/*.js', javascript)
    done();
}



exports.css=css;
exports.versionAvif=versionAvif;
exports.versionWebp=versionWebp;
exports.imagenes=imagenes;
exports.javascript=javascript;
exports.dev=parallel(versionWebp, javascript, imagenes, versionAvif, dev);



// 