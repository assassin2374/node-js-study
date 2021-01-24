const Todo = require('../model/Todo');

const TodoRepsitory = function(connection){
  this.connection = connection;
};

TodoRepsitory.prototype.getAll = function(){
  const sql = 'select * from todos';

  return new Promise((resolve, reject)=>{
    this.connection.query(sql, (err, results)=>{
      if(err) return reject(err.message);
      const todos = results.map((todo)=>new Todo(todo.id, todo.title, todo.description));
      return resolve(todos);
    });
  });
};

TodoRepsitory.prototype.get = function(id){
  const sql = 'select * from todos where ?';

  return new Promise((resolve, reject)=>{
    this.connection.query(sql, {id:id},(err, results)=>{
      if(err) return reject(err.message);
      if(results.length !== 1) return reject('no data');

      const todo = new Todo(results[0].id, results[0].title, results[0].description);
      return resolve(todo);
    });
  });
}

TodoRepsitory.prototype.create = function(todo){
  const sql = 'insert into todos set ?';
  delete todo.id;

  return new Promise((resolve, reject)=>{
    this.connection.query(sql, todo, (err, result)=>{
      return err ? reject(err.message): resolve(result.insertId);
    });
  });
};

TodoRepsitory.prototype.update = function(todo){
  const sql = 'update todos set ? where ?';
  const id = todo.id;
  delete todo.id;
  return new Promise((resolve, reject)=>{
    this.connection.query(sql, [todo, {id: id}], (err, result)=>{
      return err ? reject(err.message): resolve(result);
    });
  });
};

TodoRepsitory.prototype.delete =function(id){
  const sql = 'delete from todos where ?';
  return new Promise((resolve, reject)=>{
    this.connection.query(sql, {id: id}, (err, result)=>{
      return err ? reject(err.message): resolve(result);
    });
  });
};

// app.delete(todosUrl + ':id',(req, res, next)=>{
//   const id= parseInt(req.params.id);
//   const sql = 'delete from todos where ?';
//   connection.query(sql, {id: id}, (err, result)=>{
//     if (err) throw err;
//     res.status(204).json(result[0]);
//   });
// });


module.exports = TodoRepsitory;