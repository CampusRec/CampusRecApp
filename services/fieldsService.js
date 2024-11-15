// src/services/fieldsService.js
import { collection, getDocs, query, where, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // Ensure firebaseConfig is set up

/**
 * Fetches all fields from the Firestore `Fields` collection.
 * @returns {Promise<Array>} An array of field objects.
 */
export const fetchAllFields = async () => {
  try {
    const fieldsCol = collection(db, "Fields");
    const snapshot = await getDocs(fieldsCol);
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
 * Fetches fields filtered by university.
 * @param {string} university - The name of the university to filter fields by.
 * @returns {Promise<Array>} An array of field objects for the specified university.
 */
export const fetchFieldsByUniversity = async (university) => {
  try {
    const fieldsCol = collection(db, "Fields");
    const q = query(fieldsCol, where("university", "==", university));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(`Error fetching fields for university "${university}":`, error.message);
    throw new Error("Unable to fetch university fields. Please try again later.");
  }
};

/**
 * Fetches fields filtered by sport.
 * @param {string} sport - The name of the sport (e.g., "Soccer").
 * @returns {Promise<Array>} An array of field objects for the specified sport.
 */
export const fetchFieldsBySport = async (sport) => {
  try {
    const fieldsCol = collection(db, "Fields");
    const q = query(fieldsCol, where("sports", "array-contains", sport));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(`Error fetching fields for sport "${sport}":`, error.message);
    throw new Error("Unable to fetch sport fields. Please try again later.");
  }
};

/**
 * Fetches fields filtered by type.
 * @param {string} type - The type of field (e.g., "Indoor", "Outdoor").
 * @returns {Promise<Array>} An array of field objects for the specified type.
 */
export const fetchFieldsByType = async (type) => {
  try {
    const fieldsCol = collection(db, "Fields");
    const q = query(fieldsCol, where("type", "==", type));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(`Error fetching fields for type "${type}":`, error.message);
    throw new Error("Unable to fetch type fields. Please try again later.");
  }
};

/**
 * Fetches fields filtered by university and sport.
 * @param {string} university - The name of the university.
 * @param {string} sport - The sport to filter by.
 * @returns {Promise<Array>} An array of field objects matching the specified university and sport.
 */
export const fetchFieldsByUniversityAndSport = async (university, sport) => {
  try {
    const fieldsCol = collection(db, "Fields");
    const q = query(
      fieldsCol,
      where("university", "==", university),
      where("sports", "array-contains", sport)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(
      `Error fetching fields for university "${university}" and sport "${sport}":`,
      error.message
    );
    throw new Error("Unable to fetch university and sport fields. Please try again later.");
  }
};

/**
 * Handles dynamic field filtering by university and/or sport.
 * Integrates logic from handleApplyFilters for seamless usability.
 * @param {string} selectedUniversity - Selected university for filtering.
 * @param {string} selectedType - Selected sport/type for filtering.
 * @param {function} onApplyFilters - Callback function to handle the filtered data.
 */
export const handleApplyFilters = async (selectedUniversity, selectedType, onApplyFilters) => {
  try {
    let filteredFields = [];
    if (selectedUniversity) {
      filteredFields = await fetchFieldsByUniversity(selectedUniversity);
    }
    if (selectedType) {
      const sportFilteredFields = await fetchFieldsBySport(selectedType);
      filteredFields = [...filteredFields, ...sportFilteredFields];
    }

    if (onApplyFilters) {
      onApplyFilters(filteredFields);
    }
  } catch (error) {
    console.error("Filter error:", error);
    throw new Error("Failed to apply filters. Please try again.");
  }
};

/**
 * Adds a new field to the Firestore `Fields` collection.
 * @param {Object} fieldData - Data for the new field.
 * @param {string} fieldData.fieldName - The name of the field.
 * @param {Object} fieldData.location - Location object with latitude and longitude.
 * @param {Array<string>} fieldData.sports - Array of sports available at the field.
 * @param {string} fieldData.type - Type of the field (e.g., "Indoor", "Outdoor").
 * @param {string} fieldData.university - University associated with the field.
 * @returns {void}
 */
export const addField = async (fieldData) => {
  try {
    const { fieldName, location, sports, type, university } = fieldData;
    const docRef = doc(db, "Fields", fieldName.replace(/\s+/g, "_")); // Use a safe ID
    await setDoc(docRef, {
      fieldName,
      location, // { latitude, longitude }
      sports, // Array of sports
      type, // Indoor/Outdoor
      university,
    });
    console.log("Field added successfully.");
  } catch (error) {
    console.error("Error adding field:", error);
    throw new Error("Failed to add field.");
  }
};
