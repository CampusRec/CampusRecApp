// src/screens/ProfileScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { fetchUserData, updateUserData } from "../services/authService"; // Updated imports
import { auth, db } from "../firebaseConfig"; // Firebase auth for current user

export default function ProfileScreen() {
  const [form, setForm] = useState({
    displayName: "",
    favoriteSports: [],
    university: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userId = auth.currentUser.uid;
        const data = await fetchUserData(userId); // Fetch user data
        setForm(data);
      } catch (error) {
        console.error("Error loading user data:", error);
        Alert.alert("Error", "Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const userId = auth.currentUser.uid;
      await updateUserData(userId, {
        favoriteSports: form.favoriteSports,
        university: form.university,
      }); // Update user data
      Alert.alert("Success", "Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1e88e5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="University"
        placeholderTextColor="#bdbdbd"
        value={form.university}
        onChangeText={(text) => setForm({ ...form, university: text })}
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
        <Text style={styles.updateButtonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#121212", justifyContent: "center" },
  header: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  input: {
    backgroundColor: "#1e88e5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    color: "#fff",
  },
  updateButton: { backgroundColor: "#43a047", padding: 15, borderRadius: 10, alignItems: "center" },
  updateButtonText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
});
