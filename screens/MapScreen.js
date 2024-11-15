import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Ensure firebaseConfig is correctly set up

export default function MapScreen() {
  const [games, setGames] = useState([]); // Games fetched from Firestore
  const [selectedGame, setSelectedGame] = useState(null); // Currently selected game

  // Fetch games from Firestore
  useEffect(() => {
    const fetchGames = async () => {
      const snapshot = await getDocs(collection(db, "Games"));
      const gamesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGames(gamesData);
    };

    fetchGames();
  }, []);

  return (
    <View style={styles.container}>
      {/* MapView with Markers */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825, // Example coordinates
          longitude: -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {games.map((game) => (
          <Marker
            key={game.id}
            coordinate={game.coords}
            title={game.title}
            description={`Availability: ${game.availability}`}
            onPress={() => setSelectedGame(game)}
          />
        ))}
      </MapView>

      {/* Dynamic Game Card */}
      {selectedGame && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{selectedGame.title}</Text>
          <Text style={styles.cardSubtitle}>Location: {selectedGame.location}</Text>
          <Text style={styles.cardSubtitle}>
            Availability: {selectedGame.availability}
          </Text>
          <TouchableOpacity style={styles.cardButton}>
            <Text style={styles.cardButtonText}>Join Game</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  map: {
    flex: 1,
  },
  card: {
    backgroundColor: "#1e88e5",
    padding: 20,
    borderRadius: 10,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  cardTitle: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#e3f2fd",
    marginVertical: 5,
  },
  cardButton: {
    backgroundColor: "#fdd835",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  cardButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e88e5",
  },
});
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { checkLocationForFields } from "../services/geofencing"; // Import geofencing function

export default function MapScreen() {
  useEffect(() => {
    // Request location permissions and check geofence
    const startGeofencing = async () => {
      await checkLocationForFields();
    };

    startGeofencing();
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825, // Example coordinates
          longitude: -122.4324,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Add Marker components dynamically based on your fields */}
      </MapView>
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
});
