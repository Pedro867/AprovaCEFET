import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { StyleSheet, View, Text, Alert, Image , TouchableOpacity, ScrollView,} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Personagem } from "@/components/ui/Personagem";
import { Colors, Fonts, Spacing } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { LOJA_CATEGORIAS, LOJA_ITENS } from "@/constants/LojaItems";
import { CategoriaTab } from "@/components/loja/categoriasTab";
import { GradeItems } from "@/components/loja/gradeItems";
import { LinearGradient } from "expo-linear-gradient";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"; 
import { updatePersonalizacoesBD } from "../api/conexaoFetch";

const CORES_ROSTO = [
  {id: 1, principal: "#F8B788", sombra: "#D1A37E"},
  {id: 2, principal: "#D9A481", sombra: "#B98460"},
  {id: 3, principal:  "#A67A5F", sombra: "#855F47"},
  {id: 4, principal: "#734E39", sombra: "#5A3C2A"},
  
  
];

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
    faceColor: CORES_ROSTO[0].principal, 
    faceShadowColor: CORES_ROSTO[0].sombra,
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
          {
            const parsed = JSON.parse(savedCustomizations);
            
            
            if(!parsed.faceColor){
              parsed.faceColor = CORES_ROSTO[0];
            }
            setCustomizacoes(parsed);
          }
            

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

  const handleColorSelect = async (corPrincipal: string) => {
    const corSelecionada = CORES_ROSTO.find(c => c.principal === corPrincipal);
    
    const newCustomizations = {
      ...customizacoes, 
      faceColor: corSelecionada.principal,
      faceShadowColor: corSelecionada.sombra,
    };

    setCustomizacoes(newCustomizations);

    await AsyncStorage.setItem(
      "userCharacter",
      JSON.stringify(newCustomizations)
    );

  };

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
                await updatePersonalizacoesBD(JSON.stringify(newCustomizations)) //SALVA NO BD
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
    
      <LinearGradient
        colors={[Colors.gradientEnd, Colors.gradientStart, Colors.gradientStart]}
        style={styles.container}
      >
        <View style={{ flex: 1, paddingBottom: tabBarHeight }}>
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
              faceColor={customizacoes.faceColor}
              faceShadowColor={customizacoes.faceShadowColor}
            />
            {/* PALETA DE CORES ROSTO*/}
            {selectedCategory === "face" && (
              <View style = {styles.paletaDeCoresContainer}>
                {CORES_ROSTO.map((cor) => (
                  <TouchableOpacity
                  key = {cor.id}
                  style = {[styles.corMostrada, {backgroundColor: cor.principal}, customizacoes.faceColor === cor.principal && styles.corSelecionada,]}
                  onPress={() => handleColorSelect(cor.principal)}
                  />
                ))}
              </View>
            )}
    
            <GradeItems
              items={LOJA_ITENS[selectedCategory as keyof typeof LOJA_ITENS]}
              selectedItemId={
                customizacoes[selectedCategory as keyof CustomizacoesType]
              }
              unlockedItemIds={unlockedItems}
              onSelectItem={ItemSelecionado}
              faceColor={customizacoes.faceColor}
              faceShadowColor={customizacoes.faceShadowColor}
              selectedCategory={selectedCategory}
            />
          </View>
       </View>
      </LinearGradient>
    
  );
}

const styles = StyleSheet.create({
  
  container: {
    paddingHorizontal: Spacing.medium,
    flex: 1,
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
    flex: 1,
    //height: 400, 
  },

  paletaDeCoresContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing.medium,
    gap: Spacing.large,
  },
  corMostrada: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "transparent",
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 2}
  },
  corSelecionada: {
    borderColor: Colors.white,
    transform: [{ scale: 1.1 }],
  },
});
