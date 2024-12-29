// src/screens/AboutPage.jsx
import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';

export default function AboutPage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* <Image
          source={require('../../assets/logo.png')} // Replace with your logo
          style={styles.logo}
        /> */}
        <Text style={styles.heading}>About This App</Text>
        <Text style={styles.text}>
          Welcome to our app! This app is designed to help you improve your daily habits, manage your
          goals, and reflect on your personal growth journey. With features like habit tracking,
          gratitude journaling, video resources, and guided exercises, we aim to provide a holistic
          approach to self-improvement.
        </Text>

        <Text style={styles.subHeading}>Key Features</Text>
        <View style={styles.featureList}>
          <Text style={styles.featureItem}>
            🎯 Habit tracking to keep you on top of your goals
          </Text>
          <Text style={styles.featureItem}>
            🌟 Daily gratitude lists to focus on positivity
          </Text>
          <Text style={styles.featureItem}>
            📝 Free journaling and guided reflection exercises
          </Text>
          <Text style={styles.featureItem}>
            🎥 Expert videos to inspire and educate
          </Text>
          <Text style={styles.featureItem}>
            📅 A user-friendly calendar for better planning
          </Text>
        </View>

        <Text style={styles.subHeading}>Our Mission</Text>
        <Text style={styles.text}>
          We believe that small, consistent actions can lead to significant life changes. Our mission
          is to empower individuals by providing tools and resources to create positive habits and 
          foster personal growth.
        </Text>

        <Text style={styles.subHeading}>Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions, feedback, or suggestions, feel free to reach out to us at:{'\n'}
          <Text style={styles.email}>support@yourapp.com</Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE9FE', // Updated background color
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#567396', // Updated text color
    marginTop: 50,
  },
  subHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#567396', // Updated text color
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 10,
    color: '#567396', // Updated text color
  },
  featureList: {
    alignItems: 'flex-start',
    marginLeft: 20,
    marginBottom: 10,
  },
  featureItem: {
    fontSize: 16,
    lineHeight: 24,
    color: '#567396', // Updated text color
  },
  email: {
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#567396', // Updated text color
  },
});
