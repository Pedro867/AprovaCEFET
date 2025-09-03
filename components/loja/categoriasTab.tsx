import React from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/Colors';

interface CategoryTabsProps {
  categories: { id: string; nome: string }[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export function CategoriaTab({ categories, selectedCategory, onSelectCategory }: CategoryTabsProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
      {categories.map((category) => (
        //botao para cada categoria
        <TouchableOpacity
          key={category.id}
          style={[
            styles.tab,
            selectedCategory === category.id && styles.selectedTab,
          ]}
          onPress={() => onSelectCategory(category.id)}
        >
          <Text style={[
            styles.tabText,
            selectedCategory === category.id && styles.selectedTabText,
          ]}>
            {category.nome}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: 40,
    //marginBottom: Spacing.medium,
  },
  tab: {
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.xlarge,
    marginHorizontal: Spacing.small,
    borderRadius: 10,
    backgroundColor: '#a3a0a0ff',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  selectedTab: {
    backgroundColor: 'white',
  },
  tabText: {
    fontSize: Fonts.size.medium,
    color: Colors.primary,
  },
  selectedTabText: {
    color: Colors.primary,
    fontWeight: "bold",
  },
});