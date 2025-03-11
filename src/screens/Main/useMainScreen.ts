import {useNavigation} from '@react-navigation/native';
import {useStore} from '@store/Hook';

export function useMainScreen() {
  const navigation = useNavigation();
  const {books, top_banner_slides} = useStore();

  const handleClickItem = (id: number) => () => {
    navigation.navigate('Single', { book_id: id });
  };

  

  return {books, top_banner_slides, handleClickItem};
}
