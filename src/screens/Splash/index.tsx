import React, {ReactNode} from 'react';
import {Alert} from 'react-native';
import remoteConfig from '@react-native-firebase/remote-config';

import {ScreenView} from './View';
import {BooksAppState} from '@store/Context';
import {useStore} from '@store/Hook';
import LoadingLine from '@components/LoadingLine';

export const SplashScreen: React.FC = ({
  hideScreen,
}: {
  hideScreen: () => void;
}): ReactNode => {
  const TIMEOUT_DELAY: number = 2000;
  const {onSetData} = useStore();

  const fetchData = React.useCallback(async () => {
    try {
      await remoteConfig().setConfigSettings({
        minimumFetchIntervalMillis: 3600000,
      });
      await remoteConfig().fetch();
      await remoteConfig().activate();

      const jsonData: string = remoteConfig().getValue('json_data').asString();
      const result: BooksAppState = JSON.parse(jsonData) as BooksAppState;
      onSetData(result);
    } catch (error) {
      Alert.alert('Fetch data failed', 'Error fetching Remote Config: ' + error);
    }
  }, [onSetData]);

  React.useEffect(() => {
    fetchData();

    setTimeout(() => {
      hideScreen()
    }, TIMEOUT_DELAY);
  }, []);

  return (
    <ScreenView>
      <LoadingLine progress={100} duration={TIMEOUT_DELAY} />
    </ScreenView>
  );
};
