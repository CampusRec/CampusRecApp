import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function WaitlistPage({ route, navigation }) {
  const { gameId, gameTitle } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Waitlist</Text>
      <Text style={styles.subtitle}>Game: {gameTitle}</Text>
      <Text style={styles.description}>
        You’re about to join the waitlist for the next available spot in {gameTitle}.
      </Text>
      <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.goBack()}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fdd835',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#f5f5f5',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#bdbdbd',
    textAlign: 'center',
    marginBottom: 30,
  },
  confirmButton: {
    backgroundColor: '#fdd835',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#121212',
  },
});
