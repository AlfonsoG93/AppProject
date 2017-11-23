const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// new Schema ({schema},{settings})
const userSchema = new Schema({

    username: {
      type: String,
      required: [true, "Give us your username."]
    },


    email: {
      type: String,
      //  required: [true, "What's your email?"],
      match: [/.+@.+/, 'Emails need to have "@" sign ']
    },

    discipline: {
      type : String
    },

    experience: {
      type : String,
      enum:['beginner','intermidiate','advance', 'expert']
    },

    encryptedPassword: {
      type: String,
      required: [true, "We need a password"]
    }


    // location : {
    //   type:  String
    // }

  },


  //2nd argument -> SETTINGS object

  {
    // automatically add "createdAt" and "updatedAt" Date fields
    timestamps: true

  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
