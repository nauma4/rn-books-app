import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import {useStore} from '@store/Hook';
import COLORS from '@helpers/colors';
import {CarouselContainer} from '@components/CarouselContainer';
import {Button} from '@components/Button';

import {BookItemType} from '@store/Context';
import {useNavigation, useRoute} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

export function SingleScreen({}): React.JSX.Element {
  const {books, you_will_like_section} = useStore();
  const navigation = useNavigation();
  const route = useRoute();
  const {book_id} = route.params;
  const [currentPosition, setCurrentPosition] = React.useState(0);

  // current data
  const list_book: Array<BookItemType> = React.useMemo(() => {
    const current = books.filter(item => item.id === book_id)[0];
    const other = books.filter(item => item.id !== book_id);
    return [current, ...other];
  }, [book_id, books]);
  const current_book: BookItemType = list_book[currentPosition];
  const recommendation_list = books.filter(item => you_will_like_section.includes(item.id));

  // animation
  const swipe = useSharedValue<number>(0);
  const animatedStyle = useAnimatedStyle(() => ({
    bottom: -parseInt(swipe.value),
  }));
  const onStartAnimation = () => {
    swipe.value = withTiming(height, {duration: 400});
  };
  const onEndAnimation = index => {
    runOnJS(setCurrentPosition)(index);
    swipe.value = withTiming(0, {duration: 400});
  };

  const renderItem = ({item}) => {
    return (
      <View style={cStyles.carouselSlide}>
        <Image
          source={{uri: item.cover_url}}
          resizeMode="cover"
          style={cStyles.slideImage}
        />
        <Text style={cStyles.slideTitle}>{item.name}</Text>
        <Text style={cStyles.slideAuthor}>{item.author}</Text>
      </View>
    );
  };

  return (
    <View style={styles.screenContainer}>
      <ImageBackground
        source={require('../../assets/images/bgSingle.png')}
        style={styles.screenHeader}
        resizeMode="cover">
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/arrow-back.png')} />
        </TouchableOpacity>
        <Carousel
          width={width}
          height={250}
          style={cStyles.carousel}
          data={list_book}
          pagingEnabled={true}
          snapEnabled={true}
          scrollAnimationDuration={500}
          loop={false}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.7,
            parallaxScrollingOffset: 220,
          }}
          renderItem={renderItem}
          onSnapToItem={onEndAnimation}
          onScrollStart={onStartAnimation}
        />
        <Animated.View style={[styles.screenDescription, animatedStyle]}>
          <DetailsBlock data={current_book} books={recommendation_list} navigation={navigation} />
        </Animated.View>
      </ImageBackground>
    </View>
  );
}

const DetailsBlock = ({data, books, navigation}) => (
  <ScrollView>
    <View style={styles.descriptionTabs}>
      <View style={styles.tabItem}>
        <Text style={styles.tabItemValue}>{data.views}</Text>
        <Text style={styles.tabItemLabel}>Readers</Text>
      </View>
      <View style={styles.tabItem}>
        <Text style={styles.tabItemValue}>{data.likes}</Text>
        <Text style={styles.tabItemLabel}>Likes</Text>
      </View>
      <View style={styles.tabItem}>
        <Text style={styles.tabItemValue}>{data.quotes}</Text>
        <Text style={styles.tabItemLabel}>Quotes</Text>
      </View>
      <View style={styles.tabItem}>
        <Text style={styles.tabItemValue}>{data.genre}</Text>
        <Text style={styles.tabItemLabel}>Genre</Text>
      </View>
    </View>
    <View style={styles.separation} />
    <View style={styles.description}>
      <Text style={styles.descriptionTitle}>Summary</Text>
      <Text style={styles.descriptionText}>{data.summary}</Text>
    </View>
    <View style={styles.separation} />
    <CarouselContainer
      title="You will also like"
      titleStyle={styles.otherBooksText}
      data={books}
      onClick={(id) => () => navigation.push('Single', { book_id: id })}
    />
    <Button
      text="Read Now"
      style={styles.submitButton}
      onPress={() => Alert.alert('Success', 'Read book in progress')}
    />
  </ScrollView>
);

const styles = StyleSheet.create({
  screenContainer: {
    flex: 2,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 50,
    zIndex: 2,
  },
  screenHeader: {
    flex: 1,
  },
  screenDescription: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  descriptionTabs: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tabItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  tabItemValue: {
    color: COLORS.darkText,
    fontSize: 20,
    fontWeight: 700,
    fontFamily: 'NunitoSans_Regular',
  },
  tabItemLabel: {
    fontSize: 12,
    color: COLORS.gray,
    fontFamily: 'NunitoSans_Regular',
  },
  separation: {
    width: width - 32,
    height: 1,
    backgroundColor: COLORS.gray,
    marginTop: 16,
    alignSelf: 'center',
  },
  description: {
    padding: 16,
  },
  descriptionTitle: {
    color: COLORS.darkText,
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 8,
    fontFamily: 'NunitoSans_Regular',
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.darkTextDescription,
    fontFamily: 'NunitoSans_Regular',
  },
  otherBooksText: {
    color: COLORS.darkText,
    marginTop: 24,
  },
  submitButton: {
    width: '100%',
    maxWidth: 278,
    alignSelf: 'center',
    marginHorizontal: 16,
    marginBottom: 150,
  },
});

const cStyles = StyleSheet.create({
  carousel: {
    width: width,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  carouselSlide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: 200,
    height: 250,
    objectFit: 'cover',
    borderRadius: 16,
  },
  slideTitle: {
    fontSize: 20,
    color: COLORS.white,
    marginTop: 16,
    marginBottom: 4,
    fontFamily: 'NunitoSans_Regular',
  },
  slideAuthor: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.8,
    fontFamily: 'NunitoSans_Regular',
  },
});
