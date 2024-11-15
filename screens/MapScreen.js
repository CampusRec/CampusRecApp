import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    { id: 1, title: 'Soccer Match', coords: { latitude: 37.78825, longitude: -122.4324 }, availability: 'Open' },
    { id: 2, title: 'Basketball Pickup', coords: { latitude: 37.78815, longitude: -122.4314 }, availability: 'Waitlist' },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
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
      {selectedGame && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{selectedGame.title}</Text>
          <Text style={styles.cardSubtitle}>Availability: {selectedGame.availability}</Text>
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
    backgroundColor: '#121212',
  },
  map: {
    flex: 1,
  },
  card: {
    backgroundColor: '#1e88e5',
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  cardTitle: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#e3f2fd',
    marginVertical: 5,
  },
  cardButton: {
    backgroundColor: '#fdd835',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  cardButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e88e5',
  },
});
