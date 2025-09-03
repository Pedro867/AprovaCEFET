import React from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { Spacing } from '@/constants/Colors';

interface ItemGridProps {
  items: { id: string; thumbnail: any }[];
  selectedItemId: string;
  onSelectItem: (itemId: string) => void;
}

export function GradeItems({ items, selectedItemId, onSelectItem }: ItemGridProps) {
  const renderItem = ({ item }: { item: { id: string, thumbnail: any } }) => {
    const isSelected = selectedItemId === item.id;
    const ThumbnailComponent = item.thumbnail;

    return (
      <TouchableOpacity
        style={[styles.itemContainer, isSelected && styles.selectedItemContainer]}
        onPress={() => onSelectItem(item.id)}
      >
        <ThumbnailComponent width="80%" height="80%" />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={3}
      contentContainerStyle={styles.grid}
    />
  );
}

const styles = StyleSheet.create({
  grid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    width: 80,
    height: 80,
    margin: Spacing.small,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItemContainer: {
    borderWidth: 2,
    borderColor: '#fff',
    borderStyle: 'dotted',
  },
});