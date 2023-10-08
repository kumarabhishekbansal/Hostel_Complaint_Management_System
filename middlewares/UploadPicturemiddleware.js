const multer=require("multer");
const path=require("path");

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,"../uploads"));
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);
    },
});

const uploadPicture=multer({
    storage:storage,
    limits:{
        fileSize:1*1000000,
    },
    fileFilter:function(req,file,cb){
        let extension=path.extname(file.originalname);
        if(extension!=='png' && extension!=='jpg' && extension!=='jpeg')
        {
            return cb(new Error("Only images are allowed"));
        }
        cb(null,true);
    }
});

module.exports={uploadPicture};