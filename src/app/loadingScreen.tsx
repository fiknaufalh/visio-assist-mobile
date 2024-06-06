import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Progress from 'react-native-progress';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '@/constants/theme';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/authContext';

export default function loadingScreen() {

  const router = useRouter()

  setTimeout(() => {
    router.replace("home")
  }, 5000);

    return (
      <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>VisioAssist</Text>
      <Image
        source={require('@/assets/walking-icon.png')}
        style={{ width: 100, height: 100, marginBottom: 80 }}
      />
      <View style={styles.progressContainer}>
        <Progress.Bar
          progress={0.3}
          width={200}
          color="#00FFFF"
          unfilledColor="#004444"
          borderColor="#004444"
          height={10}
          borderRadius={5}
        />
      </View>
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
      marginBottom: 80,
    },
    iconContainer: {
      marginBottom: 60,
    },
    icon: {
      width: 100,
      height: 100,
      tintColor: 'white',
    },
    progressContainer: {
      alignItems: 'center',
    },
  });