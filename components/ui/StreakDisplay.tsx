
import React, { useState, useCallback } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

const styles = StyleSheet.create({
  streakContainer: {
    alignItems: "center",
    right: "5%",
    bottom: "10%",
  },
  streakIcon: {
    width: 40,
    height: 40,
  },
  streakNumber: {
    fontSize: 12,
    color: "#060302",
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
});

export const StreakDisplay = () => {
  const [streak, setStreak] = useState(0);
  const [isStreakActive, setIsStreakActive] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const carregarStreak = async () => {
        try {
          const streakValue = await AsyncStorage.getItem('userStreak');
          const lastDateStr = await AsyncStorage.getItem('lastStreakDate');
          const currentStreak = streakValue ? parseInt(streakValue, 10) : 0;

          const today = new Date();
          const todayStr = today.toISOString().slice(0, 10);

          setStreak(currentStreak);
          setIsStreakActive(lastDateStr === todayStr && currentStreak > 0);

        } catch (error) {
          console.error("Erro ao carregar dados do streak", error);
          setStreak(0);
          setIsStreakActive(false);
        }
      };

      carregarStreak();
    }, [])
  );

  return (
    <View style={styles.streakContainer}>
      <Image
        source={
          isStreakActive
            ? require('@/assets/images/foguin--ativado-.png')
            : require('@/assets/images/foguin--desativado-.png')
        }
        style={styles.streakIcon}
      />
      <Text style={styles.streakNumber}>{streak}</Text>
    </View>
  );
};