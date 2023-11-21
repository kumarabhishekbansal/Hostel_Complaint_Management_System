import axios from "axios";
axios.defaults.withCredentials = true;

export const loginofficer = async ({ email, password }) => {
  try {
    console.log("Enter loginofficer");

    const { data } = await axios.post("/api/officer/login", {
      email,
      password,
    });
    console.log(data);
    localStorage.setItem("hcmaccount", JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error.response.data.message);
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Something went wrong");
  }
};

export const loginwarden = async ({ email, password }) => {
  try {
    console.log("Enter loginwarden");
    const { data } = await axios.post("/api/warden/login", {
      email,
      password,
    });
    console.log(data);
    localStorage.setItem("hcmaccount", JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error.response.data.message);
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Something went wrong");
  }
};

export const logincaretaker = async ({ email, password }) => {
  try {
    console.log("Enter logincaretaker");
    const { data } = await axios.post("/api/caretaker/login", {
      email,
      password,
    });
    console.log(data);
    localStorage.setItem("hcmaccount", JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error.response.data.message);
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Something went wrong");
  }
};

export const loginstudent = async ({ email, password }) => {
  try {
    console.log("Enter loginstudent");
    const { data } = await axios.post("/api/student/login", {
      email,
      password,
    });
    console.log(data);
    localStorage.setItem("hcmaccount", JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error.response.data.message);
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Something went wrong");
  }
};

export const getProfile = async (user) => {
  try {
    // console.log(user);
    let data;
    if (user === "Officer") {
      data = await axios.get("/api/officer/getProfile", {
        withCredentials: true,
      });
    } else if (user === "warden") {
      data = await axios.get("/api/warden/getprofile", {
        withCredentials: true,
      });
    } else if (user === "caretaker") {
      data = await axios.get("/api/caretaker/getProfile", {
        withCredentials: true,
      });
    } else if (user === "student") {
      data = await axios.get("/api/student/getProfile", {
        withCredentials: true,
      });
    }
    // console.log(data.data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateOfficerProfile = async ({ officerdata }) => {
  try {
    console.log(officerdata);
    const data = await axios.put("/api/officer/updateprofile", {
        officerdata
    },
    {
        withCredentials:true
    }
    ,);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateWardenProfile = async ({ wardendata }) => {
  try {
    console.log(wardendata);
    const data = await axios.put("/api/warden/updateprofile", {
      wardendata
    },
    {
        withCredentials:true
    }
    ,);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateStudentProfile = async ({ studentdata }) => {
  try {
    console.log(studentdata);
    const data = await axios.put("/api/student/updateprofile", {
      studentdata
    },
    {
        withCredentials:true
    }
    ,);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};


export const updateCareTakerProfile = async ({ caretakerdata }) => {
  try {
    console.log(caretakerdata);
    const data = await axios.put("/api/caretaker/updateprofile", {
      caretakerdata
    },
    {
        withCredentials:true
    }
    ,);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const updateOfficerProfilePic = async ({ formData }) => {
//   try {
//     console.log(formData);
//     const data = await axios.put("/api/officer/updateprofilepic", {
//       formData
//     },
//     {
//         withCredentials:true
//     }
//     ,);
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const logout=async()=>{
  try {
    console.log("logout clicked");
    const data=await axios.get("delete-cookie",{
      withCredentials:true
    });
    localStorage.clear();
  } catch (error) {
    
  }
}
