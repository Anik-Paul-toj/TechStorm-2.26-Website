import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../theme/colors';
import { IMAGE_URLS } from '../utils/constants';

const { width } = Dimensions.get('window');

type SplashScreenProps = {
  onReady?: () => void;
};

export default function SplashScreen({ onReady }: SplashScreenProps) {
  return (
    <View style={styles.container}>
      <Image
        source={IMAGE_URLS.heroLogo}
        style={styles.logo}
        resizeMode="contain"
        accessibilityLabel="TechStorm 2026 Logo"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.85,
    maxWidth: 350,
    height: undefined,
    aspectRatio: 2.5,
  },
});
