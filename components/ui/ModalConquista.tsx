import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { SvgProps } from "react-native-svg";
import { BotaoCustomizado } from "./ButtomCustom"; 
import { Fonts } from "@/constants/Colors";
import { useRouter } from "expo-router";


type Emblema = {
  id: string;
  nome: string;
  Icon: React.FC<SvgProps>; // O ícone é um componente SVG
};

type ModalConquistaProps = {
  visible: boolean;
  emblema: Emblema | null;
  onClose: () => void;
  onNavigateToProfile: () => void;
};

export function ModalConquista({
  visible,
  emblema,
  onClose,
  onNavigateToProfile,
}: ModalConquistaProps) {
  const router = useRouter();

  if (!visible || !emblema) {
    return null; 
  }

  const EmblemaIcon = emblema.Icon;

  return (
    <BlurView
      intensity={100}
      tint="dark"
      style={styles.blurContainer}
    >
      <View style={styles.modalContent}>
        <Text style={styles.title}>Emblema Desbloqueado!</Text>
        
        {/* renderiza o ícone do emblema */}
        <EmblemaIcon width={150} height={150} style={styles.emblemImage} />

        <Text style={styles.emblemName}>{emblema.nome}</Text>
        <Text style={styles.subtitle}>
          Você pode equipar este emblema no seu perfil.
        </Text>

        <BotaoCustomizado
          title="IR PARA O PERFIL"
          onPress={onNavigateToProfile}
          style={{ width: "90%", marginBottom: 15 }}
        />

        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: Fonts.family.kumbhSans,
    color: "#121212",
    marginBottom: 10,
  },
  emblemImage: {
    marginVertical: 20,
  },
  emblemName: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: Fonts.family.kumbhSans,
    color: "#0D1B52",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#727272",
    fontFamily: Fonts.family.kumbhSans,
    textAlign: "center",
    marginBottom: 25,
  },
  closeText: {
    fontSize: 16,
    color: "#727272",
    fontFamily: Fonts.family.kumbhSans,
    fontWeight: "bold",
  },
});