import React from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';

import { Colors, Fonts, Spacing } from '@/constants/Colors';

interface ItemGridProps {
  items: { id: string; thumbnail: any }[];
  selectedItemId: string;
  onSelectItem: (itemId: string) => void;
}

export function GradeItems({ items, selectedItemId, onSelectItem }: ItemGridProps) {
  return (
    <ScrollView contentContainerStyle={styles.grid}>
      {items.map((item) => {
        const isSelected = selectedItemId === item.id;
        const ThumbnailComponent = item.thumbnail;

        return (
          <TouchableOpacity
            key={item.id} 
            style={[styles.itemContainer, isSelected && styles.selectedItemContainer]}
            onPress={() => onSelectItem(item.id)}
          >
            <ThumbnailComponent width="80%" height="80%" />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  itemContainer: {
    width: 107,
    height: 107,
    margin: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  selectedItemContainer: {
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'dotted',
  },
});