import React from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/Colors';

interface CategoryTabsProps {
  categories: { id: string; nome: string, icone: any }[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  faceColor?: string;
  faceShadowColor?: string;
}

export function CategoriaTab({ categories, selectedCategory, onSelectCategory, faceColor, faceShadowColor }: CategoryTabsProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
      {categories.map((category) => {
        
        const IconeComponente = category.icone;
        const iconColor = category.id === 'face' || 'ears'? faceColor : '';
        const isFaceCategory = category.id === 'face';

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
              {IconeComponente && <IconeComponente width={24} height={24}  fill={iconColor} shadowFill={isFaceCategory ? faceShadowColor : iconColor}/>}
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