var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  fullname : String,
  username:  String,
  password: String,
  email: String,
  facebookId: String,
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
});

var User = mongoose.model('User', userSchema);

module.exports = User