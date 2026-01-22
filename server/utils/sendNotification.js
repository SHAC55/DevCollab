import notificationModel from "../models/notificationModel.js";

export const sendNotification = async (io, { userId, type, text, link }) => {
  const notify = await notificationModel.create({
    user: userId,
    type,
    text,
    link,
  });

  io.to(userId.toString()).emit("new_notification", notify);
};
