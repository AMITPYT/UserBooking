const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
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
    phone_no:{
        type: String,
        required: true,
        unique: true,
        min: 10
    },
    Movie:{
        type: String,
        required: true
    },
    Date:{
        type: String,
        required: true
    },
    Time:{
        type: String,
        required: true
    }

  });

  const Booking = mongoose.model('Booking',BookingSchema);
  module.exports = Booking