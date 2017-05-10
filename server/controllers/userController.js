var User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');


findUsers = (req, res) => {
  User.find({}).then((users)=>{
    res.send(users)
  })
}

addUser = (req, res) => {
  let user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password,10),
    phone: req.body.phone,
    email: req.body.email
  })
  user.save(function (err, user){
    if (err) res.send(err)
    res.send(user);
  })
}

createToken = (req,res) =>{
  let user = req.user
  User.findOne({username: user.username}).then((user)=>{
    let newToken = jwt.sign({
      _id: user._id
    },'secret',{ expiresIn: '1h' })
    res.send(newToken)
  })
}

findOrCreateUserFb = (req,res) => {
  User.findOne({facebookId: req.params.fb}).then((user)=>{
    if(!user){
      let user = new User({
        facebookId: req.params.fb
      })
      user.save(function(err,user){
        let newToken = jwt.sign({
          _id: user._id
        },'secret',{ expiresIn: '1h' })
        res.send(newToken)
      })
    } else {
      let newToken = jwt.sign({
        _id: user._id
      },'secret',{ expiresIn: '1h' })
      res.send(newToken)
    }
  })
}
module.exports = {addUser, findUsers, createToken, findOrCreateUserFb};