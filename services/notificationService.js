// src/services/notificationService.js
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

/**
 * Adds a notification to the Firestore `Notifications` collection.
 * @param {Object} notificationData - Data for the new notification.
 * @param {string} notificationData.userId - The user ID associated with the notification.
 * @param {string} notificationData.title - The title of the notification.
 * @param {string} notificationData.message - The message body of the notification.
 * @returns {void}
 */
export const addNotification = async (notificationData) => {
  try {
    const { userId, title, message } = notificationData;
    await addDoc(collection(db, "Notifications"), {
      userId,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false, // Initially marked as unread
    });
    console.log("Notification added successfully.");
  } catch (error) {
    console.error("Error adding notification:", error);
    throw new Error("Failed to add notification.");
  }
};

/**
 * Fetches all notifications for a specific user.
 * @param {string} userId - The user ID for whom to fetch notifications.
 * @returns {Promise<Array>} - An array of notification objects.
 */
export const fetchNotificationsByUser = async (userId) => {
  try {
    const notificationsCol = collection(db, "Notifications");
    const q = query(notificationsCol, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Failed to fetch notifications.");
  }
};

/**
 * Marks a notification as read.
 * @param {string} notificationId - The ID of the notification to mark as read.
 * @returns {void}
 */
export const markNotificationAsRead = async (notificationId) => {
  try {
    const notificationRef = doc(db, "Notifications", notificationId);
    await updateDoc(notificationRef, { read: true });
    console.log("Notification marked as read.");
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw new Error("Failed to update notification.");
  }
};
