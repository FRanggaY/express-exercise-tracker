const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type:String, required:true},
    log: [{
      description: {type:String,required:false},
      duration: {type:Number,required:false},
      date: {type:String, required:false}
    }]
  
  }
);
  
const User = mongoose.model('User', UserSchema);
module.exports = User;
// const User = mongoose.model('User', UserSchema);