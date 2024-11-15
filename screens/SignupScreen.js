// src/screens/SignupScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { signup } from "./services/authService"; // Updated import

export default function SignupScreen({ navigation }) {
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    const { displayName, email, password } = form;

    // Validate input
    if (!displayName || !email || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      await signup(email, password, displayName); // Call the updated signup function
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Error", error.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Account</Text>

      {/* Form Section */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#bdbdbd"
        value={form.displayName}
        onChangeText={(text) => setForm({ ...form, displayName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#bdbdbd"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#bdbdbd"
        value={form.password}
        onChangeText={(text) => setForm({ ...form, password: text })}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#1e88e5" />
      ) : (
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#121212", justifyContent: "center" },
  header: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  input: {
    backgroundColor: "#1e88e5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    color: "#fff",
  },
  signupButton: { backgroundColor: "#43a047", padding: 15, borderRadius: 10, alignItems: "center" },
  signupButtonText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
});
