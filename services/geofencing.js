// src/services/geofencing.js
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { addNotification } from "../services/notificationService";

const GEOFENCE_TASK = "geofence-task";

// Define the geofencing task
TaskManager.defineTask(GEOFENCE_TASK, async ({ data, error }) => {
  if (error) {
    console.error("Geofencing Task Error:", error);
    return;
  }

  if (data.eventType === Location.GeofencingEventType.Enter) {
    const fieldName = data.region.identifier; // Field name from geofencing region
    const userId = Location.userId; // Assuming userId is available globally or passed contextually

    console.log(`Entered geofence for: ${fieldName}`);
    try {
      // Trigger notification
      await handleGeofenceEvent(fieldName, userId);
    } catch (err) {
      console.error("Failed to handle geofence event:", err);
    }
  }
});

/**
 * Handles geofencing events and triggers a notification.
 * @param {string} fieldName - The name of the field entered.
 * @param {string} userId - The ID of the user entering the geofence.
 */
const handleGeofenceEvent = async (fieldName, userId) => {
  try {
    await addNotification({
      userId,
      title: `Welcome to ${fieldName}`,
      message: "You're near a sports field. Check out nearby games!",
    });
    console.log(`Notification sent for entering ${fieldName}`);
  } catch (error) {
    console.error("Failed to add geofencing notification:", error);
  }
};

/**
 * Configures and starts geofencing for nearby fields.
 * @param {Array<Object>} fields - Array of field objects with geolocation data.
 * @param {number} radius - Radius for geofencing in meters.
 */
export const setupGeofencing = async (fields, radius = 100) => {
  try {
    // Request location permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Location permissions not granted");
    }

    const geofencingRegions = fields.map((field) => ({
      identifier: field.fieldName,
      latitude: field.location.latitude,
      longitude: field.location.longitude,
      radius,
      notifyOnEnter: true,
    }));

    // Request background permissions
    await Location.requestBackgroundPermissionsAsync();

    // Start geofencing
    await Location.startGeofencingAsync(GEOFENCE_TASK, geofencingRegions);
    console.log("Geofencing started for regions:", geofencingRegions);
  } catch (error) {
    console.error("Error setting up geofencing:", error);
    throw new Error("Failed to set up geofencing.");
  }
};

/**
 * Fetches fields and sets up geofencing.
 * @param {number} radius - Geofencing radius in meters.
 */
export const checkLocationForFields = async (radius = 100) => {
  try {
    const fieldsCollection = collection(db, "Fields");
    const snapshot = await getDocs(fieldsCollection);
    const fields = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    await setupGeofencing(fields, radius);
  } catch (error) {
    console.error("Error in checkLocationForFields:", error);
    throw error; // Propagate the error
  }
};
