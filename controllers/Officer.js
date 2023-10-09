const Officer = require("../models/Officer");
const validator = require("validator");
const {
  add_warden_by_officer,
  get_all_warden_for_officers,
} = require("./Warden");
const {
  add_care_taker_by_officer,
  get_all_care_taker_for_officers,
} = require("./careTaker");

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
    console.log("enter officer login");
    const { email, password } = req.body;
    let officer = await Officer.findOne({ email });
    if (!officer) {
      throw new Error("EMAIL NOT FOUND");
    }
    if (await officer.comparePassword(password)) {
      const token=await officer.generateJWT();
      if (req.cookies["Bearer_Officer"]) {
        req.cookies["Bearer_Officer"] = "";
      }
      res.cookie("Bearer_Officer", token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 24*60*60), // 30 seconds
        httpOnly: true,
        sameSite: "lax",
      });
      return res.status(201).json({
        _id: officer._id,
        name: officer.name,
        phoneNo: officer.phoneNo,
        email: officer.email,
        profilePic: officer.profilePic,
        address: officer.address,
        role: officer.role,
        token:await officer.generateJWT(),
      });
    }else{
      return res.status(400).json({
        message:"Password do not match"
      })
    }
  } catch (error) {
    console.log("error while login in officer");
    console.log(error.message);
  }
};

// after login officer successfully adds hostels by authorization

// after adding hostels now it is our duty to add warden

const add_warden = async (req, res, next) => {
  try {
    const { name, phoneNo, email, password, hostelAssign, role } = req.body;
    const data = req.body;
    if(add_warden_by_officer(data))
    {
      return res.send("warden has been added successfully");
    }
    return res.send("Something wrong happens");

  } catch (error) {
    console.log("error while add warden");
    console.log(error.message);
  }
};

// after adding wardens now it is our duty to add care takers

const add_care_taker = async (req, res, next) => {
  try {
    const { name, phoneNo, email, password, hostelAssign, role } = req.body;
    const data = req.body;
    if(add_care_taker_by_officer(data)===true)
    {
      return res.send("care taker added successfully");
    }
    return res.send("something went wrong");
    
  } catch (error) {
    console.log("error while add care taker");
  }
};

// get profile
const getProfile = async (req, res, next) => {
  try {
    const data = await Officer.findById(req.officer._id);
    // if (data.length == 0) {
    //   throw new Error("Nothing to show");
    // }
    return res.status(200).json({
      name: data.name,
      phoneNo: data.phoneNo,
      email: data.email,
      profilePic: data.profilePic,
      address: data.address,
      role: data.role,
    });
  } catch (error) {
    console.log("error while getting officer profile");
  }
};

// update password or any other data

const update_officer_data = async (req, res, next) => {
  try {
    let officer = await Officer.findById(req.officer._id);
    if (!officer) {
      throw new Error("No officer found for update");
    }
    officer.name = req.body.name || officer.name;
    officer.phoneNo = req.body.phoneNo || officer.phoneNo;
    officer.email = req.body.email || officer.email;
    officer.password = req.body.password || officer.password;
    officer.confirmpassword =
      req.body.confirmpassword || officer.confirmpassword;
    // officer.profilePic = req.body.profilePic || officer.profilePic;
    officer.address = req.body.address || officer.address;

    if(req.body.password && !req.body.confirmpassword)
    {
      return res.status(400).json({
        message:"Enter confirm password also"
      })
    }
    if(!req.body.password && req.body.confirmpassword)
    {
      return res.status(400).json({
        message:"Enter  password also"
      })
    }
    if ((req.body.password && req.body.confirmpassword) && officer.password !== officer.confirmpassword) {
      // throw new Error("Password and confirm password do not match");
      return res.status(400).json({
        message:"Password and confirm password do not match"
      })
    }
    if ((req.body.email) && !validator.isEmail(officer.email)) {
      // throw new Error("Email not validate");
      return res.status(400).json({
        message:"Email not validate"
      })
      
    }
    if((req.body.password && req.body.confirmpassword) && !validator.isStrongPassword(officer.password)) {
      // throw new Error("Password is not strong");
      return res.status(400).json({
        message:"Password is not strong"
      })
    }

    const updatedofficer = await officer.save();
    const token=await updatedofficer.generateJWT();
      if (req.cookies["Bearer_Officer"]) {
        req.cookies["Bearer_Officer"] = "";
      }
      res.cookie("Bearer_Officer", token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 24*60*60), // 30 seconds
        httpOnly: true,
        sameSite: "lax",
      });
    return res.status(200).json({
      name: updatedofficer.name,
      phoneNo: updatedofficer.phoneNo,
      email: updatedofficer.email,
      profilePic: updatedofficer.profilePic,
      address: updatedofficer.address,
      role: updatedofficer.role,
      token:token
    });
  } catch (error) {
    console.log("error while update_officer_data");
    console.log(error.message);
  }
};


// update officer profile photo

const update_officer_profile_pic=async(req,res,next)=>{
  try {
    const upload = uploadPicture.single("profilePicture");

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occured when uploading " + err.message
        );
        next(error);
      } else {
        // every thing went well
        if (req.file) {
          let filename;
          let updatedofficer = await User.findById(req.officer._id);
          filename = updatedofficer.avatar;
          // if we have already file exits then first we have to remove it then add new file
          if (filename) {
            fileRemover(filename);
          }
          updatedofficer.avatar = req.file.filename;
          await updatedofficer.save();
          const token=await updatedofficer.generateJWT();
          if (req.cookies["Bearer_Officer"]) {
            req.cookies["Bearer_Officer"] = "";
          }
          res.cookie("Bearer_Officer", token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 24*60*60), // 30 seconds
            httpOnly: true,
            sameSite: "lax",
          });
          return res.status(201).json({
            _id: updatedofficer._id,
            name: updatedofficer.name,
            phoneNo: updatedofficer.phoneNo,
            email: updatedofficer.email,
            profilePic: updatedofficer.profilePic,
            address: updatedofficer.address,
            role: updatedofficer.role,
            token:token,
          });
        } else {
          // we have to delete image when nothing upload
          let filename;
          let updatedofficer = await User.findById(req.officer._id);
          filename = updatedofficer.avatar;
          updatedofficer.avatar = "";
          await updatedofficer.save();
          fileRemover(filename);
          const token=await updatedofficer.generateJWT();
          if (req.cookies["Bearer_Officer"]) {
            req.cookies["Bearer_Officer"] = "";
          }
          res.cookie("Bearer_Officer", token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 24*60*60), // 30 seconds
            httpOnly: true,
            sameSite: "lax",
          });
          return res.status(201).json({
            _id: updatedofficer._id,
            name: updatedofficer.name,
            phoneNo: updatedofficer.phoneNo,
            email: updatedofficer.email,
            profilePic: updatedofficer.profilePic,
            address: updatedofficer.address,
            role: updatedofficer.role,
            token:token,
          });
        }
      }
    });
  } catch (error) {
    console.log("error while update_officer_profile_pic");
    next(error);
  }
}


// get all wardens to assign hostels

const get_all_wardens = async (req, res, next) => {
  try {
    const data = await get_all_warden_for_officers();
    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.log("error while get_all_wardens");
  }
};

// get all care takers to assign hostels

const get_all_caretakers = async (req, res, next) => {
  try {
    const data = await get_all_care_taker_for_officers();
    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.log("error while get_all_caretakers");
  }
};

module.exports = {
  login,
  add_warden,
  add_care_taker,
  getProfile,
  update_officer_data,
  update_officer_profile_pic,
  get_all_wardens,
  get_all_caretakers
};
