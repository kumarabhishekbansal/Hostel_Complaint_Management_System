const jwt = require("jsonwebtoken");
const Warden=require("../models/Warden");
const Officer=require("../models/Officer");
const Student=require("../models/Student");
const careTaker=require("../models/careTaker");



// note------------->  



// whenever we got a token to check then it would be sent by fronted with some sepecial keyword starting of that token


// we will pass only generated token but the token which will come from frontend in headers section it must be come by our choice (developer choice)


// important -----------------> above

// const authGuard = async (req, res, next) => {
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer_Officer")
//   ) {
//     try {
//       const token = req.headers.authorization.split(" ")[1];
//       const { id } = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(id).select("-password");
//       next();
//     } catch (error) {
//       let err = new Error("Not authorized, Token failed");
//       err.statusCode = 401;
//       next(err);
//     }
//   } else {
//     let error = new Error("Not authorized, No token");
//     error.statusCode = 401;
//     next(error);
//   }
// };

// officer authorized

const officerGuard = async (req, res, next) => {
  console.log("officerGuard is :  ",req.headers.cookie);
  if (
    // req.headers.authorization &&
    // req.headers.authorization.startsWith("Bearer_Officer")
    req.headers.cookie && req.headers.cookie.startsWith("Bearer_Officer")
  ) {
    try {
      // const token = req.headers.authorization.split(" ")[1];
      const token = req.headers.cookie.split("=")[1];
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      req.officer = await Officer.findById(id).select("-password");
      next();
    } catch (error) {
      let err = new Error("Not authorized, Token failed");
      err.statusCode = 401;
      next(err);
    }
  } else {
    let error = new Error("Not authorized, No token");
    error.statusCode = 401;
    next(error);
  }
};

// const officerGuard = (req, res, next) => {
//   if (req.user && req.user.role && req.user.role === "Officer") {
//     req.officer = req.user;
//     next();
//   } else {
//     let error = new Error("Not authorized as an Officer");
//     error.statusCode = 401;
//     next(error);
//   }
// };

// warden authorized

const wardenGuard = async (req, res, next) => {
  console.log("wardenGuard ",req.headers.cookie);
  if (
    // req.headers.authorization &&
    // req.headers.authorization.startsWith("Bearer_Warden")
    req.headers.cookie && req.headers.cookie.startsWith("Bearer_Warden")
    ) {
      try {
        // const token = req.headers.authorization.split(" ")[1];
        const token = req.headers.cookie.split("=")[1];
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      req.warden = await Warden.findById(id).select("-password");
      next();
    } catch (error) {
      let err = new Error("Not authorized, Token failed");
      err.statusCode = 401;
      next(err);
    }
  } else {
    let error = new Error("Not authorized, No token");
    error.statusCode = 401;
    next(error);
  }
};

// const wardenGuard = (req, res, next) => {
//   if (req.user && req.user.role === "warden") {
//     req.warden = req.user;
//     next();
//   } else {
//     let error = new Error("Not authorized as an warden");
//     error.statusCode = 401;
//     next(error);
//   }
// };


// caretaker authorized

const caretakerGuard = async (req, res, next) => {
  console.log("caretakerGuard ",req.headers.cookie);
  if (
    // req.headers.authorization &&
    // req.headers.authorization.startsWith("Bearer_caretaker")
    req.headers.cookie && req.headers.cookie.startsWith("Bearer_caretaker")
    ) {
      try {
        // const token = req.headers.authorization.split(" ")[1];
        const token = req.headers.cookie.split("=")[1];
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      req.caretaker = await careTaker.findById(id).select("-password");
      next();
    } catch (error) {
      let err = new Error("Not authorized, Token failed");
      err.statusCode = 401;
      next(err);
    }
  } else {
    let error = new Error("Not authorized, No token");
    error.statusCode = 401;
    next(error);
  }
};

// const caretakerGuard = (req, res, next) => {
//   if (req.user && req.user.role === "caretaker") {
//     req.caretaker = req.user;
//     next();
//   } else {
//     let error = new Error("Not authorized as an caretaker");
//     error.statusCode = 401;
//     next(error);
//   }
// };


// student authorized

const studentGuard = async (req, res, next) => {
  console.log("studentGuard ",req.headers.cookie);
  if (
    // req.headers.authorization &&
    // req.headers.authorization.startsWith("Bearer_student")
    req.headers.cookie && req.headers.cookie.startsWith("Bearer_student")
    ) {
      try {
        // const token = req.headers.authorization.split(" ")[1];
        const token = req.headers.cookie.split("=")[1];
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      req.student = await Student.findById(id).select("-password");
      next();
    } catch (error) {
      let err = new Error("Not authorized, Token failed");
      err.statusCode = 401;
      next(err);
    }
  } else {
    let error = new Error("Not authorized, No token");
    error.statusCode = 401;
    next(error);
  }
};


// const studentGuard = (req, res, next) => {
//   if (req.user && req.user.role === "student") {
//     req.student = req.user;
//     next();
//   } else {
//     let error = new Error("Not authorized as an student");
//     error.statusCode = 401;
//     next(error);
//   }
// };

module.exports = {
  officerGuard,
  caretakerGuard,
  wardenGuard,
  studentGuard,
};
