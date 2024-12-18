// src/navigation/GratitudeList.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { auth, db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const GratitudeList = ({ navigation }) => {
  const [user, loading, error] = useAuthState(auth);
  const [gratitude, setGratitude] = useState('');
  const [gratitudes, setGratitudes] = useState([]);

  const addGratitude = async () => {
    if (!gratitude.trim()) {
      Alert.alert('Validation Error', 'Please enter your gratitude.');
      return;
    }

    try {
      await addDoc(collection(db, 'gratitude'), {
        userId: user.uid,
        gratitude: gratitude.trim(),
        createdAt: new Date(),
      });
      setGratitudes((prev) => [...prev, gratitude]);
      setGratitude('');
    } catch (err) {
      console.error('Error adding gratitude: ', err);
      Alert.alert('Error', 'Failed to add gratitude.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gratitude List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter what you're grateful for"
        value={gratitude}
        onChangeText={setGratitude}
      />
      <TouchableOpacity onPress={addGratitude} style={styles.button}>
        <Text style={styles.buttonText}>Add Gratitude</Text>
      </TouchableOpacity>

      <FlatList
        data={gratitudes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.gratitudeItem}>
            <Text>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#DCE9FE',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#567396',
    marginBottom: 20,
    fontWeight: 'bold',
    marginTop: 50,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#567396',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gratitudeItem: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '100%',
  },
});

export default GratitudeList;
