import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    seenBy:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    message:{
        type:String,
        required:true
    }
},
{timestamps:true}
)
messageSchema.pre("save", function () {
  if (this.isNew) {
    if (!this.seenBy) {
      this.seenBy = [];
    }
    if (!this.seenBy.includes(this.senderId)) {
      this.seenBy.push(this.senderId);
    }
  }
});


const Message = mongoose.model("Message",messageSchema)

export default Message