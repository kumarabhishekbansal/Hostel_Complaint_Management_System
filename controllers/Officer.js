const Officer = require("../models/Officer");
const validator = require('validator');
const { add_warden_by_officer,get_all_warden_for_officers } = require("./Warden");
const {add_care_taker_by_officer,get_all_care_taker_for_officers}=require("./careTaker");



// // Create a new office record
// const newOffice = new Officer({
//   name: "John Doe",
//   phoneNo: "555-123-4567",
//   email: "officer@example.com",
//   password: "securepassword",
//   profilePic:
//     "https://images.pexels.com/photos/6069475/pexels-photo-6069475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   address: "Near Babbage block chitkara university",
// });

// // Save the office record to the database
// newOffice
//   .save()
//   .then((office) => {
//     console.log("Office created:");
//   })
//   .catch((error) => {
//     console.error("Error creating office:", error);
//   });

// login to officer account

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let officer = await Officer.findOne({ email });
    if (!officer) {
      throw new Error("EMAIL NOT FOUND");
    }
    if (await officer.comparePassword(password)) {
      return res.status(201).json({
        _id: officer._id,
        name: officer.name,
        phoneNo: officer.phoneNo,
        email: officer.email,
        profilePic: officer.profilePic,
        address: officer.address,
        role: officer.role,
      });
    }
  } catch (error) {
    console.log("error while login in officer");
  }
};

// after login officer successfully adds hostels by authorization

// after adding hostels now it is our duty to add warden

const add_warden = async (req, res, next) => {
  try {
    const { name, phoneNo, email, password, hostelAssign, role } = req.body;
    const data = req.body;
    add_warden_by_officer(data);
  } catch (error) {
    console.log("error while add warden");
  }
};

module.exports = { login, add_warden };

// after adding wardens now it is our duty to add care takers

const add_care_taker = async (req, res, next) => {
  try {
    const { name, phoneNo, email, password, hostelAssign, role } = req.body;
    const data = req.body;
    add_care_taker_by_officer(data);
  } catch (error) {
    console.log("error while add care taker");
  }
};


// get profile
const getProfile=async(req,res,next)=>{
  try {
    const data=await Officer.findById(req.officer._id);
    if(data.length==0)
    {
      throw new Error("Nothing to show");
    }
    return res.status(200).json({
      name:data[0].name,
      phoneNo:data[0].phoneNo,
      email:data[0].email,
      profilePic:data[0].profilePic,
      address:data[0].address,
      role:data[0].role
    })
  } catch (error) {
    console.log("error while getting officer profile");
  }
}

// update password or any other data

const update_officer_data=async(req,res,next)=>{
  try {
    let officer=await Officer.findById(req.officer._id);
    if(!officer)
    {
      throw new Error("No officer found for update");
    }
    officer.name=req.body.name || officer.name;
    officer.phoneNo=req.body.phoneNo || officer.phoneNo;
    officer.email=req.body.email || officer.email;
    officer.password=req.body.password || officer.password;
    officer.confirmpassword=req.body.confirmpassword || officer.confirmpassword;
    officer.profilePic=req.body.profilePic || officer.profilePic;
    officer.address=req.body.address || officer.address;

    if(officer.password!==officer.confirmpassword)
    {
      throw new Error("Password and confirm password do not match")
    }
    else if(!validator.isEmail(officer.email))
    {
        throw new Error("Email not validate")
    }

    else if(!validator.isStrongPassword(officer.password))
    {
        throw new Error("Password is not strong");
    }

    const updatedofficer=await officer.save();
    return res.status(200).json({
      name:updatedofficer.name,
      phoneNo:updatedofficer.phoneNo,
      email:updatedofficer.email,
      profilePic:updatedofficer.profilePic,
      address:updatedofficer.address,
      role:updatedofficer.role
    })

  } catch (error) {
    console.log("error while update_officer_data");
  }
}


// get all wardens to assign hostels

const get_all_wardens=async(req,res,next)=>{
  try {
    const data=await get_all_warden_for_officers();
    return res.status(200).json({
      data:data
    })
  } catch (error) {
    console.log("error while get_all_wardens");
  }
}


// get all care takers to assign hostels

const get_all_caretakers=async(req,res,next)=>{
  try {
    const data=await get_all_care_taker_for_officers();
    return res.status(200).json({
      data:data
    })
  } catch (error) {
    console.log("error while get_all_wardens");
  }
}


module.exports = { login, add_warden ,add_care_taker,getProfile,update_officer_data};
