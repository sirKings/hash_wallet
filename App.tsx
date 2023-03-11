/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-get-random-values';
import '@ethersproject/shims';

import {ethers} from 'ethers';
import 'node-libs-react-native/globals.js';
import {Alert, StyleSheet, useColorScheme} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GetStarted from './screens/get-started';
import EnterPassphrase from './screens/enter-passphrase';
import {AppRoutes} from './constants/routes';
import theme from './constants/theme';
import Main from './screens/main';

const Stack = createNativeStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: theme.Colors.white,
            headerStyle: {
              backgroundColor: theme.Colors.primary,
            },
          }}>
          <Stack.Screen
            name={AppRoutes.HOME}
            component={GetStarted}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={AppRoutes.ENTER_PASSPHRASE}
            component={EnterPassphrase}
            options={{
              title: 'Enter Seed Phrase',
            }}
          />
          <Stack.Screen
            name={AppRoutes.MAIN}
            component={Main}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  welcome: {
    fontSize: 18,
  },
});
