// src/services/geofirestore.js
import { collection } from "firebase/firestore";
import { GeoFirestore } from "geofirestore";
import { auth, db } from "../firebaseConfig"; // Ensure this points to the correct Firebase setup

/**
 * Fetches fields within a specified radius of a given latitude and longitude.
 * Uses GeoFirestore for geospatial queries.
 *
 * @param {number} latitude - The latitude of the center point.
 * @param {number} longitude - The longitude of the center point.
 * @param {number} radiusInKm - The search radius in kilometers.
 * @returns {Promise<Array>} An array of field objects within the radius.
 */
export const fetchNearbyFields = async (latitude, longitude, radiusInKm) => {
  try {
    // Initialize GeoFirestore with the "Fields" collection
    const geoFirestore = new GeoFirestore(collection(db, "Fields"));

    // Create a geospatial query
    const geoQuery = geoFirestore.query({
      center: [latitude, longitude],
      radius: radiusInKm,
    });

    // Execute the query and fetch results
    const querySnapshot = await geoQuery.get();
    const fields = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Nearby fields fetched:", fields);
    return fields; // Return the list of nearby fields
  } catch (error) {
    console.error("Error fetching nearby fields:", error);
    throw new Error("Failed to fetch nearby fields. Please try again.");
  }
};
