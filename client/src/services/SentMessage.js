import axios from "axios";
export const sentMessage = async ({ fullname, email, message }) => {
  try {
    const data = await axios.post("/api/contact/addmessage", {
      fullname,
      email,
      message,
    });
    if (data) {
      console.log(data);
      return data?.data?.message
    }
    return data?.data?.message
  } catch (error) {
    console.log(error);
    return error;
  }
};
