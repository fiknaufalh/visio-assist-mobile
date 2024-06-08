import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Vibration } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';

export default function Home() {
  const [isOn, setIsOn] = useState(false);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    let interval;
    if (isOn) {
      interval = setInterval(fetchDistance, 5000); // Fetch distance every 5 seconds when ON
    } else {
      clearInterval(interval);
      setDistance(null);
    }
    return () => clearInterval(interval);
  }, [isOn]);

  const fetchDistance = async () => {
    try {
      const response = await fetch('https://api.thingspeak.com/channels/2572518/fields/1.json?results=1');
      const data = await response.json();
      const latestEntry = data.feeds[data.feeds.length - 1];
      const latestDistance = parseFloat(latestEntry.field1);
      setDistance(latestDistance);
      if (latestDistance < 50) {
        showAlert();
      }
    } catch (error) {
      console.error('Error fetching distance:', error);
    }
  };

  const showAlert = () => {
    Alert.alert('Awas!', 'Ada bahaya 0.5 meter di depan!', [{ text: 'OK' }]);
    Vibration.vibrate();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error); // Haptic feedback
  };

  const toggleSwitch = () => setIsOn(prevState => !prevState);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>VisioAssist</Text>
      <View style={styles.circleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, isOn && styles.toggleButtonOn]}
          onPress={toggleSwitch}
          activeOpacity={0.8}
        >
          <Text style={styles.circleText}>Klik untuk menyalakan</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.status}>Status: <Text style={isOn ? styles.on : styles.off}>{isOn ? 'ON' : 'OFF'}</Text></Text>
      {distance !== null && <Text style={styles.distance}>Distance: {distance} cm</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F3F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  circleContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  toggleButton: {
    width: 250,
    height: 250,
    borderRadius: 150,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButtonOn: {
    backgroundColor: '#004B09',
    borderWidth: 2,
    borderColor: '#4AFF87',
  },
  circleText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  status: {
    color: 'white',
    fontSize: 24,
  },
  on: {
    color: '#4AFF87',
    fontWeight: 'bold',
  },
  off: {
    color: '#7F0000',
    fontWeight: 'bold',
  },
  distance: {
    color: 'white',
    fontSize: 20,
    marginTop: 20,
  },
});
