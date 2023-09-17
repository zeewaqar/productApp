import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from './screens/ProductList';
import ProductDetails from './screens/ProductDetails';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen name="ProductList" component={ProductList} options={{ title: 'Products' }} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ title: 'Product Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
