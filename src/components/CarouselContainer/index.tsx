import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';

import {BookItemType} from '@store/Context';
import COLORS from '@helpers/colors';

const {width} = Dimensions.get('window');

export interface CarouselContainerPropTypes {
  title: string;
  titleStyle?: TextStyle;
  data: Array<BookItemType>;
  onClick: (id: number) => (event: GestureResponderEvent) => void | undefined;
}

export const CarouselContainer: React.FC<CarouselContainerPropTypes> = ({
  title,
  titleStyle,
  data,
  onClick = () => {},
}) => {
  const ref = React.useRef<ICarouselInstance>(null);

  const renderItem = ({item}: {item: BookItemType}) => {
    return (
      <TouchableOpacity style={styles.slide} onPress={onClick(item.id)}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{uri: item.cover_url}}
        />
        <Text style={styles.slideTitle}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {!!title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      <Carousel
        ref={ref}
        width={width / 3}
        height={200}
        style={styles.carousel}
        autoPlayInterval={2000}
        data={data}
        renderItem={renderItem}
        loop={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  title: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 700,
    marginLeft: 16,
  },
  carousel: {
    width: width - 16,
    margin: 16,
  },
  slide: {
    width: 120,
    height: 150,
    marginRight: 8,
    gap: 8,
  },
  slideTitle: {
    color: COLORS.white,
    opacity: 0.3,
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    objectFit: 'cover',
  },
});
