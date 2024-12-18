// src/navigation/DailyReflection.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, Modal } from 'react-native';
import { auth, db } from '../../config/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Ionicons } from '@expo/vector-icons';

const DailyReflection = ({ navigation }) => {
  const [user, loading, error] = useAuthState(auth);
  const [reflection, setReflection] = useState('');
  const [reflections, setReflections] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch reflections from Firebase
  const fetchReflections = async () => {
    if (user) {
      try {
        const querySnapshot = await getDocs(collection(db, 'reflections'));
        const userReflections = querySnapshot.docs
          .filter(doc => doc.data().userId === user.uid)
          .map(doc => ({ id: doc.id, ...doc.data() }));
        setReflections(userReflections);
      } catch (err) {
        console.error('Error fetching reflections: ', err);
        Alert.alert('Error', 'Failed to load reflections.');
      }
    }
  };

  useEffect(() => {
    fetchReflections();
  }, [user]);

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
      fetchReflections(); // Refresh the list
    } catch (err) {
      console.error('Error adding reflection: ', err);
      Alert.alert('Error', 'Failed to add reflection.');
    }
  };

  const deleteReflection = async (id) => {
    try {
      await deleteDoc(doc(db, 'reflections', id));
      Alert.alert('Success', 'Reflection deleted successfully.');
      fetchReflections(); // Refresh the list
    } catch (err) {
      console.error('Error deleting reflection: ', err);
      Alert.alert('Error', 'Failed to delete reflection.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Daily Reflection</Text>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Ionicons name="list-outline" size={30} color="#007BFF" style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Enter your daily reflection"
        value={reflection}
        onChangeText={setReflection}
      />

      {/* Add Reflection Button */}
      <TouchableOpacity onPress={addReflection} style={styles.button}>
        <Text style={styles.buttonText}>Add Reflection</Text>
      </TouchableOpacity>

      {/* Modal for All Reflections */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>All Reflections</Text>
            <FlatList
              data={reflections}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.modalItem}>
                  <Text style={styles.modalItemText}>{item.reflection}</Text>
                  <TouchableOpacity onPress={() => deleteReflection(item.id)}>
                    <Ionicons name="trash" size={24} color="#FF5733" />
                  </TouchableOpacity>
                </View>
              )}
            />
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
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
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 28,
    color: '#567396',
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 'auto',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#007BFF',
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#E1E8F0',
    width: '100%',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
    flex: 1, // Ensures text takes available space
  },
  closeModalButton: {
    marginTop: 20,
    backgroundColor: '#FF5733',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  closeModalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DailyReflection;
