// src/screens/FilterScreen.js
import React, { useState } from "react";
import { View, Text, Picker, Button, StyleSheet, Alert } from "react-native";
import { fetchFieldsByUniversity, fetchFieldsBySport } from "../services/fieldsService";

export default function FilterScreen({ onApplyFilters }) {
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(false);

  const universities = ["Florida State University", "University of Florida"]; // Example list
  const fieldTypes = ["Soccer", "Basketball", "Tennis"]; // Example list

  const handleApplyFilters = async () => {
    setLoading(true);
    try {
      let filteredFields = [];
      if (selectedUniversity) {
        filteredFields = await fetchFieldsByUniversity(selectedUniversity);
      }
      if (selectedType) {
        const sportFilteredFields = await fetchFieldsBySport(selectedType);
        filteredFields = [...filteredFields, ...sportFilteredFields];
      }

      if (onApplyFilters) {
        onApplyFilters(filteredFields);
      }
    } catch (error) {
      console.error("Filter error:", error);
      Alert.alert("Error", "Failed to apply filters. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>University</Text>
      <Picker
        selectedValue={selectedUniversity}
        onValueChange={(value) => setSelectedUniversity(value)}
      >
        <Picker.Item label="All" value="" />
        {universities.map((uni) => (
          <Picker.Item key={uni} label={uni} value={uni} />
        ))}
      </Picker>

      <Text style={styles.label}>Field Type</Text>
      <Picker
        selectedValue={selectedType}
        onValueChange={(value) => setSelectedType(value)}
      >
        <Picker.Item label="All" value="" />
        {fieldTypes.map((type) => (
          <Picker.Item key={type} label={type} value={type} />
        ))}
      </Picker>

      <Button
        title={loading ? "Applying Filters..." : "Apply Filters"}
        onPress={handleApplyFilters}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#121212", flex: 1 },
  label: { marginTop: 10, fontSize: 16, fontWeight: "bold", color: "#fff" },
});
