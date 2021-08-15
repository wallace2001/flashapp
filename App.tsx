/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { MobileProivder } from './src/context/context';
import { Provider } from 'react-redux';
import { Router } from './src/routes';
import { store } from './src/stores';
import { Loading } from './src/screens/Loading';

const App = () => {
  return (
    <Provider store={store}>
      <MobileProivder>
        <SafeAreaView style={styles.container}>
          <Router />
          <Loading />
        </SafeAreaView>
      </MobileProivder>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
