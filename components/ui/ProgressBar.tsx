import React from 'react';
import {View, StyleSheet} from 'react-native';

interface ProgressBarProps {
  progress: number; // 0 to 100
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  style?: any;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 6,
  backgroundColor = '#E5E5E5',
  progressColor = '#6B91E2',
  style,
}) => {
  return (
    <View style={[styles.container, {height, backgroundColor}, style]}>
      <View
        style={[
          styles.progress,
          {
            width: `${Math.min(Math.max(progress, 0), 100)}%`,
            height,
            backgroundColor: progressColor,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 22,
    overflow: 'hidden',
  },
  progress: {
    borderRadius: 22,
  },
});