import React from 'react';
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native'

import { StyleSheet } from 'react-native';

function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
