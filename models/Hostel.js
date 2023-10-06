// create model of Hostel in  mongo db having following properties
// name
// Description
// Total rooms  (number)
// Rooms available (number)
// Total floors (number)
// Total students (number)
// Students count (number)

const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  hostel_name: {
    type: String,
    required: true,
  },
  hostel_description: {
    type: String,
  },
  totalRooms: {
    type: Number,
    required: true,
  },
  roomsAvailable: {
    type: Number,
    required: true,
  },
  totalFloors: {
    type: Number,
    required: true,
  },
  totalStudents: {
    type: Number,
    required: true,
  },
  avialableStudents:{
    type:Number,
    default:0,
  }
});

const Hostel = mongoose.model('Hostel', hostelSchema);

module.exports = Hostel;
