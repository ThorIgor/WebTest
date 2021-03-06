/**
 * Created by chaika on 09.02.16.
 */
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

function configureEndpoints(app) {
    
    var pages = require('./pages');
    var api = require('./api');
    
    app.set("view engine", "ejs");
    //Налаштування URL за якими буде відповідати сервер
    //Отримання списку піц
    app.get('/', pages.getMainPage);
    app.get('/testPage',pages.getTestPage);
    app.get('/testPage/getTest/',api.getTest);
    app.get('/testPage/getAllTests/',api.getTestList);
    app.get('/search/',api.getSearchResults);

    //Якщо не підійшов жоден url, тоді повертаємо файли з папки www
    app.use(express.static(path.join(__dirname, '../Frontend/www')));
}

function startServer(port) {
    var app = express();

    //Налаштування директорії з шаблонами
    app.set('views', path.join(__dirname, 'views'));
    //app.set('view engine', 'ejs');

    //Налаштування виводу в консоль списку запитів до сервера
    app.use(morgan('dev'));

    //Розбір POST запитів
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    //Налаштовуємо сторінки
    configureEndpoints(app);

    //Запуск додатка за вказаним портом
    app.listen(port, function () {
        console.log('My Application Running on http://localhost:'+port+'/');
    });
}

exports.startServer = startServer;