import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList,TouchableOpacity, ScrollView, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Personagem } from '@/components/ui/Personagem';
import { Colors, Fonts, Spacing } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { LOJA_CATEGORIAS, LOJA_ITENS } from '@/constants/LojaItems';
import { CategoriaTab } from '@/components/loja/categoriasTab';
import { GradeItems } from '@/components/loja/gradeItems';
import { LinearGradient } from "expo-linear-gradient";

type CustomizacoesType = React.ComponentProps<typeof Personagem>['customizations'];

export default function LojaScreen() {
  const [cefetCoins, setCefetCoins] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(LOJA_CATEGORIAS[0].id);
  
  const [customizacoes, setCustomizacoes] = useState<CustomizacoesType>({
    background: 'cor1', 
    ears: 'orelha1',
    cheeks: 'bochecha1',
    face: 'rosto1',
    eyes: 'olhos1',
    mouth: 'boca1',
    bangs: 'franja1',
    hair: 'cabelo1',
    nose: 'nariz1',
  });

  useEffect(() => {
    const loadUserData = async () => { //funcao que mantem as alterações do personagem (local) e carrega os cefetCoins
      const savedCustomizations = await AsyncStorage.getItem('userCharacter');
      if (savedCustomizations) setCustomizacoes(JSON.parse(savedCustomizations));
      
      const savedCoins = await AsyncStorage.getItem('userPontuacao');
      if (savedCoins) setCefetCoins(parseInt(savedCoins, 10));
    };
    loadUserData();
  }, []);

  const handleItemSelect = async (itemId: string) => {
    // a chave da categoria é o que ta em selectedCategory (ex: 'rosto')
    const newCustomizations = { ...customizacoes, [selectedCategory]: itemId };
    setCustomizacoes(newCustomizations);
    await AsyncStorage.setItem('userCharacter', JSON.stringify(newCustomizations));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={[Colors.gradientEnd, Colors.gradientStart]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText style={styles.title}>Loja de Recompensas</ThemedText>

        <View style={styles.coinContainer}><Text style={styles.coinText}>{cefetCoins}</Text></View>

        <View style={styles.personagemContainer}>
          <Personagem size={200} customizations={customizacoes} />
        </View>

        <View style={styles.customizationContainer}>
          <CategoriaTab
            categories={LOJA_CATEGORIAS}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <GradeItems
            items={LOJA_ITENS[selectedCategory as keyof typeof LOJA_ITENS]}
            selectedItemId={customizacoes[selectedCategory as keyof CustomizacoesType]}
            onSelectItem={handleItemSelect}
          />
        </View>
        
      </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    //backgroundColor: 'white',
  },
  container: {
    padding: Spacing.medium,
  },
  title: {
    fontSize: Fonts.size.small,
    fontWeight: "bold",
    textAlign: 'center',
    marginBottom: Spacing.medium,
  },
  coinContainer: {
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.large,
    alignSelf: 'center',
    marginBottom: Spacing.medium,
  },
  coinText: {
    fontSize: Fonts.size.large,
    fontWeight: "bold",
  },
  personagemContainer: {
    alignItems: 'center',
    marginBottom: Spacing.large,
    marginTop: Spacing.large,
  },
  customizationContainer: {
    marginTop: 80,
    padding: Spacing.xsmall,
    height: 450, // altura fixa para o container da grade
  },
});