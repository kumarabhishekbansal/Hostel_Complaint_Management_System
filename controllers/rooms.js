const Rooms = require("../models/Rooms");
const { update_hostel_by_students_Count } = require("../helper/hostel/update_hostel_by_students_Count");
// after adding new hostel we have to create rooms for that hostel

const add_rooms = async (data) => {
  try {
    // console.log("Data is ", "add_rooms");
    // suppose I will get totalrooms which has value 50
    // in one room there can be 4 students so we have total 200 students
    // and we want in one floor there will be maximum 10 rooms
    // that is why after every 10 rooms add then a new floor will be inserted
    const { hostel_id, totalrooms } = data;
    var arr = [];
    var count = 1;
    var floor_number = 1;
    var val = 100;
    for (let i = 1; i <= totalrooms; i++) {
      let obj = {
        roomNumber: val + count,
        floor: floor_number,
        capacity: 4,
      };
      arr.push(obj);
      count++;
      if (i % 10 === 0) {
        count = 1;
        floor_number++;
        val += 100;
      }
    }

    const addroom = await Rooms.create({
      hostel: hostel_id,
      rooms: arr,
    });

    await addroom.save();
  } catch (error) {
    console.log("error while adding rooms");
    console.log(error.message);
  }
};

// get rooms of respective hostel in which warden belongs

const get_rooms_by_hostel_id = async (req, res, next) => {
  try {
    const hostel_id = req.warden.hostelAssign;
    if (!hostel_id) {
      throw new Error("you do not eneter proper hostel id");
    }
    const findrooms = await Rooms.findOne({ hostel: hostel_id });
    if (!findrooms) {
      throw new Error("Rooms of hostel not founds");
    }
    res.status(200).json({
      hostel_id: findrooms.hostel,
      rooms: findrooms.rooms,
    });
  } catch (error) {
    console.log("error while getting get_rooms_by_hostel_id");
  }
};

// update rooms when a room number is assigned to student with specific hostelid and room no.

const update_room_by_hostel_roomno = async (data) => {
  try {
    const { hostel_id, roomno, floor } = data;
    const findhostel = await Rooms.findOne({ hostel: hostel_id });
    if (!findhostel) {
      throw new Error("Not find hostel");
    }
    // do some mathematical calculations to find that room no. in findhostel
    let rooms = findhostel.rooms;

    // suppose a student add in room no. 205 and we can get that index
    // so we can get index by using floor no.

    // test case1:
    // floor=2
    // roomno. 205  (expected output to be 14)
    // let index=((floor-1)*10)+(roomno.-(floor*100))-1;
    // (1*10)+(205-200)-1 ===  10+5-1  === 14

    // test case2:
    // floor=1;
    // roomno. 102  (expected output to be 1)
    // let index=((floor-1)*10)+(roomno.-(floor*100))-1;
    // (0*10)+(102-100)-1 ===  0+2-1  === 1

    let index = (floor - 1) * 10 + (roomno - floor * 100) - 1;
    let update_capacity = Math.max(rooms[index].capacity - 1,0);

    const update_room_data = await Rooms.updateOne(
      {
        hostel: hostel_id,
        "rooms.roomNumber": roomno,
      },
      {
        $set: {
          "rooms.$.capacity": update_capacity,
        },
      }
    );
    // await update_room_data.save();

    //   now student get assign the room no.
    // so let's update available student in that specific hostel

    update_hostel_by_students_Count(data);
  } catch (error) {
    console.log("error while update_room_by_hostel_roomno");
    console.log(error.message);
  }
};




module.exports = {
  add_rooms,
  get_rooms_by_hostel_id,
  update_room_by_hostel_roomno,
};
