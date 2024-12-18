// src/navigation/StackLayout.jsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import CalendarPage from './CalendarPage';
import VideosPage from './VideosPage'; // Updated import
import JournalPage from './JournalPage'; // Import the JournalPage component
import RegisterScreen from './index';
import LoginScreen from './Login';
import HabitAddPage from './HabitAddPage'; // Import the HabitAddPage
import GratitudeList from './GratitudeList'; // New GratitudeList Page
import TodaysGoals from './TodaysGoals'; // New TodaysGoals Page
import DailyReflection from './DailyReflection'; // New DailyReflection Page
import FreeJournaling from './FreeJournaling'; // New FreeJournaling Page
import ABCDEMethod from './ABCDEMethod'; // New ABCDEMethod Page
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons'; // If using Expo

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator Component
const BottomTabs = () => {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Videos') {
            iconName = focused ? 'videocam' : 'videocam-outline'; // Updated icon
          } else if (route.name === 'Journal') {
            iconName = focused ? 'book' : 'book-outline'; // Icon for Journal
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarPage} />
      <Tab.Screen
        name="Videos"
        component={VideosPage} // Updated component
        options={{ title: 'Videos' }}
      />
      <Tab.Screen
        name="Journal"
        component={JournalPage} // New Journal Tab
        options={{ title: 'Journal' }}
      />
    </Tab.Navigator>
  );
};

// Stack Navigator Component
export default function StackLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background },
      }}
    >
      {/* Authentication Screens */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />

      {/* Main App Tabs */}
      <Stack.Screen name="MainTabs" component={BottomTabs} />

      {/* Habit Add Page */}
      <Stack.Screen name="HabitAddPage" component={HabitAddPage} />

      {/* New Pages */}
      <Stack.Screen name="GratitudeList" component={GratitudeList} />
      <Stack.Screen name="TodaysGoals" component={TodaysGoals} />
      <Stack.Screen name="DailyReflection" component={DailyReflection} />
      <Stack.Screen name="FreeJournaling" component={FreeJournaling} />
      <Stack.Screen name="ABCDEMethod" component={ABCDEMethod} />
    </Stack.Navigator>
  );
}
