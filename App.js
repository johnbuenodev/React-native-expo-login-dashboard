import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StatusBar } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import 'react-native-gesture-handler';

import Routes from './src/routes';
import AuthProvider from './src/contexts/auth';
import CreateAccount from './src/pages/CreateAccount';
import Login from './src/pages/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      
      <AuthProvider>
        <StatusBar backgroundColor="#F0F4FF" barStyle={'dark-content'} />
        <Routes />
      </AuthProvider>

    </NavigationContainer>
    </SafeAreaProvider>  
  );
}

/*

  <Stack.Screen name="NewTask" component={NewTask} options={styles.optionsCustomStackScreen} />
  <Stack.Screen name="Details" component={Details} options={styles.optionsCustomStackScreen} />

*/

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
  
});
