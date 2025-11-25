import User from "../models/user.model.js";
import { countUnseenMessages, getLastMessage } from "./message.controller.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    


    function formatTimeAgo(date) {
      const ms = Date.now() - new Date(date).getTime();

      const minutes = Math.floor(ms / (1000 * 60));
      const hours = Math.floor(ms / (1000 * 60 * 60));
      const days = Math.floor(ms / (1000 * 60 * 60 * 24));
      const weeks = Math.floor(days / 7);
      const months = Math.floor(days / 30);
      const years = Math.floor(days / 365);

      if (minutes < 1) return `just now`;
      if (minutes < 60) return `${minutes} min`;
      if (hours < 24) return `${hours} hr`;
      if (days < 7) return `${days} day`;
      if (weeks < 4) return `${weeks} week`;
      if (months < 12) return `${months} month`;
      return `${years} year`;
    }

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    let users = await Promise.all(
  filteredUsers.map(async (user) => {
    const lastMessage = await getLastMessage(loggedInUserId, user._id);
    const unseenMessagesAmount = await countUnseenMessages(loggedInUserId, user._id);

    return {
      id: user._id,
      name: user.fullName,
      avatar: user.profilePic,
      lastMessage: lastMessage?.message || "",
      timeAgo: lastMessage ? formatTimeAgo(lastMessage.createdAt) : "",
      lastMessageTime: lastMessage ? new Date(lastMessage.createdAt) : null,
      unreadCount: unseenMessagesAmount,
    };
  })
);

// sort by latest message time
users.sort((a, b) => {
  if (!a.lastMessageTime && !b.lastMessageTime) return 0;
  if (!a.lastMessageTime) return 1;
  if (!b.lastMessageTime) return -1;
  return b.lastMessageTime - a.lastMessageTime;
});



    res.status(200).json(users);
  } catch (error) {
    console.log("error in getUserForSidebar controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
export const getUserbyId = async (req, res) => {
  try {
    const id = req.params.id;

    const filteredUser = await User.findById(id).select("-password");

    res.status(200).json(filteredUser);
  } catch (error) {
    console.log("error in getUserForSidebar controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
export const getUserByToken = async (req, res, next) => {
  try {
    // console.log(req);
    const id = req.user._id;
    const filteredUser = await User.findById(id).select("-password");
    if (!filteredUser) {
      return res.status(404).json({
        message: "user not found by this token",
      });
    }
    res.status(200).json(filteredUser);
  } catch (error) {
    console.log("error in getUserForSidebar controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in updateUserById controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("error in deleteUserById controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("error in getUserByUsername controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const updateUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const updatedData = req.body;

    const updatedUser = await User.findOneAndUpdate({ username }, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in updateUserByUsername controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const deletedUser = await User.findOneAndDelete({ username });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("error in deleteUserByUsername controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
