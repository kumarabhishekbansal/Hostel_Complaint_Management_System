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

export const getComplaints = async () => {
  try {
    const data = await axios.get("/api/complaint/getcomplaintswarden", {
      withCredentials: true,
    });
    console.log(data.data);
    if (data && data.data) {
      localStorage.setItem("complaints", JSON.stringify(data.data));
    }
    return data.data;
  } catch (error) {
    console.log(error);
  }
};


export const getcaretakers = async () => {
  try {
    const data = await axios.get(api_key + "getcaretakers", {
      withCredentials: true,
    });
    // console.log(data.data);
    if (data && data.data) {
      localStorage.setItem("caretakers", JSON.stringify(data.data));
    }
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const assigncaretaker=async({complaint_id, assignedTo})=>{
  try {
    const data=await axios.put(api_key+"assigncaretaker",{
      complaint_id, assignedTo
    },{
      withCredentials:true
    })
    console.log(data?.status);
    if(data?.status===200)
    {
        return getComplaints();
    }
  } catch (error) {
    console.log(error);
  }
}