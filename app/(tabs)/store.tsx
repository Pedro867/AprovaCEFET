import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Alert, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Personagem } from "@/components/ui/Personagem";
import { Colors, Fonts, Spacing } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { LOJA_CATEGORIAS, LOJA_ITENS } from "@/constants/LojaItems";
import { CategoriaTab } from "@/components/loja/categoriasTab";
import { GradeItems } from "@/components/loja/gradeItems";
import { LinearGradient } from "expo-linear-gradient";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"; 

type CustomizacoesType = React.ComponentProps<
  typeof Personagem
>["customizations"];

export default function LojaScreen() {
  const [cefetCoins, setCefetCoins] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(
    LOJA_CATEGORIAS[0].id
  );
  const [customizacoes, setCustomizacoes] = useState<CustomizacoesType>({
    background: "background1",
    ears: "orelha1",
    cheeks: "bochecha1",
    face: "rosto1",
    eyes: "olhos1",
    mouth: "boca1",
    bangs: "franja1",
    hair: "cabelo1",
    nose: "nariz1",
  });
  const [unlockedItems, setUnlockedItems] = useState<string[]>([]); //itens bloqueados e desbloqueados

   const tabBarHeight = useBottomTabBarHeight();

  useFocusEffect(
    useCallback(() => {
      const loadUserData = async () => {
        try {
          const savedCustomizations = await AsyncStorage.getItem(
            "userCharacter"
          );
          if (savedCustomizations)
            setCustomizacoes(JSON.parse(savedCustomizations));

          const savedCoins = await AsyncStorage.getItem("userPontuacao");
          if (savedCoins) setCefetCoins(parseInt(savedCoins, 10));

          // Carrega a lista de itens desbloqueados
          const savedUnlockedItems = await AsyncStorage.getItem(
            "unlockedItems"
          );
          if (savedUnlockedItems)
            setUnlockedItems(JSON.parse(savedUnlockedItems));
        } catch (error) {
          console.error("Erro ao carregar dados da loja", error);
        }
      };
      loadUserData();
    }, [])
  );

  const ItemSelecionado = async (itemId: string, itemPrice: number) => {
    const isUnlocked = unlockedItems.includes(itemId) || itemPrice === 0; //verifica se o item ja foi comprado

    if (isUnlocked) { //só equipa
      const newCustomizations = {
        ...customizacoes,
        [selectedCategory]: itemId,
      };
      setCustomizacoes(newCustomizations);
      await AsyncStorage.setItem(
        "userCharacter",
        JSON.stringify(newCustomizations)
      );
    } else {
      if (cefetCoins >= itemPrice) { //verifica se o usuario tem moedas suficientes

        Alert.alert( "Confirmar Compra", `Você deseja comprar este item por ${itemPrice} CefetCoins?`,
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Comprar",
              onPress: async () => {
                
                const newBalance = cefetCoins - itemPrice;
                const newUnlockedItems = [...unlockedItems, itemId];

                // atualiza os estados
                setCefetCoins(newBalance);
                setUnlockedItems(newUnlockedItems);

                // salva no AsyncStorage
                await AsyncStorage.setItem(
                  "userPontuacao",
                  newBalance.toString()
                );
                await AsyncStorage.setItem("unlockedItems", JSON.stringify(newUnlockedItems)
                );

                // equipa o item comprado
                const newCustomizations = {
                  ...customizacoes,
                  [selectedCategory]: itemId,
                };
                setCustomizacoes(newCustomizations);
                await AsyncStorage.setItem("userCharacter",JSON.stringify(newCustomizations)
                );
              },
            },
          ]
        );
      } else {
        Alert.alert("Saldo Insuficiente", "Você não tem CefetCoins para comprar este item.");
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[Colors.gradientEnd, Colors.gradientStart, Colors.gradientStart]}
        style={styles.safeArea}
      >
        <View contentContainerStyle={[styles.container , {paddingBottom: tabBarHeight + Spacing.medium},]}>
          <View style={styles.headerContainer}>
            <View style={styles.coinContainer}>
              <Image
                source={require("@/assets/images/pontos.png")}
                style={styles.coinIcon}
              />
              <Text style={styles.coinText}>{cefetCoins}</Text>
            </View>
            <ThemedText style={styles.title}>Loja de Personagem</ThemedText>
          </View>

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
              selectedItemId={
                customizacoes[selectedCategory as keyof CustomizacoesType]
              }
              unlockedItemIds={unlockedItems}
              onSelectItem={ItemSelecionado}
            />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: Spacing.medium,
  },
  headerContainer: {
    paddingTop: Spacing.large,
    flexDirection: "row",
    justifyContent: "center", 
    alignItems: "center",
    position: "relative",
    marginBottom: 75,
    marginTop:Spacing.giga,
    gap: Spacing.medium,
  },
  title: {
    fontSize: Fonts.size.xlarge,
    fontWeight: "bold",
    color: Colors.text,
    paddingBottom: Spacing.small,
  },
  coinContainer: {
    left: 0,
    top: 60,
    position: "absolute",
    flexDirection: "row", // alinha icone e texto
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 40, 
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.medium,
    gap: Spacing.xsmall,
    // sombra 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
   coinIcon: {
    width: 30,
    height: 30,
  },
  coinText: {
    fontSize: Fonts.size.medium,
    fontWeight: "bold",
  },
  personagemContainer: {
    alignItems: "center",
    marginVertical: Spacing.large,
  },
  customizationContainer: {
    marginTop: Spacing.giga,
    height: 400, // altura fixa para o container da grade
  },
});
