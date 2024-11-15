// src/screens/GameDetailsScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { fetchFieldDetails, rsvpToGame } from "../service/fieldsService";

export default function GameDetailsScreen({ route, navigation }) {
  const { fieldId, fieldName } = route.params;
  const [fieldDetails, setFieldDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rsvped, setRsvped] = useState(false);

  useEffect(() => {
    const loadFieldDetails = async () => {
      try {
        const data = await fetchFieldDetails(fieldId);
        setFieldDetails(data);
      } catch (error) {
        console.error("Error fetching field details:", error);
        Alert.alert("Error", "Unable to load field details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadFieldDetails();
  }, [fieldId]);

  const handleRSVP = async () => {
    try {
      await rsvpToGame(fieldId);
      setRsvped(true);
      Alert.alert("Success", "You have successfully RSVP'd to the game.");
    } catch (error) {
      console.error("RSVP Error:", error);
      Alert.alert("Error", "Unable to RSVP. Please try again later.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e88e5" />
        <Text style={styles.loadingText}>Loading field details...</Text>
      </View>
    );
  }

  if (!fieldDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load field details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{fieldName}</Text>
      <Text style={styles.details}>Type: {fieldDetails.type}</Text>
      <Text style={styles.details}>Sports: {fieldDetails.sports.join(", ")}</Text>
      <Text style={styles.details}>University: {fieldDetails.university}</Text>
      <Text style={styles.details}>
        Location: {fieldDetails.location.latitude}, {fieldDetails.location.longitude}
      </Text>

      <TouchableOpacity
        style={[styles.rsvpButton, rsvped && styles.rsvpButtonDisabled]}
        onPress={handleRSVP}
        disabled={rsvped}
      >
        <Text style={styles.rsvpButtonText}>{rsvped ? "RSVP'd" : "RSVP Now"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Games</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#121212" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { fontSize: 16, color: "#bdbdbd", marginTop: 10 },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 18, color: "#bdbdbd" },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  details: { fontSize: 16, color: "#bdbdbd", marginBottom: 10 },
  rsvpButton: {
    marginTop: 20,
    backgroundColor: "#1e88e5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  rsvpButtonDisabled: { backgroundColor: "#bdbdbd" },
  rsvpButtonText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  backButton: {
    marginTop: 15,
    backgroundColor: "#fdd835",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  backButtonText: { fontSize: 14, fontWeight: "bold", color: "#1e88e5" },
});
