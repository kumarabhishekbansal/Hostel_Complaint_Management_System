const express=require("express");
const app=express();
const dotenv=require("dotenv");
const cors=require("cors");
const {connectDB}=require("./db/conn");
const {errorResponseHandling,invalidPathHandler}=require("./middlewares/errorHandling");


// import routers

const {officerrouter}=require("./routers/Officer");

dotenv.config();
// establish connections

connectDB();

// middlewares

app.use(express.json());
app.use(cors());

app.use("/api/officer",officerrouter);

app.use(errorResponseHandling);
app.use(invalidPathHandler);
const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    console.log("server is listening at home page");
})

app.listen(PORT,()=>{
    console.log(`Server is listening at port no. ${PORT}`);
})



