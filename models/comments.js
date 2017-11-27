const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({

  content: {
    type: String,
    required: true
  },

  //author username
  authorUname: {
    type: String,
    required: true,
    minlength: 3
  },
  post: {
    type: Schema.Types.ObjectId
  }

});

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = commentModel;
