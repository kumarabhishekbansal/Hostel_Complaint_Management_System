// create model of office in mongo db having following properties
// name
// phone no.
// email id
// password
// profile pic
// Address

const mongoose = require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const officerSchema = new mongoose.Schema({
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
  role: {
    type: String,
    default: "Officer",
  },
  gender:{
    type:String,
    default:""
  },
  dob:{
    type:Date,
    default:""
  }
},{
  timestamps:true
});

officerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmpassword=this.password;
    return next();
  }
  return next();
});

officerSchema.methods.generateJWT = async function () {
  return await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

officerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Officer = mongoose.model("Officer", officerSchema);


module.exports = Officer;
