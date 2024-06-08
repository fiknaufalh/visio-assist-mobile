import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function Alert() {
  return (
    <View style={styles.container}>
      <View style={styles.alertContainer}>
        <Image
          source={{ uri: 'https://img.icons8.com/color/48/000000/error--v1.png' }}
          style={styles.icon}
        />
        <Text style={styles.alertText}>ALERT!!!</Text>
        <View style={styles.line} />
        <Text style={styles.alertMessage}>Ada bahaya 0.5 meter ke depan</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  alertContainer: {
    width: '80%',
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  alertText: {
    fontSize: 24,
    color: '#FFCC00',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: '#FFCC00',
    marginVertical: 5,
  },
  alertMessage: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});
