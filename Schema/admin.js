const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
    role:{
        type: String,
        default: "Admin"
    },
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min:8
    },

  });

  const Admin = mongoose.model('Admin',AdminSchema);
  module.exports = Admin