const MessageRouter=require("express").Router();

const{
    createMessage,
    getMessages,
    updateMessage,
    deleteMessage
}=require("../controllers/LatestMessage");


MessageRouter.post("/create",createMessage);
MessageRouter.get("/messages",getMessages);
MessageRouter.delete("/remove_message/:id",deleteMessage);
MessageRouter.patch("/edit_message",updateMessage);

module.exports={
    MessageRouter
}