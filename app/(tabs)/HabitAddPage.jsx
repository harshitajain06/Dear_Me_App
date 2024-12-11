// src/navigation/StackLayout.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
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
  const [smiley, setSmiley] = useState('🙂'); // Default smiley
  const [isModalVisible, setIsModalVisible] = useState(false);

  const smileys = ['🙂', '😌', '😅', '😔', '😎', '😂', '😍', '🤔', '😴', '🤩'];

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
        smiley,
        createdAt: new Date(),
      });
      Alert.alert('Success', 'Habit and smiley added successfully.');
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
      <Text style={styles.label}>Selected Smiley: {smiley}</Text>
      <TouchableOpacity
        style={styles.selectSmileyButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.selectSmileyButtonText}>Choose Smiley</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={addHabit} style={styles.button}>
        <Text style={styles.buttonText}>Add Habit</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Smiley</Text>
            <FlatList
              data={smileys}
              keyExtractor={(item, index) => index.toString()}
              numColumns={5}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.smileyButton}
                  onPress={() => {
                    setSmiley(item);
                    setIsModalVisible(false);
                  }}
                >
                  <Text style={styles.smileyText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
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
  selectSmileyButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  selectSmileyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  smileyButton: {
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },
  smileyText: {
    fontSize: 24,
  },
});

export default HabitAddPage;