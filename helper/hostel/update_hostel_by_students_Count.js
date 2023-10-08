const Hostel = require("../../models/Hostel");
const update_hostel_by_students_Count = async (data) => {
  try {
    const { hostel_id } = data;
    const actualhosteldata = await Hostel.findById(hostel_id);
    // console.log("actualhosteldata : ",actualhosteldata);
    let updatevalue = actualhosteldata.avialableStudents + 1;
    const findandupdate = await Hostel.findByIdAndUpdate(hostel_id, {
      avialableStudents: updatevalue,
    });
    await findandupdate.save();
  } catch (error) {
    console.log("error while update hostel by students Count");
    console.log(error.message);
  }
};

module.exports = {
  update_hostel_by_students_Count,
};
