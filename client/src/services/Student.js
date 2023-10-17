import axios from "axios";
axios.defaults.withCredentials = true;
const api_key = "/api/student/";

export const getComplaints = async () => {
  try {
    const data = await axios.get(api_key + "getcomplaints", {
      withCredentials: true,
    });

    if (data && data.data) {
      localStorage.setItem("complaints", JSON.stringify(data.data));
    }
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const addComplaint = async ({ issue, tags }) => {
  try {
    const data = await axios.post(
      api_key + "createissue",
      {
        issue,
        tags,
      },
      {
        withCredentials: true,
      }
    );

    if (data && data.data) {
      localStorage.setItem("complaints", JSON.stringify(data.data));
    }
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const complaintsTag = [
  {
    tag_val: "Water Problem",
  },
  {
    tag_val: "Furniture",
  },
  {
    tag_val: "Fan",
  },
  {
    tag_val: "Electricity",
  },
  {
    tag_val: "Door",
  },
  {
    tag_val: "Window",
  },
  {
    tag_val: "Almirah",
  },
  {
    tag_val: "Cleaning",
  },
  {
    tag_val: "Laundary",
  },
];

export const statusTag = [
  {
    tag_val: "Pending",
  },
  {
    tag_val: "confirmed",
  },
  {
    tag_val: "In Progress",
  },
  {
    tag_val: "Completed",
  }
];
