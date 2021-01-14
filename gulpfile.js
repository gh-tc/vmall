var { series , parallel , src , dest , watch } = require('gulp');
var clean = require('gulp-clean');
var fileInclude = require('gulp-file-include');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');

//清理dist文件夹任务
function cleanTask(){

    return src('./dist',{allowEmpty : true})
            .pipe(clean())
}

//处理html任务
function htmlTask(){

    return src('./src/view/*.html')
            .pipe(fileInclude({
                prefix : '@',
                basepath : './src/view/templates' 
            }))
            .pipe(dest('./dist/view'))

}

//开启web服务器进行页面预览
function webserverTask(){

    return src('./dist')
            .pipe(webserver({
                host : 'localhost',
                port : 5000,
                open : './view/index.html',
                livereload : true //实时自动发起的
            }))

}

//同步static资源到dist文件
function staticTask(){

    return src('./src/static/**')
            .pipe(dest('./dist/static'));
}

//同步 api 资源到 dist 文件
function apiTask(){

    return src('./src/api/**')
            .pipe(dest('./dist/api'));
}

//同步 lib 资源到 dist 文件
function libTask(){

    return src('./src/lib/**')
            .pipe(dest('./dist/lib'));
}

//同步 js 源到 dist 文件
function jsTask(){

    return src('./src/js/**')
            .pipe(dest('./dist/js'));
}

//scss 文件转换成 css
function sassTask(){

    return src('./src/css/*.scss')
            .pipe(sass())
            .pipe(dest('./dist/css'))
}


//实时将src中的文件更新到dist文件
function watchTask(){

    watch('./src/view/**' , htmlTask);
    watch('./src/static/**' , staticTask);
    watch('./src/api/**' , apiTask);
    watch('./src/lib/**' , libTask);
    watch('./src/css/**' , sassTask);
    watch('./src/js/**' , jsTask);
}




module.exports = {
    //开发阶段调用接口
    dev : series(cleanTask , parallel( htmlTask , staticTask , apiTask , libTask , sassTask , jsTask ) , parallel( webserverTask , watchTask )),
    //生产阶段调用接口
    build : series(cleanTask)
}