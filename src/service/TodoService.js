const TodoService = function(TodoRepsitory){
  this.todoRepsitory = TodoRepsitory;
}

TodoService.prototype.getAll = async function(){
  return await this.todoRepsitory.getAll();
}

TodoService.prototype.get = async function(id){
  return await this.todoRepsitory.get(id);
}

TodoService.prototype.create = async function(todo){
  return await this.todoRepsitory.create(todo);
}

TodoService.prototype.update = async function(todo){
  return await this.todoRepsitory.update(todo);
}

TodoService.prototype.delete = async function(id){
  return await this.todoRepsitory.delete(id);
}

module.exports = TodoService;