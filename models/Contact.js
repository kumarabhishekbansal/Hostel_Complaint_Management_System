const mongoose=require("mongoose");

const messageSchema=new mongoose.Schema({
    fullname:{
        type:String,
    },
    email:{
        type:String,
    },
    message:{
        type:String,
    }
},{
    timestamps:true
})

const Message=new mongoose.model("Message",messageSchema);

module.exports=Message;