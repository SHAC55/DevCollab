import chatModel from "../models/chatModel.js";
import Problem from "../models/problemModel.js"; // add at top

//  Messages of one room
export const getMessages = async (req, res) => {
  try {
    const messages = await chatModel
      .find({ roomId: req.params.roomId })
      .sort({ createdAt: 1 })
      .populate("sender", "username")
      .populate("receiver", "username");

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to load messages" });
  }
};

export const getRecentChats = async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await chatModel
      .find({
        $or: [{ sender: userId }, { receiver: userId }],
      })
      .populate("sender", "username")
      .populate("receiver", "username")
      .sort({ createdAt: -1 });

    // group by roomId (problemId)
    const chatMap = {};
    chats.forEach((msg) => {
      if (!chatMap[msg.roomId]) chatMap[msg.roomId] = msg;
    });

    const recentChats = Object.values(chatMap);

    //  attach problem title
    const problemIds = recentChats.map((c) => c.roomId);

    const problems = await Problem.find({ _id: { $in: problemIds } }, "title");

    const problemMap = {};
    problems.forEach((p) => {
      problemMap[p._id.toString()] = p.title;
    });

    const finalChats = recentChats.map((c) => ({
      ...c.toObject(),
      problemTitle: problemMap[c.roomId] || "Project",
    }));

    res.json(finalChats);
  } catch (err) {
    console.error("Recent chat error:", err);
    res.status(500).json({ message: "Failed to fetch recent chats" });
  }
};
