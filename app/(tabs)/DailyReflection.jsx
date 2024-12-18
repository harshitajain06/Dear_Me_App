// src/navigation/DailyReflection.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth, db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const DailyReflection = ({ navigation }) => {
  const [user, loading, error] = useAuthState(auth);
  const [reflection, setReflection] = useState('');

  const addReflection = async () => {
    if (!reflection.trim()) {
      Alert.alert('Validation Error', 'Please enter your reflection.');
      return;
    }

    try {
      await addDoc(collection(db, 'reflections'), {
        userId: user.uid,
        reflection: reflection.trim(),
        createdAt: new Date(),
      });
      Alert.alert('Success', 'Reflection added successfully.');
      setReflection('');
    } catch (err) {
      console.error('Error adding reflection: ', err);
      Alert.alert('Error', 'Failed to add reflection.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Reflection</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your daily reflection"
        value={reflection}
        onChangeText={setReflection}
      />
      <TouchableOpacity onPress={addReflection} style={styles.button}>
        <Text style={styles.buttonText}>Add Reflection</Text>
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

export default DailyReflection;
