// create a model for complaints in mongodb which has following properties

// student id which takes reference from another model of student
// issue 
// status
// created date
// tags
// assigned to which takes refernce from another model of care taker

const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Reference to the Student model
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  status: {                 // status can be pending,approved,Inprogress,completed
    type: String,
    default:"Pending"
  },
  createdDate: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
  tags: {
    type: String, // Store tags as an array of strings
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caretaker', // Reference to the Caretaker model
  },
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
