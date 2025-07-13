import { Platform, StyleSheet } from 'react-native';
import { TextInput, Button, Text, View } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';

export default function HomeScreen() {
    const colorScheme = 'blue';
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');

    const handleCadastro = async () => {
        if (!email || !senha || !nome) {
            alert('Preencha todos os campos');
            return;
        }

        try {
            const response = await fetch('http://SEU_IP_AQUI:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome,
                    email,
                    senha,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro no cadastro');
            }

            console.log('Resposta do backend:', data);
            //alert(data.message || 'Cadastro realizado com sucesso!');

            // Limpa os campos após o cadastro
            setNome('');
            setEmail('');
            setSenha('');

        } catch (error) {
            console.error('Erro:', error);

            let errorMessage = 'Erro ao conectar ao servidor.';
            if (error instanceof Error) {
                errorMessage = error.message;
            }

            alert(errorMessage);
        }
    };


    return (
        <View style={styles.viewPaginaCheia}>
            <View style={styles.viewCadastro}>

                <ThemedView style={styles.tituloCampo}>
                    <ThemedText type="defaultSemiBold" lightColor='white'>Nome:</ThemedText>
                </ThemedView>
                <ThemedView style={styles.stepContainer}>
                    <TextInput
                        value={nome}
                        onChangeText={setNome}
                        placeholder="Digite seu nome"
                    />
                </ThemedView>

                <ThemedView style={styles.tituloCampo}>
                    <ThemedText type="defaultSemiBold" lightColor='white'>Email:</ThemedText>
                </ThemedView>
                <ThemedView style={styles.stepContainer}>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Digite seu email"
                    />
                </ThemedView>

                <ThemedView style={styles.tituloCampo}>
                    <ThemedText type="defaultSemiBold" lightColor='white'>Senha:</ThemedText>
                </ThemedView>
                <ThemedView style={styles.stepContainer}>
                    <TextInput
                        value={senha}
                        onChangeText={setSenha}
                        placeholder="Digite sua senha"
                        secureTextEntry
                    />
                </ThemedView>

                <Button title="Cadastrar" onPress={handleCadastro} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewPaginaCheia: {
        flex: 1,
        backgroundColor: '#A9A9A9', //fundo pra dar uma impressao de blur
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewCadastro: {
        width: '90%',
        borderRadius: 20,
        backgroundColor: '#0000CD',
        padding: 20,
        elevation: 5, // sombra Android
        shadowColor: '#000', // sombra iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    tituloCampo: {
        marginTop: 20,
        alignSelf: 'flex-start',
        backgroundColor: 'transparent',
        marginBottom: 5,
    },
    stepContainer: {
        alignSelf: 'stretch',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15,
    },
});