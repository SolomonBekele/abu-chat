import Message from "../models/message.model.js"
import Conversation from "../models/conversation.model.js"
import { getReceiverSocketId ,io} from "../socket/socket.js";

export const sendMessage = async (req,res)=>{
    try {
         const {message} = req.body;
         const {id:receiverId} =req.params;
        //  const {message} = req.body.message;
        //  const {id:receiverId} =req.body.id;
         const senderId = req.user._id;

         let conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]},
         })

         if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,receiverId]
            })
         }
         const newMessage = new Message({
            senderId,
            receiverId,
            message,
         })

         if (newMessage){
            conversation.messages.push(newMessage._id)
         }
        //  await conversation.save();
        //  await newMessage.save();

        //  this will run in parallel

        await Promise.all([conversation.save(),newMessage.save()]);

        // SOCKET IO FUCTIONALITY WILL GO HERE
        const receiverSocketId = getReceiverSocketId(receiverId);

        if(receiverSocketId){
            // io.to(<socket_id> ).emit used to send events to specific client
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        res.status(201).json(newMessage);
         

    } catch (error) {
        console.log("error in sendMessage controller", error.message)
        res.status(500).json({ error: error.message })
    }
} 

export const getMessages = async (req,res) =>{
    try {
        const {id:userToChatId}= req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]},
        }).populate("messages")

        if(!conversation)return res.status(200).json([])
        res.status(200).json(conversation.messages)

    } catch (error) {
        console.log("error in getMessages controller", error.message)
        res.status(500).json({ error: error.message })
    }
}
export const getLastMessage = async (userToChatId,senderId) => {
  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    });

    if (!conversation) return null;

    // Fetch only the LAST message
    const lastMessage = await Message.findOne({
      _id: { $in: conversation.messages },
    })
      .sort({ createdAt: -1 })
      .limit(1);
    return lastMessage;
  } catch (error) {
    console.log("Error in getLastMessage controller", error.message);
  }
};
export const markMessageAsSeen = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id;

    const message = await Message.findById(messageId);

    if (!message) return res.status(404).json({ error: "Message not found" });

    // Add user to seenBy only if not already seen
    if (!message.seenBy.includes(userId)) {
      message.seenBy.push(userId);
      await message.save();
    }

    return res.status(200).json(message);
  } catch (error) {
    console.error("Error marking message as seen:", error);
    res.status(500).json({ error: error.message });
  }
};

export async function countUnseenMessages(loggedInUserId, userId) {
  const conversation = await Conversation.findOne({
    participants: { $all: [loggedInUserId, userId] },
  }).populate({
    path: "messages",
    populate: {
      path: "seenBy",
      model: "User",
    },
  });

  if (!conversation) return 0;

  const unseenCount = conversation.messages.filter((msg) => {
    // sender is the other user
    const isFromUser = msg.senderId.toString() === userId.toString();

    // sent to logged-in user
    const isToLoggedInUser = msg.receiverId.toString() === loggedInUserId.toString();

    // loggedInUser *not* in seenBy array
    const notSeen = !msg.seenBy.some(
      (user) => user._id.toString() === loggedInUserId.toString()
    );

    return isFromUser && isToLoggedInUser && notSeen;
  }).length;

  return unseenCount;
}

