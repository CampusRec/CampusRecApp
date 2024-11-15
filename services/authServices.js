// src/services/authService.js
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // Import Firestore setup

const auth = getAuth();

/**
 * Sign up a new user and save user data to Firestore.
 * @param {string} email - User's email address.
 * @param {string} password - User's password.
 * @param {string} name - User's full name.
 * @returns {Object} - Authenticated user object.
 */
export const signup = async (email, password, name) => {
  try {
    // Create user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user data in Firestore
    await setDoc(doc(db, "Users", user.uid), {
      displayName: name,
      email: email,
      profilePicture: "", // Default empty profile picture
      favoriteSports: [], // Initialize as empty
      university: "", // Placeholder for university
      createdAt: new Date().toISOString(), // Account creation timestamp
    });

    return user;
  } catch (error) {
    console.error("Signup Error:", error);
    throw new Error("Failed to sign up. Please try again.");
  }
};

/**
 * Log in an existing user.
 * @param {string} email - User's email address.
 * @param {string} password - User's password.
 * @returns {Object} - Authenticated user object.
 */
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Login Error:", error);
    throw new Error(error.message || "Invalid email or password. Please try again.");
  }
};

/**
 * Log out the current user.
 */
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error:", error);
    throw new Error(error.message || "Failed to log out. Please try again.");
  }
};

/**
 * Fetch user data from Firestore.
 * @param {string} userId - User's Firebase Auth UID.
 * @returns {Object} - User data from Firestore.
 */
export const fetchUserData = async (userId) => {
  try {
    const userDocRef = doc(db, "Users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error("User not found.");
    }
  } catch (error) {
    console.error("Fetch User Data Error:", error);
    throw new Error("Failed to fetch user data. Please try again.");
  }
};

/**
 * Update user data in Firestore.
 * @param {string} userId - User's Firebase Auth UID.
 * @param {Object} updates - Object containing the fields to update.
 * @returns {void}
 */
export const updateUserData = async (userId, updates) => {
  try {
    const userDocRef = doc(db, "Users", userId);
    await updateDoc(userDocRef, updates);
  } catch (error) {
    console.error("Update User Data Error:", error);
    throw new Error("Failed to update user data. Please try again.");
  }
};
