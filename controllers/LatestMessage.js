const LatestMessageModel = require("../models/LatestMessage");

const createMessage = async (req, res) => {
  try {
    console.log("enter createMessage ");
    const { message, role, id } = req.body;
    console.log(message, role, id);
    if (!message) {
      return res.status(400).json({
        data: "Enter data properly!!",
      });
    }
    if (role === "warden") {
      const creating = await LatestMessageModel.create({
        message: message,
        warden: id,
      });
      await creating.save();
      return res.status(201).json({
        data: creating,
        message: "Message created",
      });
    } else if (role === "Officer") {
      const creating = await LatestMessageModel.create({
        message: message,
        officer: id,
      });
      await creating.save();
      return res.status(201).json({
        data: creating,
        message: "Message created",
      });
    }
  } catch (error) {
    console.log("error while creating message");
  }
};

// problem is officer has no hostel and it find all hostels data
const getMessages = async (req, res) => {
  try {
    console.log("enter getMessages");
    // const { role } = req.body;
    // if (!role) {
    //   return res.status(400).json({
    //     message: "Something went wrong",
    //   });
    // }
    let data = await LatestMessageModel.find({})
      .sort({
        createdAt: -1,
      })
      .populate([
        {
          path: "officer",
          select: ["_id", "name", "phoneNo"],
        },
        {
          path: "warden",
          select: ["_id", "name", "phoneNo", "hostelAssign"],
        },
      ]);

    // let data = [];
    // if (role === "Officer") {
    //   data = await LatestMessageModel.find({}).sort({
    //     createdAt: 1,
    //   }).populate([
    //     {
    //       path: "officer",
    //       select: ["_id", "name", "phoneNo"],
    //     },
    //   ]);
    // } else if (role === "warden") {
    //   data=await LatestMessageModel.find({})
    //     .sort({
    //       createdAt: 1,
    //     })
    //     .populate([
    //       {
    //         path: "warden",
    //         select: ["_id", "name", "phoneNo", "hostelAssign"],
    //       },
    //     ]);
    // } else {
    //   data=await LatestMessageModel.find({}).sort({
    //     createdAt: 1,
    //   });
    // }

    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.log("Error while getting messages");
  }
};

const updateMessage = async (req, res) => {
  try {
    console.log("enter updateMessage");
    const { message_id, message } = req.body.datas;
    console.log(message_id, message);
    const updating = await LatestMessageModel.findByIdAndUpdate(
      { _id: message_id },
      {
        message: message,
      }
    );
    await updating.save();

    const allData = await LatestMessageModel.find({}).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      data: allData,
    });
  } catch (error) {
    console.log("error while updating message");
  }
};

const deleteMessage = async (req, res) => {
  try {
    // console.log("enter deleteMessage");
    const messageId = req.params.id;
    // console.log(messageId,typeof(messageId));
    const deleting = await LatestMessageModel.findByIdAndDelete(messageId);
    // await deleting.save();

    const allData = await LatestMessageModel.find({}).sort({
      createdAt: 1,
    });

    return res.status(200).json({
      data: allData,
    });
  } catch (error) {
    console.log("error while deleting message");
    console.log(error);
  }
};

module.exports = {
  createMessage,
  getMessages,
  updateMessage,
  deleteMessage,
};
