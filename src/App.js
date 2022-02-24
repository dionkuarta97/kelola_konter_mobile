import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NativeBaseProvider, StatusBar} from 'native-base';
import SplashScreen from './Screens/SplashScreen/SplashScreen';
import LoginScreen from './Screens/Login/LoginScreen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './Redux/store';
import MenuScreen from './Screens/MenuScreen';
import ProdukCategoryScreen from './Screens/Produk/ProdukCategoryScreen';
import AddProdukOneScreen from './Screens/Produk/AddProdukOneScreen';

const Stack = createNativeStackNavigator();
const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider config={config}>
          <NavigationContainer>
            <StatusBar backgroundColor={'#047857'} />
            <Stack.Navigator
              initialRouteName="SplashScreen"
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="MenuScreen" component={MenuScreen} />
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen
                name="ProdukCategoryScreen"
                component={ProdukCategoryScreen}
              />
              <Stack.Screen
                name="AddProdukOneScreen"
                component={AddProdukOneScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
