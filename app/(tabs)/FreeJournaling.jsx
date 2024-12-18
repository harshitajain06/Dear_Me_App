// src/navigation/FreeJournaling.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth, db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const FreeJournaling = ({ navigation }) => {
  const [user, loading, error] = useAuthState(auth);
  const [entry, setEntry] = useState('');

  const addEntry = async () => {
    if (!entry.trim()) {
      Alert.alert('Validation Error', 'Please write something.');
      return;
    }

    try {
      await addDoc(collection(db, 'journals'), {
        userId: user.uid,
        entry: entry.trim(),
        createdAt: new Date(),
      });
      Alert.alert('Success', 'Journal entry added.');
      setEntry('');
    } catch (err) {
      console.error('Error adding entry: ', err);
      Alert.alert('Error', 'Failed to add entry.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Free Journaling</Text>
      <TextInput
        style={styles.input}
        placeholder="Write your journal entry"
        value={entry}
        onChangeText={setEntry}
        multiline
      />
      <TouchableOpacity onPress={addEntry} style={styles.button}>
        <Text style={styles.buttonText}>Add Entry</Text>
      </TouchableOpacity>
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
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#567396',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    height: 150,
    textAlignVertical: 'top',
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
});

export default FreeJournaling;
