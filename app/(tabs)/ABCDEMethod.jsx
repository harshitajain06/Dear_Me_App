// src/navigation/ABCDEMethod.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth, db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const ABCDEMethod = ({ navigation }) => {
  const [user, loading, error] = useAuthState(auth);
  const [abcde, setAbcde] = useState({ a: '', b: '', c: '', d: '', e: '' });

  const handleInputChange = (field, value) => {
    setAbcde({ ...abcde, [field]: value });
  };

  const saveABCDE = async () => {
    const { a, b, c, d, e } = abcde;

    if (!a || !b || !c || !d || !e) {
      Alert.alert('Validation Error', 'Please fill out all fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'abcde'), {
        userId: user.uid,
        abcde: { a, b, c, d, e },
        createdAt: new Date(),
      });
      Alert.alert('Success', 'ABCDE method saved.');
      setAbcde({ a: '', b: '', c: '', d: '', e: '' });
    } catch (err) {
      console.error('Error saving ABCDE: ', err);
      Alert.alert('Error', 'Failed to save ABCDE.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ABCDE Method</Text>
      <TextInput
        style={styles.input}
        placeholder="A: Activating Event"
        value={abcde.a}
        onChangeText={(value) => handleInputChange('a', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="B: Beliefs"
        value={abcde.b}
        onChangeText={(value) => handleInputChange('b', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="C: Consequences"
        value={abcde.c}
        onChangeText={(value) => handleInputChange('c', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="D: Disputation"
        value={abcde.d}
        onChangeText={(value) => handleInputChange('d', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="E: New Effect"
        value={abcde.e}
        onChangeText={(value) => handleInputChange('e', value)}
      />
      <TouchableOpacity onPress={saveABCDE} style={styles.button}>
        <Text style={styles.buttonText}>Save ABCDE</Text>
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

export default ABCDEMethod;
