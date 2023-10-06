const Hostel = require("../models/Hostel");
const {add_rooms}=require("./rooms");


const addHostels = async (req, res, next) => {
  try {
    const {
      hostel_name,
      hostel_description,
      totalRooms
    } = req.body;
    if (
      !hostel_name ||
      !hostel_description ||
      !totalRooms
    ) {
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

    let roomsAvailable=totalRooms;
    let totalFloors=Math.ceil(totalRooms/10);
    let totalStudents=totalRooms*4;

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
    const data={
      hostel_id:addhostel._id,
      totalRooms:totalRooms
    }
    add_rooms(data);

  
  } catch (error) {
    console.log("error while adding hostel");
  }
};

const update_hostel_by_students_Count=async(data)=>{
    try {
      const {hostel_id}=data;
      const actualhosteldata=await Hostel.findById(hostel_id);
      let updatevalue=actualhosteldata[0].avialableStudents+1;
      const findandupdate=await Hostel.findByIdAndUpdate(hostel_id,{
        avialableStudents:updatevalue
      });
      await findandupdate.save();
    } catch (error) {
        console.log("error while update hostel by students Count");
    }
}

module.exports={addHostels,update_hostel_by_students_Count};