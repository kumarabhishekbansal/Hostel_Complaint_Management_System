export const ImageUpload = async (e) => {
    const data = new FormData();
    const file = e.target.files[0];
    data.append("file", file);
    data.append("upload_preset", "HCM_User_Profiles");
    data.append("cloud_name", "dyxq1jwuc");
    try {
    //   fetch("https://api.cloudinary.com/v1_1/dyxq1jwuc/image/upload", {
    //     method: "post",
    //     body: data,
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data);
    //       return data.url;
    //     })
    //     .catch((err) => console.log("error"));
    const res=await fetch("https://api.cloudinary.com/v1_1/dyxq1jwuc/image/upload", {
        method: "post",
        body: data,
      })
      const getdata=await res.json();
      return getdata;
    } catch (error) {
      console.log(error);
    }
  };
