import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { ThemedText } from "@/components/ThemedText";
import { Avatar } from "@/components/ui/Avatar";
import { unidadesMatematica } from "@/constants/dadosUnidades"

export default function TelaUnidadesMatematica() {
  const router = useRouter();

  return (
    <LinearGradient
      style={styles.container}
      colors={[Colors.gradientEnd, Colors.gradientStart]}
    >
      <View style={styles.headerUser}>
        <Avatar
          source={require("@/assets/images/avatar.png")}
          size={36}
          style={styles.avatar}
        />
        <View style={styles.streakContainer}>
          <Image
            source={require("@/assets/images/foguin--ativado-.png")}
            style={styles.streakIcon}
          />
          <Text style={styles.streakNumber}>pegar a variavel dps</Text>
        </View>
      </View>
      <View style={styles.headerUnidade}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <IconSymbol name="arrow.left" size={32} color={Colors.light.text} />
        </TouchableOpacity>
        <View>
          <ThemedText style={styles.headerTitle}>UNIDADES</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Matemática</ThemedText>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Lista de Unidades */}
        <View style={styles.unitsListContainer}>
          {unidadesMatematica.map((unidade, index) => {
            //percorre o array de unidades
            const Icon = unidade.Icon;
            return (
              <TouchableOpacity
                key={index}
                style={styles.cardShadow}
                onPress={() => router.push(unidade.route as any)}
              >
                <LinearGradient
                  colors={["#89A1D4", "#89A1D4"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.cardGradient}
                >
                  <View style={styles.titleContainer}>
                    <ThemedText style={styles.cardTitle}>
                      {unidade.title}
                    </ThemedText>
                  </View>

                  <View style={styles.cardIconContainer}>
                    <Icon width={60} height={60} fill="#FFFFFF" />
                  </View>
                  <ThemedText style={styles.cardDescription}>
                    {unidade.description}
                  </ThemedText>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerUser: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 50,
    marginBottom: 20,
  },

  headerUnidade: {
    flexDirection: "row",
    alignItems: 'center', 
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    paddingBottom: 15,
    position :"relative",
  },
  avatar: {
    marginRight: 10,
  },
  streakContainer: {
    alignItems: "center",
  },
  streakIcon: {
    width: 40,
    height: 40,
  },
  streakNumber: {
    fontSize: 12,
    color: "#060302",
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  backButton: {
    position: "absolute",
    left: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontFamily: "Kumbh Sans",
    fontWeight: "600",
    color: "#121212",
    marginBottom: 10,
    
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: "Kumbh Sans",
    color: "#060302",
    marginLeft: 28,
  },
  unitsListContainer: {
    gap: 25,
  },
  cardShadow: {
    borderRadius: 12,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,

  },
  cardGradient: {
    borderRadius: 12,
    paddingTop: 15,
    paddingLeft: 0,
    
  },
  titleContainer: {
    width: '100%',
    alignItems: 'flex-start', 
    marginBottom: 0,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "700",
    color: Colors.primary,
    textAlign: "left",
    
    marginBottom: 15,
    backgroundColor:'white',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },

  cardIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    
  },
  cardDescription: {
    fontSize: 13,
    fontFamily: "Poppins",
    color: "white",
    lineHeight: 20,
    textAlign: "center",
  },
});
