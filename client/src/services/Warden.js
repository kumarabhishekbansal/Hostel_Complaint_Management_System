import axios from "axios";
axios.defaults.withCredentials = true;
const api_key = "/api/warden/";

// get all rooms of that hostel

export const getRooms = async () => {
  try {
    const data = await axios.get("/api/room/getrooms", {
      withCredentials: true,
    });
    // console.log(data?.data?.rooms);
    if(data && data.data && data.data.rooms)
    {
        localStorage.setItem("rooms",JSON.stringify(data.data.rooms));
        return data?.data?.rooms;
    }
    return [];
  } catch (error) {
    console.log(error);
  }
};

export const getStudents = async () => {
  try {
    const data = await axios.get(api_key + "getstudents", {
      withCredentials: true,
    });
    // console.log(data.data);
    if (data && data.data) {
      localStorage.setItem("students", JSON.stringify(data.data));
    }
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const addStudents = async (
  {name,
  phoneNo,
  email,
  roomNo,
  department,
  floorNo}
) => {
  try {
    console.log(
      name,
      phoneNo,
      email,
      roomNo,
      department,
      floorNo);
    const data = await axios.post(api_key + "add-students", {
        name,
        phoneNo,
        email,
        roomNo,
        department,
        floorNo
    },
    {
        withCredentials:true
    });
    // console.log(data.data);
    if (data && data.data) {
      localStorage.setItem("students", JSON.stringify(data.data));
    }
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
