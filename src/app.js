const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

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
const sampleDate = [
  {
    id:0,
    tiitle:'sample title',
    description:'sample description',
  },
  {
    id:1,
    tiitle:'sample title 2',
    description:'sample description 2',
  },
  {
    id:2,
    tiitle:'sample title 3',
    description:'sample description 3',
  }
];

app.get('/',(req, res, next)=>{
  const sql = 'select * from todos';
  connection.query(sql, (err, results)=>{
    if(err) throw err;
    res.json(results);
  });
});

app.get('/:id',(req, res, next)=>{
  const id= parseInt(req.params.id);
  const sql = 'select * from todos where ?';
  connection.query(sql, {id:id},(err, results)=>{
    if(err) throw err;
    res.json(results[0]);
  });
});

// app.get('/:id',(req, res, next)=>{
//   const id= parseInt(req.params.id);
//   const singleData=sampleDate.find((singleData)=>singleData.id===id)
//   res.json(singleData);
// });

// app.post('/',(req, res, next)=>{
//   const editData = req.body;
//   console.log(editData);
//   res.json(editData);
// });