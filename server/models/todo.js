var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  title: String,
  is_complete: Boolean,
  due_date: Date
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo