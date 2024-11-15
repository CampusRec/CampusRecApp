// src/services/gameService.js
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

/**
 * Adds a new game to the Firestore `Games` collection.
 * @param {Object} gameData - Data for the new game.
 * @param {string} gameData.gameName - Name of the game.
 * @param {string} gameData.fieldId - Reference to a field in the `Fields` collection.
 * @param {Array<string>} gameData.participants - Array of user IDs for participants.
 * @param {Timestamp} gameData.startTime - Start time of the game.
 * @param {Timestamp} gameData.endTime - End time of the game.
 * @param {string} gameData.status - Status of the game (e.g., Open, Waitlist, Closed).
 * @returns {void}
 */
export const addGame = async (gameData) => {
  try {
    const { gameName, fieldId, participants, startTime, endTime, status } = gameData;
    await addDoc(collection(db, "Games"), {
      gameName,
      fieldId, // Field document ID
      participants, // Array of user IDs
      startTime, // Timestamp
      endTime, // Timestamp
      status, // Open, Waitlist, Closed
    });
    console.log("Game added successfully.");
  } catch (error) {
    console.error("Error adding game:", error);
    throw new Error("Failed to add game.");
  }
};

/**
 * Fetches all games from the Firestore `Games` collection.
 * @returns {Promise<Array>} An array of game objects.
 */
export const fetchAllGames = async () => {
  try {
    const gamesCollection = collection(db, "Games");
    const snapshot = await getDocs(gamesCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching all games:", error);
    throw new Error("Unable to fetch games. Please try again later.");
  }
};

/**
 * Fetches games filtered by status.
 * @param {string} status - The status of the games to filter by (e.g., Open).
 * @returns {Promise<Array>} An array of game objects with the specified status.
 */
export const fetchGamesByStatus = async (status) => {
  try {
    const gamesCol = collection(db, "Games");
    const q = query(gamesCol, where("status", "==", status));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(`Error fetching games with status "${status}":`, error);
    throw new Error("Unable to fetch games. Please try again later.");
  }
};
