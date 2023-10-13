import validator from "validator";

export const emailvalidate=(email)=>{
    if(!validator.isEmail(email)) return false;
    return true;
}

