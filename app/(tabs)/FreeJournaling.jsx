import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, Modal } from 'react-native';
import { auth, db } from '../../config/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

const FreeJournaling = () => {
  const [user, loading, error] = useAuthState(auth);
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch journal entries from Firebase
  const fetchEntries = async () => {
    if (user) {
      try {
        const querySnapshot = await getDocs(collection(db, 'journals'));
        const userEntries = querySnapshot.docs
          .filter(doc => doc.data().userId === user.uid)
          .map(doc => ({ id: doc.id, ...doc.data() }));
        setEntries(userEntries);
      } catch (err) {
        console.error('Error fetching entries: ', err);
        Alert.alert('Error', 'Failed to load entries.');
      }
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [user]);

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
      fetchEntries(); // Refresh the list
    } catch (err) {
      console.error('Error adding entry: ', err);
      Alert.alert('Error', 'Failed to add entry.');
    }
  };

  const deleteEntry = async (id) => {
    try {
      await deleteDoc(doc(db, 'journals', id));
      Alert.alert('Success', 'Journal entry deleted.');
      fetchEntries(); // Refresh the list
    } catch (err) {
      console.error('Error deleting entry: ', err);
      Alert.alert('Error', 'Failed to delete entry.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Free Journaling</Text>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Ionicons name="list-outline" size={30} color="#007BFF" style={styles.icon} />
        </TouchableOpacity>
      </View>

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

      {/* Modal for All Journal Entries */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>All Journal Entries</Text>
            <FlatList
              data={entries}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.modalItem}>
                  <Text style={styles.modalItemText}>{item.entry}</Text>
                  <TouchableOpacity onPress={() => deleteEntry(item.id)}>
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
    marginBottom: 20,
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
    flex: 1,
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

export default FreeJournaling;
