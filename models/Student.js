// create model of student in  mongo db having following properties
// name
// phone no.
// email id
// password
// profile pic
// Address
// Hostel assign which take reference to Hostel Model
// Room no.
// Department
// Floor no.    
// Confirm password

const mongoose = require('mongoose');
const bcrypt=require("bcryptjs");
const studentSchema = new mongoose.Schema({
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
  roomNo: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  floorNo: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    default:"student"
  }
});

studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmpassword=this.password;
    return next();
  }
  return next();
});

studentSchema.methods.generateJWT = async function () {
  return await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

studentSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
