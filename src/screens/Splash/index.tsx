import React, {ReactNode} from 'react';
import remoteConfig from '@react-native-firebase/remote-config';

import {ScreenView} from './View';
import {BooksAppState} from '../../store/Context';
import {useStore} from '../../store/Hook';
import LoadingLine from '../../components/LoadingLine';

export const SplashScreen: React.FC = (): ReactNode => {
  const {onSetData} = useStore();

  const fetchData = React.useCallback(async () => {
    try {
      await remoteConfig().setConfigSettings({
        minimumFetchIntervalMillis: 3600000,
      });
      await remoteConfig().fetch();
      await remoteConfig().activate();

      const jsonData: string = remoteConfig()
        .getValue('json_data')
        .asString();
      const result: BooksAppState = JSON.parse(jsonData) as BooksAppState;
      onSetData(result);
    } catch (error) {
      console.error('Error fetching Remote Config: ', error);
    }
  }, [onSetData]);

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScreenView>
      <LoadingLine />
    </ScreenView>
  );
};
