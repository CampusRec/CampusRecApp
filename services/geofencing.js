import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { fetchFields } from "./firestore"; // Import the Firestore utility

export const checkLocationForFields = async () => {
  const { coords } = await Location.getCurrentPositionAsync();
  const fields = await fetchFields();

  fields.forEach((field) => {
    const distance = getDistance(
      { latitude: coords.latitude, longitude: coords.longitude },
      { latitude: field.location.latitude, longitude: field.location.longitude }
    );

    if (distance < 50) { // If within 50 meters
      Notifications.scheduleNotificationAsync({
        content: {
          title: `You're near ${field.fieldName}`,
          body: `Check out ${field.sports.join(", ")} games happening here!`,
        },
        trigger: null,
      });
    }
  });
};
