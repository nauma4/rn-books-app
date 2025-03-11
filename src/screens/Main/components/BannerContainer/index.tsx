import React from 'react';
import {Dimensions, StyleSheet, View, Image, Text} from 'react-native';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import {useStore} from '../../../../store/Hook';
import {BookBannerItemType} from '../../../../store/Context';
import {useSharedValue} from 'react-native-reanimated';
import COLORS from '../../../../helpers/colors';
const {width} = Dimensions.get('window');

export const BannerContainer = () => {
  const {top_banner_slides} = useStore();
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  console.log(top_banner_slides);

  const renderItem = ({item}) => {
    console.log();
    return (
      <View style={styles.slide}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{uri: item.cover}}
        />
      </View>
    );
  };

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        loop={true}
        width={width}
        height={160}
        snapEnabled={true}
        pagingEnabled={true}
        autoPlayInterval={2000}
        data={top_banner_slides}
        renderItem={renderItem}
        onProgressChange={progress}
      />
      <Pagination.Basic
        progress={progress}
        data={top_banner_slides}
        size={7}
        dotStyle={styles.paginationDot}
        activeDotStyle={styles.paginationActiveDot}
        containerStyle={styles.pagination}
        horizontal
        onPress={onPressPagination}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginBottom: 40,
  },
  slide: {
    width: width - 30,
    height: 160,
    marginHorizontal: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  pagination: {
    height: 10,
    gap: 10,
    marginTop: -15,
  },
  paginationDot: {
    borderRadius: 5,
    backgroundColor: COLORS.white,
  },
  paginationActiveDot: {
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: COLORS.pink,
  },
});
