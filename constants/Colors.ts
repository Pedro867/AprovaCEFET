/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#C6EEF5ff',
    titleBackground: '#30bae0ff',
    pageBackground: '#007B8A',
    pageText: '#a7b1ae',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    buttonText: '#35DA7Dff',
    input: '#8a8f92ff',
  },
  dark: {
    text: '#11181C',
    background: '#C6EEF5ff',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',

    tabIconSelected: tintColorLight,
    buttonText: '#35DA7Dff',
    input: '#8a8f92ff',
  },
};
