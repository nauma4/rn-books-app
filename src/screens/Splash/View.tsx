import React from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import COLORS from '../../helpers/colors';

type ScreenViewProps = PropsWithChildren<{
  title?: string;
}>;

export function ScreenView({ children }: ScreenViewProps): React.JSX.Element {
  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.backgroundImage}
      resizeMode="cover">
      <ImageBackground
        source={require('../../assets/images/bgHeart.png')}
        style={styles.backgroundImage}
        resizeMode="contain"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Book App</Text>
          <Text style={styles.subTitle}>Welcome to the Book App</Text>
          {children}
        </View>
      </ImageBackground>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 52,
    fontWeight: 700,
    color: COLORS.pink,
  },
  subTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.white,
    marginTop: 12,
    marginBottom: 50,
  }
});
