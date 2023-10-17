const Warden = require("../models/Warden");
const Student=require("../models/Student");
const { update_assign_task_care_taker } = require("./complaints");
const {
  register_Student_From_Warden,
  get_all_students_for_wardens,
} = require("./Student");
const { get_all_caretakers_for_warden } = require("./careTaker");
// now officer will add the warden

const add_warden_by_officer = async (data) => {
  try {
    const { name, phoneNo, email, password, hostelAssign, role } = data;
    if (!name || !phoneNo || !email || !password || !hostelAssign || !role) {
      throw new Error("Properly filled all values to add warden");
    }

    // add warden

    const addwarden = await Warden.create({
      name: name,
      phoneNo: phoneNo,
      email: email,
      password: password,
      hostelAssign: hostelAssign,
      role: role,
    });
    await addwarden.save();
    return true;
  } catch (error) {

    console.log("error while add_warden_by_officer");
    console.log(error.message);
    return false;
  }
};

// now warden is created

// login the warden

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let warden = await Warden.findOne({ email });
    if (!warden) {
      // throw new Error("EMAIL NOT FOUND");
      return res.status(400).json({
        message:"EMAIL NOT FOUND"
      })
    }
    if (await warden.comparePassword(password)) {
      const data = await Warden.findById(warden._id).populate([
        {
          path: "hostelAssign",
          select: ["hostel_name"],
        },
      ]);
      const token = await data.generateJWT();
      if (req.cookies["Bearer_Warden"]) {
        req.cookies["Bearer_Warden"] = "";
      }
      res.cookie("Bearer_Warden", token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 24 * 60 * 60), // 30 seconds
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
        dob:data.role.dob,
        token: token,
      });
    }else{
      return res.status(400).json({
        message:"Wrong Password"
      })
    }
  } catch (error) {
    console.log("error while login in warden");
  }
};

// get all wardens to officers so that officers can assign the wardens
// to specific hostels

const get_all_warden_for_officers = async () => {
  try {
    const getdata = await Warden.find({}).populate([
      {
        path: "hostelAssign",
        select: ["hostel_name"],
      },
    ]);
    return getdata;
  } catch (error) {
    console.log("error while get_all_warden_for_officers");
  }
};

// now its turn to add students in database by warden

const add_students_by_warden = async (req, res, next) => {
  try {
    const {
      name,
      phoneNo,
      email,
      roomNo,
      department,
      floorNo,
    } = req.body;
    const data = {...req.body,password:"Student@"+name+"123",hostelAssign:req.warden.hostelAssign,role:"student"};
    // console.log(data);
    if(await register_Student_From_Warden(data))
    {
      const result=await Student.find({hostelAssign:data.hostelAssign}).populate([
        {
          path: "hostelAssign",
          select: ["hostel_name"],
        },
      ]);;
      console.log("result is : ",result);
      return res.status(200).json({
        data:result
      })
    }
    return res.send("something wrong");
  } catch (error) {
    console.log("error while add_students_by_warden");
  }
};

// get warden profile

const getProfile = async (req, res, next) => {
  try {
    // console.log("warden getprofile ",req.warden);
    const data = await Warden.findById(req.warden._id).populate([
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
    console.log("error while getting warden profile");
  }
};

// update password or any other data

const update_warden_data = async (req, res, next) => {
  try {
    req.body=req?.body?.wardendata;
    let warden = await Warden.findById(req.warden._id).populate([
      {
        path: "hostelAssign",
        select: ["hostel_name"],
      },
    ]);
    if (!warden) {
      throw new Error("No warden found for update");
    }
    warden.name = req.body.name || warden.name;
    warden.phoneNo = req.body.phoneNo || warden.phoneNo;
    warden.email = req.body.email || warden.email;
    warden.password = req.body.password || warden.password;
    warden.confirmpassword = req.body.confirmpassword || warden.confirmpassword;
    warden.profilePic = req.body.profilePic || warden.profilePic;
    warden.address = req.body.address || warden.address;
    warden.gender = req.body.gender || warden.gender;
    warden.dob = req.body.dob || warden.dob;
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
    // if ((req.body.password && req.body.confirmpassword) && warden.password !== warden.confirmpassword) {
    //   // throw new Error("Password and confirm password do not match");
    //   return res.status(400).json({
    //     message:"Password and confirm password do not match"
    //   })
    // }
    // if ((req.body.email) && !validator.isEmail(warden.email)) {
    //   // throw new Error("Email not validate");
    //   return res.status(400).json({
    //     message:"Email not validate"
    //   })
      
    // }
    // if((req.body.password && req.body.confirmpassword) && !validator.isStrongPassword(warden.password)) {
    //   // throw new Error("Password is not strong");
    //   return res.status(400).json({
    //     message:"Password is not strong"
    //   })
    // }

    const updatedwarden = await warden.save();
    const token = await updatedwarden.generateJWT();
    if (req.cookies["Bearer_Warden"]) {
      req.cookies["Bearer_Warden"] = "";
    }
    res.cookie("Bearer_Warden", token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 24 * 60 * 60), // 30 seconds
      httpOnly: true,
      sameSite: "lax",
    });
    return res.status(200).json({
      name: updatedwarden.name,
      phoneNo: updatedwarden.phoneNo,
      email: updatedwarden.email,
      profilePic: updatedwarden.profilePic,
      address: updatedwarden.address,
      role: updatedwarden.role,
      hostel_name: updatedwarden.hostelAssign.hostel_name,
      gender:updatedwarden.gender,
      dob:updatedwarden.role.dob,
      token: token,
    });
  } catch (error) {
    console.log("error while update_warden_data");
    console.log(error.message);
  }
};

// update warden profile photo

const update_warden_profile_pic = async (req, res, next) => {
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
          let updatedwarden = await User.findById(req.warden._id);
          filename = updatedwarden.avatar;
          // if we have already file exits then first we have to remove it then add new file
          if (filename) {
            fileRemover(filename);
          }
          updatedwarden.avatar = req.file.filename;
          await updatedwarden.save();
          const token = await updatedwarden.generateJWT();
          if (req.cookies["Bearer_Warden"]) {
            req.cookies["Bearer_Warden"] = "";
          }
          res.cookie("Bearer_Warden", token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 24 * 60 * 60), // 30 seconds
            httpOnly: true,
            sameSite: "lax",
          });
          return res.status(200).json({
            name: updatedwarden.name,
            phoneNo: updatedwarden.phoneNo,
            email: updatedwarden.email,
            profilePic: updatedwarden.profilePic,
            address: updatedwarden.address,
            role: updatedwarden.role,
            hostel_name: updatedwarden.hostelAssign.hostel_name,
            token: token,
          });
        } else {
          // we have to delete image when nothing upload
          let filename;
          let updatedwarden = await User.findById(req.warden._id);
          filename = updatedwarden.avatar;
          updatedwarden.avatar = "";
          await updatedwarden.save();
          fileRemover(filename);
          const token = await updatedwarden.generateJWT();
          if (req.cookies["Bearer_Warden"]) {
            req.cookies["Bearer_Warden"] = "";
          }
          res.cookie("Bearer_Warden", token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 24 * 60 * 60), // 30 seconds
            httpOnly: true,
            sameSite: "lax",
          });
          return res.status(200).json({
            name: updatedwarden.name,
            phoneNo: updatedwarden.phoneNo,
            email: updatedwarden.email,
            profilePic: updatedwarden.profilePic,
            address: updatedwarden.address,
            role: updatedwarden.role,
            hostel_name: updatedwarden.hostelAssign.hostel_name,
            token: token,
          });
        }
      }
    });
  } catch (error) {
    console.log("error while update_warden_profile_pic");
    next(error);
  }
};

// assign the care taker to complaints and we must have to pass complaint id
// so that we can know which complaint id we have to update

const assign_care_taker_to_complaint = async (req, res, next) => {
  try {
    const data = req.body;
    if(await update_assign_task_care_taker(data)===true)
    {
      return res.send("care taker assignes success");
    }
    return res.send("csomething went wrong");
  } catch (error) {
    console.log("error while assign_care_taker_to_complaint");
  }
};

// show all care takers of same hostel whose warden resides

const get_care_takers = async (req, res, next) => {
  try {
    const hostel_id = req.warden.hostelAssign;
    const data = { hostel_id: hostel_id };
    const getdata = await get_all_caretakers_for_warden(data);
    return res.status(200).json({
      data: getdata,
    });
  } catch (error) {
    console.log("error while get_care_takers warden");
  }
};

// show all students to get list of all students whose hostel same as warden

const get_students = async (req, res, next) => {
  try {
    const hostel_id = req.warden?.hostelAssign;
    const data = { hostel_id: hostel_id };
    const getdata = await get_all_students_for_wardens(data);
    if(res)
    {
      return res.status(200).json({
        data: getdata,
      });
    }
    return getdata;
  } catch (error) {
    console.log("error while get_students ");
  }
};

module.exports = {
  login,
  add_warden_by_officer,
  add_students_by_warden,
  getProfile,
  update_warden_data,
  update_warden_profile_pic,
  get_care_takers,
  assign_care_taker_to_complaint,
  get_all_warden_for_officers,
  get_students,
};
