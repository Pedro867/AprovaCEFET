import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Fonts, Spacing } from "@/constants/Colors";
import { BotaoCustomizado } from "@/components/ui/ButtomCustom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteAcc } from "../api/conexaoFetch";
// Importe a função da API que criamos no passo anterior (se você a criou)
// import { deleteUserAccount } from "../api/conexaoFetch";

export default function EditProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Sair da Conta", "Você tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        onPress: async () => {
          await AsyncStorage.clear();
          router.replace('/'); // vai direto para o index (raiz do diretorio)
        },
        style: "destructive",
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Deletar Conta",
      "Esta ação é irreversível e todos os seus dados serão perdidos. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          onPress: async () => {
            await deleteAcc();
            await AsyncStorage.clear();
            router.replace('/');
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <LinearGradient
      style={styles.backgroundContainer}
      colors={[Colors.gradientEnd, Colors.gradientStart]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.replace('/profile')} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color={Colors.text} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Editar Perfil</ThemedText>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/(tabs)/changeName')}>
            <Feather name="user" size={24} color={Colors.primary} />
            <ThemedText style={styles.menuItemText}>Alterar Nome</ThemedText>
            <Feather name="chevron-right" size={24} color={Colors.placeholder} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/(tabs)/changePassword')}>
            <Feather name="lock" size={24} color={Colors.primary} />
            <ThemedText style={styles.menuItemText}>Alterar Senha</ThemedText>
            <Feather name="chevron-right" size={24} color={Colors.placeholder} />
          </TouchableOpacity>
        
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
             <Feather name="log-out" size={24} color={Colors.error} />
             <ThemedText style={[styles.menuItemText, styles.logoutText]}>Sair (Logout)</ThemedText>
          </TouchableOpacity>
           <TouchableOpacity style={styles.menuItem} onPress={handleDeleteAccount}>
             <Feather name="trash-2" size={24} color={Colors.error} />
             <ThemedText style={[styles.menuItemText, styles.deleteText]}>Deletar Conta</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    backgroundContainer: { flex: 1 },
    container: {
        flexGrow: 1,
        padding: Spacing.large,
        paddingTop: 60,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: Spacing.large,
    },
    backButton: {
        position: "absolute",
        left: 10,
        zIndex: 1,
    },
    headerTitle: {
        fontFamily: Fonts.family.kumbhSans,
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        flex: 1,
        color: "black",
    },
    menuContainer: {
        marginTop: 100,
        
    },
    
    menuItem: {
        backgroundColor: Colors.white,
        padding: Spacing.large,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    menuItemText: {
        flex: 1,
        marginLeft: Spacing.medium,
        fontSize: Fonts.size.large,
        color: Colors.primary,
        fontWeight: 'bold',
    },
    
    logoutText: {
        color: Colors.error,
        //fontWeight: 'bold',
    },
    deleteText: {
        color: Colors.error,
        //fontWeight: 'bold',
    },
});