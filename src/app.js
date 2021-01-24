const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const Todo = require('./model/Todo');
const TodoRepsitory = require('./repsitory/TodoRepsitory');
const TodoService = require('./service/TodoService');
const TodoController = require('./controller/TodoController');

//#region expressでサーバーの設定

// expressでポート4000にサーバーを起動
const server = app.listen(4000, ()=>{
  console.log('node.js port'+server.address().port);
});

// expressの設定
app.disable('x-powersd-by')
app.use(cors()).use(bodyParser.json());

//#endregion

//#region mysqlに接続

//mysqlに接続
const connection = mysql.createConnection({
  host: 'localhost',
  post: 3306,
  user: 'user',
  password: 'password',
  database: 'sample_database'
});

connection.connect((err) => {
  if(err) throw err;
  console.log('connected saccess');
});

//#endregion

//#region APIのエンドポイント（URL作成）

const todoRepsitory = new TodoRepsitory(connection);
const todoService = new TodoService(todoRepsitory);
const todoController = new TodoController(todoService);
app.use('/api/', todoController.router);

//#endregion