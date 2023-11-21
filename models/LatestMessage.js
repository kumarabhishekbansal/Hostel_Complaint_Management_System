const mongoose=require("mongoose");

const LatestMessageSchema=new mongoose.Schema({
    message:{
        type:String,
        default:"",
        required:true,
    },
    warden:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Warden',
        default:null,
    },
    officer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Officer',
        default:null,
    }
},{
    timestamps:true,
})

const LatestMessageModel=new mongoose.model('LatestMessageModel',LatestMessageSchema);

module.exports=LatestMessageModel;