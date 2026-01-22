import Notification from "../models/notificationModel.js";

/*  Get all notifications of logged-in user */
export const getMyNotifications = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (err) {
    console.error("Get notifications error:", err);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};


/*  Mark single notification as read */
export const markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;

    await Notification.findByIdAndUpdate(id, { isRead: true });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Mark notification read error:", err);
    res.status(500).json({ message: "Failed to mark notification as read" });
  }
};


/* Mark all notifications as read */
export const markAllNotificationsRead = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    await Notification.updateMany(
      { user: userId, isRead: false },
      { isRead: true }
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Mark all read error:", err);
    res.status(500).json({ message: "Failed to mark all as read" });
  }
};
