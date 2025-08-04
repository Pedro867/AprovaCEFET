/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#ffffffff',
    pageBackground: '#007B8A',
    pageText: '#e4eae7ff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    input: '#8a8f92ff',
    verdeClaro: '#35DA7Dff',
    vermelho: '#d11515b8',
    amarelo: '#a58217b5',
    verdeEscuro: '#1d8224a2',
    azul: '#1828dba9',
  },
  dark: {
    text: '#11181C',
    background: '#ffffffff',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorLight,
    buttonText: '#35DA7Dff',
    input: '#8a8f92ff',
  },
};
