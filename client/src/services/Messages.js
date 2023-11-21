import axios from "axios";
axios.defaults.withCredentials = true;
const api_key="/api/message/";

export const createMessage=async({message,role,id})=>{
    try {
        const data=await axios.post(api_key+"create",{
            message:message,
            role:role,
            id:id
        },{
            withCredentials:true
        });
        // console.log(data.data);
        return data.data;
    } catch (error) {
        
    }
}

export const getMessage=async()=>{
    try {
        const data=await axios.get(api_key+"messages",{
            withCredentials:true
        });
        
        return data && data?.data?.data;

    } catch (error) {
        
    }
}

export const editMessage=async(message_id,message)=>{
    try {
        const datas={message_id:message_id,message:message}
        const data=await axios.patch(api_key+"edit_message",{
            datas
        },{
            withCredentials:true
        });
        
        return getMessage();

    } catch (error) {
        
    }
}

export const deleteMessage=async({message_id})=>{
    try {
        const data=await axios.delete(api_key+"deleteMessage",{
            message_id:message_id,
        },{
            withCredentials:true
        });
        
        return getMessage();

    } catch (error) {
        
    }
}
