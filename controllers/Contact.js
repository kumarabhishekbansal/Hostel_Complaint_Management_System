const Message = require("../models/Contact");
const {ContactMail}=require("../helper/mailer/ContactMail");
const addmessage = async (req, res) => {
  try {
    console.log("enter add message");
    const { fullname,email,message } = req.body;

    if (!fullname || !email || !message) {
      return res.status(400).json({
        message: "please filled all data",
      });
    }
    const msgcreate = await Message.create({
        fullname:fullname,email:email,message:message
    });
    await msgcreate.save();

    if(msgcreate)
    {
        console.log("enter msgcreate");
        ContactMail(msgcreate);
        return res.status(200).json({
            message: "Message created check your mail",
          });
    }
    return res.status(400).json({
        message: "Message can not be created",
      });

  } catch (error) {
    console.log("error while add message");
  }
};


module.exports={addmessage}