const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserModel = require("../models/users");
// new Schema ({schema},{settings})
const messageSchema = new Schema({

  sender: {
    type: Schema.Types.ObjectId,
  },

  content: {
    type: String
  },

  reciever :{
    type: String,
  }
},

{
  timestamps: true
});

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
