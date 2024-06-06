import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Progress from 'react-native-progress';

export default function alert() {  
    return (
        <View style={styles.container}>
          <Text style={styles.title}>VisioAssist</Text>
          <View style={styles.alertContainer}>
            <Image 
              source={{ uri: 'https://img.icons8.com/color/48/000000/error--v1.png' }} 
              style={styles.icon} 
            />
            <Text style={styles.alertText}>ALERT!!!</Text>
            <View style={styles.line} />
            <Text style={styles.alertMessage}>Ada bahaya 1 meter ke depan</Text>
          </View>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#002855',
      },
      title: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 50,
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