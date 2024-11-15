// src/services/firestore.js
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Ensure firebaseConfig is correctly set up

/**
 * Fetches all fields from the Firestore `Fields` collection.
 * @returns {Promise<Array>} An array of field objects.
 */
export const fetchFields = async () => {
  try {
    const fieldsCollection = collection(db, "Fields");
    const snapshot = await getDocs(fieldsCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching all fields:", error.message);
    throw new Error("Unable to fetch fields. Please try again later.");
  }
};

/**
 * Fetches fields filtered by university from Firestore.
 * @param {string} university - The university name to filter fields by.
 * @returns {Promise<Array>} An array of field objects for the specified university.
 */
export const fetchFieldsByUniversity = async (university) => {
  try {
    const fieldsQuery = query(
      collection(db, "Fields"),
      where("university", "==", university)
    );
    const snapshot = await getDocs(fieldsQuery);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(`Error fetching fields for university "${university}":`, error.message);
    throw new Error(
      `Unable to fetch fields for university "${university}". Please try again later.`
    );
  }
};
