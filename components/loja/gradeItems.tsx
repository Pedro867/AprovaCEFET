import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Text } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Colors, Fonts, Spacing } from '@/constants/Colors';

interface ItemGridProps {
  items: { id: string; thumbnail: any; preco: number }[];
  selectedItemId: string;
  unlockedItemIds: string[]; //lista de itens desbloqueados
  onSelectItem: (itemId: string,itemPrice: number) => void;
  faceColor?:string;
  faceShadowColor?: string;
  selectedCategory:string,
}

export function GradeItems({ items, selectedItemId, unlockedItemIds, onSelectItem, faceColor, selectedCategory }: ItemGridProps) {
  return (
    <ScrollView contentContainerStyle={styles.grid}>
      {items.map((item) => {
        const isSelected = selectedItemId === item.id;
        const isUnlocked = unlockedItemIds.includes(item.id) || item.preco === 0;
        const ThumbnailComponent = item.thumbnail;

        return (
          <TouchableOpacity
            key={item.id} 
            style={[styles.itemContainer, isSelected && styles.selectedItemContainer,!isUnlocked && styles.itemBloqueado,]}
            onPress={() => onSelectItem(item.id, item.preco)}
          >
            <ThumbnailComponent width="80%" height="80%" fill={selectedCategory === 'face' || 'ears'? faceColor : undefined}/>
            {!isUnlocked && (
              // mostra o preço e o ícone de cadeado se estiver bloqueado
              <View style={styles.bloqueado}>
                <Feather name="lock" size={24} color="white" />
                <Text style={styles.precoTxt}>{item.preco}</Text>
              </View>
            )}
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
  itemBloqueado: {
    opacity: 0.7, 
  },

  bloqueado: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  precoTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});