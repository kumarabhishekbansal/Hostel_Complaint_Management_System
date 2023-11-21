const careTaker = require("../models/careTaker");
const validator=require("validator");
const { update_status_by_care_taker } = require("./complaints");
// now officer will add the warden

const add_care_taker_by_officer = async (data) => {
  try {
    const { name, phoneNo, email, password, hostelAssign, role } = data;
    if (!name || !phoneNo || !email || !password || !hostelAssign || !role) {
      throw new Error("Properly filled all values to add care taker");
    }

    // add are taker

    const addcaretaker = await careTaker.create({
      name: name,
      phoneNo: phoneNo,
      email: email,
      password: password,
      hostelAssign: hostelAssign,
      role: role,
    });
    await addcaretaker.save();
    return true;
  } catch (error) {
    console.log("error while add_care_taker_by_officer");
    console.log(error.message);
    return false;
  }
};

// login the caretaker

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let caretaker = await careTaker.findOne({ email });
    if (!caretaker) {
      // throw new Error("EMAIL NOT FOUND");
      return res.status(400).json({
        message:"Email not found"
      })
    }
    if (await caretaker.comparePassword(password)) {
      const data = await careTaker.findById(caretaker._id).populate([
        {
          path: "hostelAssign",
          select: ["hostel_name"],
        },
      ]);
      const token=await data.generateJWT();
      if (req.cookies["Bearer_caretaker"]) {
        req.cookies["Bearer_caretaker"] = "";
      }
      res.cookie("Bearer_caretaker", token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 24*60*60), // 30 seconds
        httpOnly: true,
        sameSite: "lax",
      });
      return res.status(200).json({
        name: data.name,
        phoneNo: data.phoneNo,
        email: data.email,
        profilePic: data.profilePic,
        address: data.address,
        role: data.role,
        hostelAssign: data.hostelAssign,
        hostel_name: data.hostelAssign.hostel_name,
        gender:data.gender,
        dob:data.dob,
        token:token,
      });
    }
    return res.status(400).json({
      message:"Wrong credentials"
    })
  } catch (error) {
    console.log("error while login in caretaker");
  }
};

// get all care takers to wardens so that warden can assign the tasks
// and we only want those care taker whose warden has been also
const get_all_caretakers_for_warden = async (data) => {
  try {
    const { hostel_id } = data;
    const getdata = await careTaker.find({ hostelAssign: hostel_id }).populate([
      {
        path:"hostelAssign",
        select:["hostel_name"]
      }
    ]);
    return getdata;
  } catch (error) {
    console.log("error while get_all_caretakers_for_warden");
  }
};

// get all care takers to officers so that officers can assign the care takers
// to specific hostels

const get_all_care_taker_for_officers = async () => {
  try {
    const getdata = await careTaker.find({}).populate([
      {
        path:"hostelAssign",
        select:["hostel_name"]
      }
    ]);;
    return getdata;
  } catch (error) {
    console.log("error while get_all_care_taker_for_officers");
  }
};

// get caretaker profile

const getProfile = async (req, res, next) => {
  try {
    const data = await careTaker.findById(req.caretaker._id).populate([
      {
        path: "hostelAssign",
        select: ["hostel_name"],
      },
    ]);
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
      hostelAssign: data.hostelAssign,
      hostel_name: data.hostelAssign.hostel_name,
      gender:data.gender,
      dob:data.dob,

    });
  } catch (error) {
    console.log("error while getting caretaker profile");
  }
};

// update password or any other data

const update_caretaker_data = async (req, res, next) => {
  try {
    req.body=req.body?.caretakerdata;
    let caretaker = await careTaker.findById(req.caretaker._id).populate([
      {
        path: "hostelAssign",
        select: ["hostel_name"],
      },
    ]);
    if (!caretaker) {
      throw new Error("No caretaker found for update");
    }
    caretaker.name = req.body.name || caretaker.name;
    caretaker.phoneNo = req.body.phoneNo || caretaker.phoneNo;
    caretaker.email = req.body.email || caretaker.email;
    caretaker.password = req.body.password || caretaker.password;
    caretaker.confirmpassword =
      req.body.confirmpassword || caretaker.confirmpassword;
    caretaker.profilePic = req.body.profilePic || caretaker.profilePic;
    caretaker.address = req.body.address || caretaker.address;
    caretaker.gender = req.body.gender || caretaker.gender;
    caretaker.dob = req.body.dob || caretaker.dob;
    // if(req.body.password && !req.body.confirmpassword)
    // {
    //   return res.status(400).json({
    //     message:"Enter confirm password also"
    //   })
    // }
    // if(!req.body.password && req.body.confirmpassword)
    // {
    //   return res.status(400).json({
    //     message:"Enter  password also"
    //   })
    // }
    // if ((req.body.password && req.body.confirmpassword) && caretaker.password !== caretaker.confirmpassword) {
    //   // throw new Error("Password and confirm password do not match");
    //   return res.status(400).json({
    //     message:"Password and confirm password do not match"
    //   })
    // }
    // if ((req.body.email) && !validator.isEmail(caretaker.email)) {
    //   // throw new Error("Email not validate");
    //   return res.status(400).json({
    //     message:"Email not validate"
    //   })
      
    // }
    // if((req.body.password && req.body.confirmpassword) && !validator.isStrongPassword(caretaker.password)) {
    //   // throw new Error("Password is not strong");
    //   return res.status(400).json({
    //     message:"Password is not strong"
    //   })
    // }


    const updatedcaretaker = await caretaker.save();
    const token=await updatedcaretaker.generateJWT();
    if (req.cookies["Bearer_caretaker"]) {
      req.cookies["Bearer_caretaker"] = "";
    }
    res.cookie("Bearer_caretaker", token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 24*60*60), // 30 seconds
      httpOnly: true,
      sameSite: "lax",
    });
    return res.status(200).json({
      name: updatedcaretaker.name,
      phoneNo: updatedcaretaker.phoneNo,
      email: updatedcaretaker.email,
      profilePic: updatedcaretaker.profilePic,
      address: updatedcaretaker.address,
      role: updatedcaretaker.role,
      hostel_name: updatedcaretaker.hostelAssign.hostel_name,
      token:token,
    });
  } catch (error) {
    console.log("error while update_caretaker_data");
  }
};


// update care taker profile photo

const update_caretaker_profile_pic=async(req,res,next)=>{
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
          let updatedcaretaker = await User.findById(req.caretaker._id);
          filename = updatedcaretaker.avatar;
          // if we have already file exits then first we have to remove it then add new file
          if (filename) {
            fileRemover(filename);
          }
          updatedcaretaker.avatar = req.file.filename;
          await updatedcaretaker.save();
          const token=await updatedcaretaker.generateJWT();
          if (req.cookies["Bearer_caretaker"]) {
            req.cookies["Bearer_caretaker"] = "";
          }
          res.cookie("Bearer_caretaker", token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 24*60*60), // 30 seconds
            httpOnly: true,
            sameSite: "lax",
          });
          return res.status(200).json({
            name: updatedcaretaker.name,
            phoneNo: updatedcaretaker.phoneNo,
            email: updatedcaretaker.email,
            profilePic: updatedcaretaker.profilePic,
            address: updatedcaretaker.address,
            role: updatedcaretaker.role,
            hostel_name: updatedcaretaker.hostelAssign.hostel_name,
            token:token,
          });
        } else {
          // we have to delete image when nothing upload
          let filename;
          let updatedcaretaker = await User.findById(req.caretaker._id);
          filename = updatedcaretaker.avatar;
          updatedcaretaker.avatar = "";
          await updatedcaretaker.save();
          fileRemover(filename);
          const token=await updatedcaretaker.generateJWT();
          if (req.cookies["Bearer_caretaker"]) {
            req.cookies["Bearer_caretaker"] = "";
          }
          res.cookie("Bearer_caretaker", token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 24*60*60), // 30 seconds
            httpOnly: true,
            sameSite: "lax",
          });
          return res.status(200).json({
            name: updatedcaretaker.name,
            phoneNo: updatedcaretaker.phoneNo,
            email: updatedcaretaker.email,
            profilePic: updatedcaretaker.profilePic,
            address: updatedcaretaker.address,
            role: updatedcaretaker.role,
            hostel_name: updatedcaretaker.hostelAssign.hostel_name,
            token:token,
          });
        }
      }
    });
  } catch (error) {
    console.log("error while update_caretaker_profile_pic");
    next(error);
  }
}

// update the status of complaint by complaint id

const update_status_complaint = async (req, res, next) => {
  try {
    const data = req.body;
    if(await update_status_by_care_taker(data))
    {
      return res.status(200).json({
        message:"Status Updated"
      })
    }
    return res.send("spmething went wrong");
  } catch (error) {
    console.log("error while update_status_complaint by care taker");
  }
};

module.exports = {
  login,
  getProfile,
  update_caretaker_data,
  update_caretaker_profile_pic,
  add_care_taker_by_officer,
  get_all_caretakers_for_warden,
  get_all_care_taker_for_officers,
  update_status_complaint
};
