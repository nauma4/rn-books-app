import React, {ReactNode} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {StoreProvider} from '@store/Provider';
import {SplashScreen} from '@screens/Splash';
import {MainScreen} from '@screens/Main';
import {SingleScreen} from '@screens/Single';
import COLORS from '@helpers/colors';

const Stack = createStackNavigator();

const AppContent: React.FC = (): ReactNode => {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  function hideScreen() {
    setIsLoaded(true);
  }

  if (!isLoaded) {
    return <SplashScreen hideScreen={hideScreen} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{headerTransparent: true}}>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            headerTitle: 'Library',
            headerTintColor: COLORS.pink,
            headerTitleAlign: 'left',
          }}
        />
        <Stack.Screen
          name="Single"
          component={SingleScreen}
          options={{
            headerTransparent: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: !isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      <StatusBar
        barStyle={!isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <SafeAreaProvider>
        <StoreProvider>
          <AppContent />
        </StoreProvider>
      </SafeAreaProvider>
    </>
  );
}

export default App;
