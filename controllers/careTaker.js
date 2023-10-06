const careTaker = require("../models/careTaker");
const { update_status_by_care_taker } = require("./complaints");
// now officer will add the warden

const add_care_taker_by_officer = async (data) => {
  try {
    const { name, phoneNo, email, password, hostelAssign, role } = data;
    if (!name || !phoneNo || !email || !password || !hostelAssign || !role) {
      throw new Error("Properly filled all values to add care taker");
    }

    // add warden

    const addwarden = await careTaker.create({
      name: name,
      phoneNo: phoneNo,
      email: email,
      password: password,
      hostelAssign: hostelAssign,
      role: role,
    });
    await addwarden.save();
  } catch (error) {
    console.log("error while add_care_taker_by_officer");
  }
};

// login the caretaker

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let caretaker = await careTaker.findOne({ email });
    if (!caretaker) {
      throw new Error("EMAIL NOT FOUND");
    }
    if (await caretaker.comparePassword(password)) {
      const data = await Warden.findById(caretaker._id).populate([
        {
          path: "hostelAssign",
          select: ["hostel_name"],
        },
      ]);
      return res.status(200).json({
        name: data[0].name,
        phoneNo: data[0].phoneNo,
        email: data[0].email,
        profilePic: data[0].profilePic,
        address: data[0].address,
        role: data[0].role,
        hostelAssign: data[0].hostelAssign,
        hostel_name: data[0].hostelAssign.hostel_name,
      });
    }
  } catch (error) {
    console.log("error while login in caretaker");
  }
};

// get all care takers to wardens so that warden can assign the tasks
// and we only want those care taker whose warden has been also
const get_all_caretakers_for_warden = async (data) => {
  try {
    const { hostel_id } = data;
    const getdata = await careTaker.find({ hostelAssign: hostel_id });
    return getdata;
  } catch (error) {
    console.log("error while get_all_caretakers_for_warden");
  }
};

// get all care takers to officers so that officers can assign the care takers
// to specific hostels

const get_all_care_taker_for_officers = async () => {
  try {
    const getdata = await careTaker.find();
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
    if (data.length == 0) {
      throw new Error("Nothing to show");
    }
    return res.status(200).json({
      name: data[0].name,
      phoneNo: data[0].phoneNo,
      email: data[0].email,
      profilePic: data[0].profilePic,
      address: data[0].address,
      role: data[0].role,
      hostelAssign: data[0].hostelAssign,
      hostel_name: data[0].hostelAssign.hostel_name,
    });
  } catch (error) {
    console.log("error while getting caretaker profile");
  }
};

// update password or any other data

const update_caretaker_data = async (req, res, next) => {
  try {
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

    if (caretaker.password !== caretaker.confirmpassword) {
      throw new Error("Password and confirm password do not match");
    } else if (!validator.isEmail(caretaker.email)) {
      throw new Error("Email not validate");
    } else if (!validator.isStrongPassword(caretaker.password)) {
      throw new Error("Password is not strong");
    }

    const updatedcaretaker = await caretaker.save();
    return res.status(200).json({
      name: updatedcaretaker.name,
      phoneNo: updatedcaretaker.phoneNo,
      email: updatedcaretaker.email,
      profilePic: updatedcaretaker.profilePic,
      address: updatedcaretaker.address,
      role: updatedcaretaker.role,
      hostel_name: updatedcaretaker.hostelAssign.hostel_name,
    });
  } catch (error) {
    console.log("error while update_caretaker_data");
  }
};

// update the status of complaint by complaint id

const update_status_complaint = async (req, res, next) => {
  try {
    const data = req.body;
    await update_status_complaint(data);
  } catch (error) {
    console.log("error while update_status_complaint by care taker");
  }
};

module.exports = {
  add_care_taker_by_officer,
  get_all_caretakers_for_warden,
  get_all_care_taker_for_officers,
};
