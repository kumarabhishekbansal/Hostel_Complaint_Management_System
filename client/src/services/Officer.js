import axios from "axios";
axios.defaults.withCredentials = true;
const api_key="/api/officer/";
// Add Hostels

export const addHostels=async({hostel_name,hostel_description,totalRooms})=>{
    try {
        const data=await axios.post("/api/hostel/add-hostel",{
            hostel_name,hostel_description,totalRooms
        },{
            withCredentials:true
        });
        // console.log("data : ",data.data);
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export const getHostels=async()=>{
    try {
        // console.log("enter get  hostels");
        const data=await axios.get("/api/hostel/get-hostel",{
            withCredentials:true
        });
        console.log("data : ",data.data);
        if(data && data.data)
        {
            localStorage.setItem("hostels",JSON.stringify(data.data));        
        }
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export const addWardens=async({name,phoneNo, email,hostelAssign})=>{
    try {
        console.log("enter add wardens");
        const data=await axios.post(api_key+"add-warden",{
            name,phoneNo, email,hostelAssign
        },{
            withCredentials:true           
        })
        // console.log("now data is ",data);
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export const getWardens=async()=>{
    try {
        const data=await axios.get(api_key+"getallwardens",{
            withCredentials:true           
        })
        console.log(data.data);
        if(data && data.data)
        {
            localStorage.setItem("wardens",JSON.stringify(data.data));
        }
        return data.data;
        
    } catch (error) {
        console.log(error);
    }
}

export const addCareTaker=async({name,phoneNo, email,hostelAssign})=>{
    try {
        // console.log("enter add wardens");
        const data=await axios.post(api_key+"add-careTaker",{
            name,phoneNo, email,hostelAssign
        },{
            withCredentials:true           
        })
        // console.log("now data is ",data);
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export const getCareTaker=async()=>{
    try {
        const data=await axios.get(api_key+"getallcaretakers",{
            withCredentials:true           
        })
        console.log(data.data);
        if(data && data.data)
        {
            localStorage.setItem("caretakers",JSON.stringify(data.data));
        }
        return data.data;
        
    } catch (error) {
        console.log(error);
    }
}

export const getAllStudents=async()=>{
    try {
        const data=await axios.get(api_key+"getallstudents",{
            withCredentials:true           
        })
        console.log(data.data);
        if(data && data.data)
        {
            localStorage.setItem("students",JSON.stringify(data.data));
        }
        return data.data;
        
    } catch (error) {
        console.log(error);
    }
}
