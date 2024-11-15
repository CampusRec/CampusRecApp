import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GamesScreen() {
  const games = [
    { id: 1, title: 'Soccer Match', location: 'Central Park Field', time: '3:00 PM' },
    { id: 2, title: 'Basketball Pickup', location: 'West Court', time: '5:00 PM' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Games</Text>
      {games.map((game) => (
        <View key={game.id} style={styles.gameCard}>
          <Text style={styles.gameTitle}>{game.title}</Text>
          <Text style={styles.gameDetails}>{game.location}</Text>
          <Text style={styles.gameDetails}>{game.time}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fdd835',
    marginBottom: 20,
  },
  gameCard: {
    backgroundColor: '#1e88e5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  gameTitle: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  gameDetails: {
    fontSize: 14,
    color: '#e3f2fd',
  },
});
