import React, { useEffect, useState } from "react";
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { StyleSheet, View, Text } from 'react-native';
import { Spacing } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { getToken } from "../api/manipulacaoTokens";


import { BotaoCustomizado } from '@/components/ui/ButtomCustom';

export default function HomeScreen() {
  /*const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        router.replace('/(tabs)/secao'); // logado
      }
      setLoading(false);
    };
    checkToken();
  }, []);

  if (loading) {
    return <ThemedView><Text>Carregando...</Text></ThemedView>;
    // pode ser splash screen também
  }*/

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
    width: 350,
    height: 350,
    marginBottom: Spacing.giga,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.large,
    paddingBottom: 100,
    gap: Spacing.buttonContainer,
  },
});