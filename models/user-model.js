const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myUserSchema = new Schema(
  {     //1st Argument ->structure Object
    fullname: {type: String},
    username: {type: String},
    encryptedPassword: {type: String},
  },

  {     //2nd Argument -> additional settings
    tinestamps: true,
        // timestamps create two additional fields: "createAt" & "updatedAt"
  }
);

const UserModel = mongoose.model('User', myUserSchema);


module.exports = UserModel;
