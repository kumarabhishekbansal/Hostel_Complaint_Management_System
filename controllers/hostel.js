const Hostel = require("../models/Hostel");
const {add_rooms}= require("./rooms");

const addHostels = async (req, res, next) => {
  try {
    const { hostel_name, hostel_description, totalRooms } = req.body;
    if (!hostel_name || !hostel_description || !totalRooms) {
      throw new Error("enter all details to add hostels");
    }

    //  now we will do some mathematics for rooms available,total floors and total students
    // suppose we have total students which has value is equal to 50
    // and we consider there can be only 4 seater rooms so total students will be
    // total_students=(totalrooms*4) that is 200 in this case

    // now calculate total floors
    // we assume there are 1 floor for 10 rooms
    // so, total_floors=(totalrooms)/10 that is 5 in this case

    // and in starting when we add a new hostel then room available=total_rooms

    // after considering all above statements we have

    let roomsAvailable = totalRooms;
    let totalFloors = Math.ceil(totalRooms / 10);
    let totalStudents = totalRooms * 4;

    const addhostel = await Hostel.create({
      hostel_name: hostel_name,
      hostel_description: hostel_description,
      totalRooms: totalRooms,
      roomsAvailable: roomsAvailable,
      totalFloors: totalFloors,
      totalStudents: totalStudents,
    });

    await addhostel.save();

    // add rooms to room model after knowing the total rooms in hostel model
    const data = {
      hostel_id: addhostel._id,
      totalrooms: totalRooms,
    };
    // console.log(data);
    await add_rooms(data);
    const getResults=await Hostel.find({});
    return res.status(200).json({
      data:getResults
    })
  } catch (error) {
    console.log("error while adding hostel");
    console.log(error.message);
  }
};

const getHostels=async(req,res,next)=>{
  try {
    const data=await Hostel.find({});
    return res.status(200).json({
      data:data
    })
  } catch (error) {
    console.log("error while getting all hostels");
  }
}

module.exports = { addHostels,getHostels };
