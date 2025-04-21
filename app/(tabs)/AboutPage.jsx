import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AboutPage() {
  return (
    <LinearGradient
      colors={['#4F2780', '#D3C5E5']}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.heading}>About Dear Me</Text>
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#fff',
    marginTop: 50,
  },
  subHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
  },
  featureList: {
    alignItems: 'flex-start',
    marginLeft: 20,
    marginBottom: 10,
  },
  featureItem: {
    fontSize: 16,
    lineHeight: 24,
    color: '#fff',
  },
  email: {
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
