// src/tabs/HomeScreen.jsx
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { db, auth } from '../../config/firebase'; // Adjusted import path
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons'; // Ensure @expo/vector-icons is installed

const HomeScreen = () => {
  const navigation = useNavigation();
  const [user, loading, error] = useAuthState(auth);
  const [habits, setHabits] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [loadingHabits, setLoadingHabits] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [habitsForSelectedDate, setHabitsForSelectedDate] = useState([]);

  // Fetch habits when the screen is focused
  useFocusEffect(
    useCallback(() => {
      if (user) {
        fetchHabits();
      }
      // Cleanup if needed
      return () => {
        // Any cleanup actions
      };
    }, [user])
  );

  const fetchHabits = async () => {
    setLoadingHabits(true); // Start loading
    try {
      const q = query(
        collection(db, 'habits'),
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      const habitsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHabits(habitsData);
      markHabitDates(habitsData);
    } catch (err) {
      console.error('Error fetching habits: ', err);
      Alert.alert('Error', 'Failed to fetch habits.');
    } finally {
      setLoadingHabits(false); // Stop loading
    }
  };

  const markHabitDates = (habitsData) => {
    const dateCounts = {};

    // Count the number of habits per date
    habitsData.forEach(habit => {
      if (habit.date) {
        if (dateCounts[habit.date]) {
          dateCounts[habit.date] += 1;
        } else {
          dateCounts[habit.date] = 1;
        }
      }
    });

    // Assign dots based on the number of habits
    const marks = {};
    Object.keys(dateCounts).forEach(date => {
      const count = dateCounts[date];
      const dots = [];

      if (count >= 1) {
        dots.push({ color: '#ADD8E6' }); // Light Blue for 1 habit
      }
      if (count >= 2) {
        dots.push({ color: '#90EE90' }); // Light Green for 2 habits
      }
      if (count >= 3) {
        dots.push({ color: '#F08080' }); // Light Coral for 3 or more habits
      }

      marks[date] = {
        dots: dots,
      };
    });

    setMarkedDates(marks);
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    fetchHabitsForDate(day.dateString);
    setModalVisible(true);
  };

  const fetchHabitsForDate = async (date) => {
    try {
      const q = query(
        collection(db, 'habits'),
        where('userId', '==', user.uid),
        where('date', '==', date)
      );
      const querySnapshot = await getDocs(q);
      const habitsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHabitsForSelectedDate(habitsData);
    } catch (err) {
      console.error('Error fetching habits for date: ', err);
      Alert.alert('Error', 'Failed to fetch habits for the selected date.');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setHabitsForSelectedDate([]);
    setSelectedDate('');
  };

  const renderHabit = ({ item }) => (
    <View style={styles.habitItem}>
      <Text style={styles.habitText}>{item.habit}</Text>
    </View>
  );

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            signOut(auth)
              .then(() => {
                navigation.replace('Login');
              })
              .catch((err) => {
                console.error('Logout Error:', err);
                Alert.alert('Error', 'Failed to logout. Please try again.');
              });
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading || loadingHabits) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with Logout Button */}
      <View style={styles.header}>
        <Text style={styles.title}>Welcome</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton} accessibilityLabel="Logout">
          <Ionicons name="log-out-outline" size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>

      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            selected: true,
            selectedColor: '#007BFF',
            dots: markedDates[selectedDate]?.dots || [],
          },
          [new Date().toISOString().split('T')[0]]: {
            ...(markedDates[new Date().toISOString().split('T')[0]] || {}),
            today: true,
            selected: true,
            selectedColor: '#FFD700', // Gold color for today
            dots: markedDates[new Date().toISOString().split('T')[0]]?.dots || [],
          },
        }}
        markingType={'multi-dot'}
        style={styles.calendar}
        theme={{
          selectedDayBackgroundColor: '#007BFF',
          todayTextColor: '#FF6347',
          arrowColor: '#007BFF',
        }}
      />

      {/* Modal to Display Habits */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Habits for {selectedDate}
          </Text>
          {habitsForSelectedDate.length > 0 ? (
            <FlatList
              data={habitsForSelectedDate}
              keyExtractor={(item) => item.id}
              renderItem={renderHabit}
              contentContainerStyle={styles.habitList}
            />
          ) : (
            <Text style={styles.noHabitsText}>No habits for this date.</Text>
          )}
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: '#567396',
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 10,
  },
  calendar: {
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxHeight: '60%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    color: '#567396',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  habitList: {
    paddingBottom: 20,
  },
  habitItem: {
    padding: 15,
    backgroundColor: '#F0F8FF',
    borderRadius: 10,
    marginBottom: 10,
  },
  habitText: {
    fontSize: 18,
    color: '#333',
  },
  noHabitsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default HomeScreen;
