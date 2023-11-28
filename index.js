const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./db/conn");
const {
  errorResponseHandling,
  invalidPathHandler,
} = require("./middlewares/errorHandling");
const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// import routers

const { officerrouter } = require("./routers/Officer");
const { wardenrouter } = require("./routers/Warden");
const { caretakerrouter } = require("./routers/careTaker");
const { studentrouter } = require("./routers/Students");
const { complaintrouter } = require("./routers/Complaint");
const { roomrouter } = require("./routers/Rooms");
const { hostelrouter } = require("./routers/Hostel");
const { MessageRouter } = require("./routers/LatestMessage");
const { msgroute } = require("./routers/Contact");
dotenv.config();
// establish connections

connectDB();

// middlewares
app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["https://abhishek-hcm.onrender.com/", "http://localhost:3000"],
    methods: ["GET", "POST"],
  })
);
app.use("/api/officer", officerrouter);
app.use("/api/warden", wardenrouter);
app.use("/api/caretaker", caretakerrouter);
app.use("/api/student", studentrouter);
app.use("/api/complaint", complaintrouter);
app.use("/api/room", roomrouter);
app.use("/api/hostel", hostelrouter);
app.use("/api/message", MessageRouter);
app.use("/api/contact", msgroute);

app.use(errorResponseHandling);
// app.use(invalidPathHandler);

const PORT = process.env.PORT || 5000;
const path = require("path");
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.get("/", (req, res) => {
  console.log("server is listening at home page");
});
app.get("/delete-cookie", async (req, res) => {
  try {
    console.log("enter logout");
    if (
      // req.headers.authorization &&
      // req.headers.authorization.startsWith("Bearer_Officer")
      req.headers.cookie
    ) {
      const cookie_name = req.headers.cookie.split("=")[0];
      console.log(cookie_name, req.headers.cookie);
      res.cookie(cookie_name, "", { expires: new Date(0) });
      res.send("Cookie deleted");
    }
  } catch (error) {
    console.log("Unable to logout");
  }
});

app.use(invalidPathHandler);
app.listen(PORT, () => {
  console.log(`Server is listening at port no. ${PORT}`);
});
