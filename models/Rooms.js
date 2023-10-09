// create database for rooms in mongodb have following properties
// hostel_id which takes refernce from another model Hostel
// // array of object having room numbers as key and a value count that is no. of students can be accomadate to that room and default value is 4

const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hostel', // Reference to the Hostel model
    required: true,
  },
  rooms: [
    {
      roomNumber: {
        type: Number,
        required: true,
      },
      floor:{
        type:Number,
        required:true,
      },
      capacity: {
        type: Number,
        default: 4, // Default capacity for each room is 4 students
      },
    },
  ],
},{
  timestamps:true
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
