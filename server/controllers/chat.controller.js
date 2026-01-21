import chatModel from "../models/chatModel.js";


//
export const getMessages = async (req, res) => {
  const messages = await chatModel
    .find({ roomId: req.params.roomId })
    .sort({ createdAt: 1 });

  res.json(messages);
};

export const getRecentChats = async (req, res) => {
  try {
    const userId = req.user.id;

    // get all messages where user is sender or receiver
    const chats = await chatModel
      .find({
        $or: [{ sender: userId }, { receiver: userId }],
      })
      .populate("sender", "username avatar")
      .populate("receiver", "username avatar")
      .sort({ createdAt: -1 }); // latest first

    // group by roomId (one entry per conversation)
    const chatMap = {};

    chats.forEach((msg) => {
      if (!chatMap[msg.roomId]) {
        chatMap[msg.roomId] = msg; // first = latest msg
      }
    });

    const recentChats = Object.values(chatMap);

    res.json(recentChats);
  } catch (error) {
    console.error("Recent chat error:", error);
    res.status(500).json({ message: "Failed to fetch recent chats" });
  }
};
