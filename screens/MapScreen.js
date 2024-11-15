// src/screens/MapScreen.js
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Text, Switch } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { checkLocationForFields } from "../services/geofencing";

export default function MapScreen() {
  const [fields, setFields] = useState([]);
  const [geofencingEnabled, setGeofencingEnabled] = useState(false);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const fieldsData = await checkLocationForFields();
        setFields(fieldsData);
      } catch (error) {
        console.error("Error loading fields:", error);
        Alert.alert("Error", "Failed to load fields. Please try again.");
      }
    };

    if (geofencingEnabled) {
      fetchFields();
    } else {
      setFields([]);
    }
  }, [geofencingEnabled]);

  const toggleGeofencing = () => {
    setGeofencingEnabled((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 30.4419,
          longitude: -84.2985,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {fields.map((field) => (
          <Marker
            key={field.id}
            coordinate={{
              latitude: field.location.latitude,
              longitude: field.location.longitude,
            }}
            title={field.fieldName}
            description={`Type: ${field.type}, University: ${field.university}`}
          />
        ))}
      </MapView>

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>Enable Geofencing</Text>
        <Switch
          value={geofencingEnabled}
          onValueChange={toggleGeofencing}
          trackColor={{ false: "#767577", true: "#1e88e5" }}
          thumbColor={geofencingEnabled ? "#43a047" : "#f4f3f4"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  toggleContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  toggleLabel: {
    fontSize: 14,
    marginRight: 10,
  },
});
