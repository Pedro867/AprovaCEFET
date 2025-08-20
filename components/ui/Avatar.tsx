import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

interface AvatarProps {
  source: any;
  size?: number;
  style?: any;
}

export const Avatar: React.FC<AvatarProps> = ({source, size = 36, style}) => {
  return (
    <View style={[styles.container, {width: size, height: size}, style]}>
      <Image source={source} style={[styles.image, {width: size, height: size}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 50,
  },
});