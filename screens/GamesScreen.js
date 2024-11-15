// src/screens/GamesScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function GamesScreen() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newGame, setNewGame] = useState({
    sport: "",
    location: "",
    time: "",
    maxPlayers: "",
  });

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesCol = collection(db, "Games");
        const snapshot = await getDocs(gamesCol);
        const gamesList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGames(gamesList);
      } catch (error) {
        console.error("Error fetching games:", error);
        Alert.alert("Error", "Failed to load games.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const addGame = async () => {
    const { sport, location, time, maxPlayers } = newGame;

    // Basic validation
    if (!sport || !location || !time || !maxPlayers) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      const gamesCol = collection(db, "Games");
      await addDoc(gamesCol, {
        sport,
        location,
        time,
        maxPlayers: parseInt(maxPlayers, 10),
        createdAt: serverTimestamp(),
      });
      Alert.alert("Success", "Game added successfully.");
      setModalVisible(false);
      setNewGame({ sport: "", location: "", time: "", maxPlayers: "" });
    } catch (error) {
      console.error("Error adding game:", error);
      Alert.alert("Error", "Failed to add game.");
    }
  };

  const renderGame = ({ item }) => (
    <TouchableOpacity style={styles.gameCard}>
      <Text style={styles.gameTitle}>{item.sport}</Text>
      <Text style={styles.gameDetails}>Location: {item.location}</Text>
      <Text style={styles.gameDetails}>Time: {item.time}</Text>
      <Text style={styles.gameDetails}>Max Players: {item.maxPlayers}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Loading games...</Text>
      ) : (
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={renderGame}
          contentContainerStyle={styles.list}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Game</Text>
      </TouchableOpacity>

      {/* Add Game Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Game</Text>
            <TextInput
              style={styles.input}
              placeholder="Sport"
              value={newGame.sport}
              onChangeText={(text) => setNewGame({ ...newGame, sport: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={newGame.location}
              onChangeText={(text) => setNewGame({ ...newGame, location: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Time"
              value={newGame.time}
              onChangeText={(text) => setNewGame({ ...newGame, time: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Max Players"
              keyboardType="numeric"
              value={newGame.maxPlayers}
              onChangeText={(text) =>
                setNewGame({ ...newGame, maxPlayers: text })
              }
            />
            <Button title="Add Game" onPress={addGame} />
            <Button
              title="Cancel"
              color="red"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  list: { paddingBottom: 80 },
  loadingText: { color: "#fff", textAlign: "center", marginTop: 20 },
  gameCard: {
    backgroundColor: "#1e88e5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  gameTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  gameDetails: { fontSize: 14, color: "#bdbdbd" },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#43a047",
    padding: 15,
    borderRadius: 30,
    elevation: 5,
  },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "90%",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});
