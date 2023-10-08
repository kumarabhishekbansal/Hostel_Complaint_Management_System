const express=require("express");
const app=express();
const dotenv=require("dotenv");
const cors=require("cors");
const {connectDB}=require("./db/conn");
const {errorResponseHandling,invalidPathHandler}=require("./middlewares/errorHandling");
const cookieParser=require("cookie-parser");
// const bodyParser = require("body-parser");
// import routers

const {officerrouter}=require("./routers/Officer");
const {wardenrouter}=require("./routers/Warden");
const {caretakerrouter}=require("./routers/careTaker");
const {studentrouter}=require("./routers/Students");
const {complaintrouter}=require("./routers/Complaint");
const {roomrouter}=require("./routers/Rooms");
const {hostelrouter}=require("./routers/Hostel");
dotenv.config();
// establish connections

connectDB();

// middlewares
app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors({credentials:true,origin: "http://localhost:3000"}));
app.use("/api/officer",officerrouter);
app.use("/api/warden",wardenrouter);
app.use("/api/caretaker",caretakerrouter);
app.use("/api/student",studentrouter);
app.use("/api/complaint",complaintrouter);
app.use("/api/room",roomrouter);
app.use("/api/hostel",hostelrouter);

app.use(errorResponseHandling);
app.use(invalidPathHandler);


const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    console.log("server is listening at home page");
})

app.listen(PORT,()=>{
    console.log(`Server is listening at port no. ${PORT}`);
})



