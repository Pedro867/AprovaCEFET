import React from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/Colors';

interface CategoryTabsProps {
  categories: { id: string; nome: string, icone: any }[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export function CategoriaTab({ categories, selectedCategory, onSelectCategory }: CategoryTabsProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
      {categories.map((category) => {
        // 3. Pega o componente do ícone a partir das props
        const IconeComponente = category.icone;

        return (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.tab,
              selectedCategory === category.id && styles.selectedTab,
            ]}
            onPress={() => onSelectCategory(category.id)}
          >
            <View style={styles.tabContent}>
              {IconeComponente && <IconeComponente width={24} height={24} />}
              <Text style={[
                styles.tabText,
                selectedCategory === category.id && styles.selectedTabText,
              ]}>
                {category.nome}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: 50,
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
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.small,
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