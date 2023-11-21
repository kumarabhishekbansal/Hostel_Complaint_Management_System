import axios from "axios";
axios.defaults.withCredentials = true;
const api_key = "/api/caretaker/";


export const getComplaints = async () => {
  try {
    const data = await axios.get("/api/complaint/getcomplaintscaretaker", {
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


export const updateStatus=async({complaint_id,status})=>{
    try {
        const data=await axios.put(api_key+"updatecomplaint",{
            complaint_id,status
        },{
            withCredentials:true
        });
        console.log(data?.status);
    if(data?.status===200)
    {
        return getComplaints();
    }
    } catch (error) {
        console.log(error);
    }
}

