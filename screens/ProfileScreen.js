import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function ProfilePage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('⚽'); // Default emoji

  const universitiesInFlorida = [
    'University of Florida',
    'Florida State University',
    'University of Miami',
    'University of Central Florida',
    'Florida International University',
  ];

  const sportsEmojis = ['⚽', '🏀', '🏐', '🎾', '🥏'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>

      {/* Profile Picture Selection */}
      <Text style={styles.label}>Select a Profile Emoji:</Text>
      <View style={styles.emojiContainer}>
        {sportsEmojis.map((emoji) => (
          <TouchableOpacity
            key={emoji}
            style={[
              styles.emojiButton,
              selectedEmoji === emoji && styles.selectedEmojiButton,
            ]}
            onPress={() => setSelectedEmoji(emoji)}
          >
            <Text style={styles.emoji}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Phone Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        placeholderTextColor="#bdbdbd"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      {/* University Dropdown */}
      <Text style={styles.label}>Select Your University:</Text>
      <View style={styles.dropdown}>
        <Text style={styles.selectedValue}>
          {selectedUniversity || 'Select a university'}
        </Text>
        <View style={styles.dropdownOptions}>
          {universitiesInFlorida.map((university) => (
            <TouchableOpacity
              key={university}
              style={styles.dropdownOption}
              onPress={() => setSelectedUniversity(university)}
            >
              <Text style={styles.optionText}>{university}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fdd835',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#bdbdbd',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  emojiButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#333',
    marginHorizontal: 5,
  },
  selectedEmojiButton: {
    backgroundColor: '#fdd835',
  },
  emoji: {
    fontSize: 28,
    color: '#fff',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 8,
    color: '#f5f5f5',
    marginBottom: 20,
  },
  dropdown: {
    width: '100%',
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  selectedValue: {
    padding: 10,
    color: '#f5f5f5',
  },
  dropdownOptions: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#555',
  },
  dropdownOption: {
    padding: 10,
    backgroundColor: '#333',
  },
  optionText: {
    color: '#f5f5f5',
  },
  saveButton: {
    backgroundColor: '#fdd835',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#121212',
  },
});