// Este arquivo centraliza todas as constantes de design do app
// Mudar um valor aqui (ex: a cor primary) vai refletir em todo o app,
// garantindo consistencia visual e facilitando a manutenção.


export const Colors = {
  // Paleta de Cores
  primary: '#003869', // o azul principal dos botões
  primaryShadow: '#0810209f', // a cor da "sombra" dos botões
  background: '#F8F8F8', 
  text: '#333333',
  textLight: '#FFFFFF',
  placeholder: '#888',
  error: '#b00020',
  gradientStart: 'rgba(137, 161, 212, 0.8)',
  gradientEnd: 'rgba(248, 248, 248, 0.8)',
  white: '#FFFFFF',
  black: '#000000',
  
  light: {
    text: '#11181C',
    background: '#fff',
    tint: '#0a7ea4',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#0a7ea4',
  },
  dark: {
    text: '#ECEDEE',
    background: '#ffffffff',
    tint: '#fff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
  },
};

export const Fonts = {
  size: {
    small: 14,
    medium: 16,
    large: 20,
    xlarge: 25,
    title: 32,
  },
  weight: {
    regular: '400', 
    medium: '500',
    semiBold: '600',
    bold: 'bold', 
  },

  family: {
    regular: 'Lexend_400Regular',
    bold: 'Lexend_700Bold',
  }
};

export const Spacing = {
  xsmall: 4,
  small: 8,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 30,
  giga: 40,
  buttonContainer: 40, 
  formGap: 16,
};
