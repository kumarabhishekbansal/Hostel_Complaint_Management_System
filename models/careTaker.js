// create model of caretaker in  mongo db having following properties
// name
// phone no.
// email id
// password
// confirm password
// profile pic
// Address
// Hostel assign which take reference to Hostel Model

const mongoose = require('mongoose');

const caretakerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String, // Store the file path or URL to the profile picture
  },
  address: {
    type: String,
  },
  // Reference to Hostel Model
  hostelAssign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hostel',
  },
  role:{
    type:String,
    default:"caretaker"
  }
});

const Caretaker = mongoose.model('Caretaker', caretakerSchema);

module.exports = Caretaker;
