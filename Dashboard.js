// src/screens/Dashboard.js
import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet, Alert, FlatList } from "react-native";
import { checkLocationForFields } from "../services/geofencing";

export default function Dashboard() {
  const [geofencingEnabled, setGeofencingEnabled] = useState(false);
  const [nearbyFields, setNearbyFields] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleGeofencing = async () => {
      if (geofencingEnabled) {
        setLoading(true);
        try {
          const fields = await checkLocationForFields(100); // Radius of 100 meters
          setNearbyFields(fields);
          Alert.alert(
            "Geofencing Enabled",
            "You will receive notifications near sports fields."
          );
        } catch (error) {
          console.error("Error initializing geofencing:", error);
          Alert.alert("Error", "Failed to load geofencing data. Please try again later.");
        } finally {
          setLoading(false);
        }
      } else {
        setNearbyFields([]); // Clear fields when geofencing is disabled
        Alert.alert("Geofencing Disabled", "Notifications have been turned off.");
      }
    };

    handleGeofencing();
  }, [geofencingEnabled]);

  const toggleGeofencing = () => {
    setGeofencingEnabled((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to CampusRec!</Text>
      <Text style={styles.subtitle}>Toggle geofencing to discover nearby fields.</Text>

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>Enable Geofencing</Text>
        <Switch
          value={geofencingEnabled}
          onValueChange={toggleGeofencing}
          trackColor={{ false: "#767577", true: "#1e88e5" }}
          thumbColor={geofencingEnabled ? "#43a047" : "#f4f3f4"}
        />
      </View>

      {loading && <Text style={styles.loadingText}>Loading nearby fields...</Text>}

      {!loading && geofencingEnabled && (
        <>
          {nearbyFields.length > 0 ? (
            <FlatList
              data={nearbyFields}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.fieldItem}>
                  <Text style={styles.fieldName}>{item.fieldName}</Text>
                  <Text style={styles.fieldDetails}>Type: {item.type}</Text>
                  <Text style={styles.fieldDetails}>University: {item.university}</Text>
                </View>
              )}
            />
          ) : (
            <Text style={styles.noFieldsText}>No nearby fields found within range.</Text>
          )}
        </>
      )}

      {!geofencingEnabled && (
        <Text style={styles.noFieldsText}>Geofencing is currently disabled.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
    textAlign: "center",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  toggleLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  loadingText: {
    fontSize: 16,
    color: "#1e88e5",
    textAlign: "center",
    marginVertical: 10,
  },
  fieldItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  fieldName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  fieldDetails: {
    fontSize: 14,
    color: "#777",
  },
  noFieldsText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
});
