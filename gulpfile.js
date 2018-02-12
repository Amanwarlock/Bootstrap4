var gulp = require("gulp");
var browerSync  = require("browser-sync").create();
var sass = require("gulp-sass");

/* 
    - Gulp : a javascript task runner;
    - sass : A css precompiler;
    - Convert scss files using gulp into css that a browser can read;
*/

/* Task -1  */
/**
 * @description{* Compliles SASS into CSS & auto-inject into the browser}
 */
gulp.task("sass task" , function(){
    return gulp.src(["node_modules/bootstrap/scss/bootstrap.scss" , 'src/scss/*.scss']) // array coz we hve multiple targets;
            .pipe(sass())
            .pipe(gulp.dest("src/css"))
            .pipe(browerSync.stream()); // tells browser to load this and reload;
});

/* TASK-2
    - Move the required js files into out src/js folder;
    - With this we are avoiding unnecessary js files from rendering
    - This will increase load time; (avoids unnecessary loading)
 */
gulp.task('js task' , function(){
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js' , 'node_modules/jquery/dist/jquery.slim.min.js' , 'node_modules/popper.js/dist/umd/popper.min.js']) //File locations given in array due to multiple files;
            .pipe(gulp.dest("src/js"))
            .pipe(browerSync.stream()); //Notify the browser;
});

/* Static server + watching scss/html files */
gulp.task('serve' , ['sass task'] ,function(){
    browerSync.init({
        port : 5000 ,
        server : "./src/views"
    });

    gulp.watch(["node_modules/bootstrap/scss/bootstrap.scss" , "src/scss/*.scss"] , ["sass task"]);
    gulp.watch(["src/views/*.html" , "src/*.html"]).on('change' , browerSync.reload);
});

gulp.task('default' , ['js task' ,'serve']);