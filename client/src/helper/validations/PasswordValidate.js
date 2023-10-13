import validator from "validator";

export const passwordvalidate=(password)=>{
    if(!validator.isStrongPassword(password))
    {
        return false;
    }
    return true;
}

export const matchPassword=(password,confirmpassword)=>{
    if(password===confirmpassword) return true;
    return false;
}



