var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username:  String,
  password: String,
  facebookId: String,
  phone: String,
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
});

var User = mongoose.model('User', userSchema);

module.exports = User