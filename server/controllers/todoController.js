var Todo = require('../models/todo')
var User = require('../models/user')

findTodos = (req,res) => {
  let user = req.user
  console.log(req.user)
  User.findOne({_id: user._id})
  .populate('todos')
  .exec((err,data)=>{
    if (err) res.send(err)
    res.send(data)
  })
}

createTodo = (req,res) => {
  let user = req.user
  var todo = new Todo({
    title: req.body.title,
    is_complete: false,
    due_date: req.body.due_date
  })
  todo.save((err, todo)=>{
    if (err) res.send(err)
    let todoId = todo._id
    console.log(todoId)
    res.send(todo)
    User.findOne({_id: user._id}, function(err,user){
      if (err) res.send(err)
      user.todos.push(todoId)
      user.save(function(err,user){
        if(err) res.send(err)
        console.log(user)
      })
    })
  })
}

deleteTodo = (req,res) => {
  let user = req.user
  Todo.remove({_id:req.params.id}, (err, todo)=>{
    if (err) res.send(err)
    res.send(todo)
    User.findOne({_id: user._id}, (err, user)=>{
      if (err) res.send(err)
      user.todos.splice(user.todos.indexOf(req.params.id), 1)
      user.save(function(err,user){
        if(err) res.send(err)
        console.log(user)
      })
    })
  })
}

updateTodo = (req,res) => {
  Todo.findById(req.params.id, (err,todo)=>{
    if (err) res.send(err)
    todo.title = req.body.title || todo.title
    todo.is_complete = req.body.is_complete || todo.is_complete
    todo.due_date = req.body.due_date || todo.due_date
    todo.save((err,todo)=>{
      res.send(todo)
    })
  })
}

module.exports = {findTodos, createTodo, deleteTodo, updateTodo};