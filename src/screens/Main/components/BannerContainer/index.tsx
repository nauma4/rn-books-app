import React, {ReactNode} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import {useSharedValue} from 'react-native-reanimated';

import {BookBannerItemType} from '@store/Context';
import COLORS from '@helpers/colors';

const {width} = Dimensions.get('window');

export interface BannerContainerPropTypes {
  data: Array<BookBannerItemType>;
  onClick: (id: number) => (event: GestureResponderEvent) => void | undefined;
}

export const BannerContainer: React.FC<BannerContainerPropTypes> = ({
  data,
  onClick = () => {},
}): ReactNode => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const renderItem = ({item}: {item: BookBannerItemType}) => {
    return (
      <TouchableOpacity style={styles.slide} onPress={onClick(item.book_id)}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{uri: item.cover}}
        />
      </TouchableOpacity>
    );
  };

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
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
        autoPlay={true}
        autoPlayInterval={2000}
        data={data}
        renderItem={renderItem}
        onProgressChange={progress}
      />
      <Pagination.Basic
        progress={progress}
        data={data}
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
