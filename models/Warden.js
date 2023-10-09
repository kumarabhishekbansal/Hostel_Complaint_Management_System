// create model of warden in  mongo db having following properties
// name
// phone no.
// email id
// password
// profile pic
// Address
// Hostel assign which take reference to Hostel Model

const mongoose = require('mongoose');
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const wardenSchema = new mongoose.Schema({
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
  role:{
    type:String,
    default:"warden"
  }
},{
  timestamps:true
});

wardenSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmpassword=this.password;
    return next();
  }
  return next();
});

wardenSchema.methods.generateJWT = async function () {
  return await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

wardenSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Warden = mongoose.model('Warden', wardenSchema);

module.exports = Warden;
