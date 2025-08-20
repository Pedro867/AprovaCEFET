import React, { useEffect } from "react";
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { Spacing } from '@/constants/Colors'; 
import { useRouter } from 'expo-router';
import { checksessao } from "../api/conexaoFetch";


import { BotaoCustomizado } from '@/components/ui/ButtomCustom';

export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    const verificarSessao = async () => {
      const temConta = await checksessao();
      if (temConta) {
        router.replace('/(tabs)/secao');
      }
    };

    verificarSessao();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('@/assets/images/gifLogoAprovaCef.gif')}
          style={styles.logoImage}
          contentFit="contain"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Link href="/login" asChild>
          <BotaoCustomizado title="ENTRAR" />
        </Link>

        <Link href="/sign" asChild>
          <BotaoCustomizado title="REGISTRAR" />
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.large,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 250,
    height: 250,
    marginBottom: Spacing.giga,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.large,
    paddingBottom: 100, 
    gap: Spacing.buttonContainer,
  },
});