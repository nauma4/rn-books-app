import React from 'react';
import {StyleSheet, StatusBar, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '@helpers/colors';
import {BannerContainer} from './components/BannerContainer';
import {CarouselContainer} from '@components/CarouselContainer';
import {useMainScreen} from './useMainScreen';

export function MainScreen({}): React.JSX.Element {
  const {books, top_banner_slides, handleClickItem} = useMainScreen();

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <BannerContainer data={top_banner_slides} onClick={handleClickItem} />
        <CarouselContainer title={'New Arrivals'} data={books} />
        <CarouselContainer title={'Romance'} data={books} />
        <CarouselContainer title={'Top Romantic Comedy'} data={books} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: COLORS.mainBackground,
  },
});
