// src/tabs/HabitAddPage.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { auth, db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const HabitAddPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { date } = route.params || {};
  const [user, loading, error] = useAuthState(auth);
  const [habit, setHabit] = useState('');

  const addHabit = async () => {
    if (!habit.trim()) {
      Alert.alert('Validation Error', 'Please enter a habit.');
      return;
    }

    try {
      await addDoc(collection(db, 'habits'), {
        userId: user.uid,
        habit: habit.trim(),
        date: date || new Date().toISOString().split('T')[0],
        createdAt: new Date(),
      });
      Alert.alert('Success', 'Habit added successfully.');
      navigation.goBack();
    } catch (err) {
      console.error('Error adding habit: ', err);
      Alert.alert('Error', 'Failed to add habit.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Habit</Text>
      <Text style={styles.label}>Date: {date || 'Today'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your habit"
        value={habit}
        onChangeText={setHabit}
      />
      <TouchableOpacity onPress={addHabit} style={styles.button}>
        <Text style={styles.buttonText}>Add Habit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#DCE9FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#567396',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
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

export default HabitAddPage;
