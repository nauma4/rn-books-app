import React, {ReactNode} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {StoreProvider} from './store/Provider';

import {SplashScreen} from './screens/Splash';
import {MainScreen} from './screens/Main';
import {SingleScreen} from './screens/Single';

const Stack = createStackNavigator();

const AppContent: React.FC = (): ReactNode => {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  if (!isLoaded) return <SplashScreen />;

  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Single" component={SingleScreen} />
    </Stack.Navigator>
  );
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <StoreProvider>
          <AppContent />
        </StoreProvider>
      </NavigationContainer>
    </>
  );
}

export default App;
