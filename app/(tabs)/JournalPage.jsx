// src/navigation/JournalPage.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../constants/Colors';

const JournalPage = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Journaling</Text>

      <View style={styles.buttonContainer}>
        {/* First Row of Buttons */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('GratitudeList')}
          >
            <Text style={styles.buttonText}>Gratitude List</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('TodaysGoals')}
          >
            <Text style={styles.buttonText}>Today's Goals</Text>
          </TouchableOpacity>
        </View>

        {/* Second Row of Buttons */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('DailyReflection')}
          >
            <Text style={styles.buttonText}>Daily Reflection</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('FreeJournaling')}
          >
            <Text style={styles.buttonText}>Free Journaling</Text>
          </TouchableOpacity>
        </View>

        {/* Third Row of Buttons */}
        <View style={styles.lastRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ABCDEMethod')}
          >
            <Text style={styles.buttonText}>ABCDE Method</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#DCE9FE', // Light green background
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#567396',
    marginTop: 50,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
    width: '100%',  // Adjust width as needed to control the button alignment
  },
  lastRow: {
    flexDirection: 'row',
    justifyContent: 'center', // Centers the last button
    marginBottom: 20,
    width: '80%', // Adjust width as needed to control button alignment
  },
  button: {
    width: 130,
    height: 130,
    borderRadius: 75,
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10, // Space between buttons
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
});

export default JournalPage;
