const mongoose = require("mongoose");
const UserModel = require("../models/users");
const Schema = mongoose.Schema;

// new Schema ({schema},{settings})
const martialartSchema = new Schema({
  name: {
    type: String,
    enum: ["Kung-Fu","Karate","MMA","Other"],
    required: [true, "What is the discipline"]
  },
  title: {
    type: String,
    required:true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  creator: {
    type: String
  }
}, {
  timestamps: true
});

const martialartModel = mongoose.model("Martialart", martialartSchema);

module.exports = martialartModel;
