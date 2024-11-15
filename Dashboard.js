import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { checkLocationForFields } from "../services/geofencing";

export default function Dashboard() {
  useEffect(() => {
    const startGeofencing = async () => {
      await checkLocationForFields();
    };

    startGeofencing();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to CampusRec!</Text>
      <Text style={styles.subtitle}>We’ll notify you if you're near a game!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
  },
});
