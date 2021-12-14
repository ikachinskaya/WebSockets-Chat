//'ПОЗВОЛЯЕТ ЭКСПОРТИРОВАТЬ ИЗ ПАПКИ MODELS ЛЮБЫЕ ФАЙЛЫ

//импортируем mongoose
const mongoose = require("mongoose");

//берем из ноды модуль файловой системы, потому что будет работать с файлами
const fs = require("fs");

//берем из ноды модуль пути
const path = require("path");

/*
импортируем из папки config настройку режима (или из переменной окружения, если она есть)
т.е. здесь лежит DB_HOSTNAME, DB_PORT, DB_NAME
*/
const dbConfig = require("../config").db[process.env.NODE_ENV || "development"];

//находим последнюю часть пути, т.е. index.js
const basename = path.basename(__filename);

//создаем БД
const db = {};

/*
подключаем mongoose
передаем строку соединения, в которую достаем настройки из папки config
*/
mongoose.connect(
  `mongodb://${dbConfig.DB_HOSTNAME}:${dbConfig.DB_PORT}/${dbConfig.DB_NAME}`
);
/*
- читаем директорию синхронно
- запускается, когда запустится сервер
- единственное место, в котором при запуске сервера можно делать синхронно
- получим массив с именами файлом, которые есть в models
- файл не должен называться basename, т.е. index.js
- файл должен быть .js
- метод test вызывается у регулярного выражения 
- вернули новый массив с этими файлами
- перебираем полученный массив
- импортируем модель
- передаем путь к текущей директории и имя файла, склеиваем их
- импортируем эти файлы
- обычно require в середине не делается, но здесь можно
- в db создаем свойство с именем этой модели и передаем в него модель
*/
fs.readdirSync(__dirname)
  .filter((fileName) => fileName !== basename && /.js$/.test(fileName))
  .forEach((fileName) => {
    const model = require(path.resolve(__dirname, fileName));
    db[model.modelName] = model;
  });

module.exports = db;
