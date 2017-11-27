const mongoose = require("mongoose");

const Schema = mongoose.Schema;
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
    required:[true, "Need recipient of message"]
  }
},

{
  timestamps: true
});

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
