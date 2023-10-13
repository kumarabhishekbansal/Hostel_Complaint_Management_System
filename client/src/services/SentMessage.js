export const sentMessage=({fullname,email,message})=>{
    // console.log("Message sent successfully");
    // console.log(fullname,email,message);
    const data={fullname,email,message};
    return data;
}

export const loginofficer=({email,password})=>{
    console.log("loginofficer success");
    const data={email,password};
    return data;
}

export const loginwarden=({email,password})=>{
    console.log("loginwarden success");
    const data={email,password};
    return data;
}

export const logincaretaker=({email,password})=>{
    console.log("logincaretaker success");
    const data={email,password};
    return data;
}

export const loginstudent=({email,password})=>{
    console.log("loginstudent success");
    const data={email,password};
    return data;
}