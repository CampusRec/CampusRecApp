import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

export default function TeamsScreen() {
  const [teams, setTeams] = useState([
    { id: '1', name: 'Soccer Warriors', members: 8 },
    { id: '2', name: 'Basketball Kings', members: 5 },
    { id: '3', name: 'Frisbee Flyers', members: 6 },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Teams</Text>
      <FlatList
        data={teams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.teamCard}>
            <Text style={styles.teamName}>{item.name}</Text>
            <Text style={styles.teamMembers}>{item.members} members</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Manage</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
  teamCard: {
    backgroundColor: '#1e88e5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  teamMembers: {
    fontSize: 14,
    color: '#e3f2fd',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#fdd835',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#121212',
  },
});
