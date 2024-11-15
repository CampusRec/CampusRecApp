import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function AppPrototype({ navigation }) {
  const [games, setGames] = useState([
    { id: 1, title: "Soccer Scrimmage", location: "Central Park Field", spotsLeft: 3, waitlist: 0 },
    { id: 2, title: "Basketball Pickup", location: "West Court", spotsLeft: 1, waitlist: 2 },
    { id: 3, title: "Frisbee Match", location: "East Lawn", spotsLeft: 0, waitlist: 5 },
  ]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Landing Section */}
      <View style={styles.landingSection}>
        <Image
          source={require('./assets/istockphoto-2156461526-1024x1024.jpg')}
          style={styles.landingImage}
        />
        <Text style={styles.headerTitle}>Welcome to CampusRec</Text>
        <Text style={styles.headerSubtitle}>
          Where students meet, play, and create unforgettable memories.
        </Text>
        {/* Find Games Button */}
        <TouchableOpacity style={styles.findGamesButton}>
          <Text style={styles.findGamesButtonText}>Find Games Now</Text>
        </TouchableOpacity>
        {/* Edit Profile Button */}
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('ProfilePage')}
        >
          <Text style={styles.profileButtonText}>Edit Your Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Available Games Section */}
      <View style={styles.gamesSection}>
        <Image
          source={require('./assets/football-5180297_1280.jpg')}
          style={styles.gamesBannerImage}
        />
        <Text style={styles.sectionTitle}>🎮 Available Games</Text>
        <View style={styles.gamesList}>
          {games.map((game) => (
            <View
              key={game.id}
              style={[
                styles.gameCard,
                game.spotsLeft > 2 ? styles.greenBackground
                  : game.spotsLeft > 0 ? styles.yellowBackground
                  : styles.orangeBackground,
              ]}
            >
              <Text style={styles.gameTitle}>{game.title}</Text>
              <Text style={styles.gameDetails}>Location: {game.location}</Text>
              <Text style={styles.gameDetails}>
                Availability: {game.spotsLeft > 0 ? `${game.spotsLeft} spots left` : "Fully booked"}
              </Text>
              {game.spotsLeft === 0 && (
                <TouchableOpacity
                  style={styles.upNextButton}
                  onPress={() =>
                    navigation.navigate('WaitlistPage', { gameId: game.id, gameTitle: game.title })
                  }
                >
                  <Text style={styles.upNextButtonText}>Up Next</Text>
                </TouchableOpacity>
              )}
              {game.spotsLeft === 0 && (
                <Text style={styles.waitlistCounter}>Waitlist: {game.waitlist}</Text>
              )}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
  },
  landingSection: {
    backgroundColor: '#1f1f1f',
    paddingVertical: 40,
    alignItems: 'center',
  },
  landingImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 34,
    color: '#f5f5f5',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#bdbdbd',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  findGamesButton: {
    backgroundColor: '#fdd835',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 3,
    marginBottom: 10,
  },
  findGamesButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f1f1f',
  },
  profileButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 3,
  },
  profileButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  gamesSection: {
    backgroundColor: '#333333',
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  gamesBannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 10,
  },
  gamesList: {
    width: '100%',
    marginTop: 20,
  },
  gameCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  greenBackground: {
    backgroundColor: '#2e7d32',
  },
  yellowBackground: {
    backgroundColor: '#fdd835',
  },
  orangeBackground: {
    backgroundColor: '#ef6c00',
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  gameDetails: {
    fontSize: 14,
    color: '#f5f5f5',
  },
  upNextButton: {
    marginTop: 10,
    backgroundColor: '#121212',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  upNextButtonText: {
    fontSize: 14,
    color: '#fdd835',
    fontWeight: 'bold',
  },
  waitlistCounter: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 5,
  },
});
