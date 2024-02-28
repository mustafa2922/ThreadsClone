import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Navigation from './navigation/navigation';
import Toast from 'react-native-toast-message';
import UserState from './context/userState';

function App() {
  return (
    <View style={styles.container} >
      <UserState>
        <StatusBar backgroundColor={'#fff'} barStyle={'light-content'} />

        <Navigation />

        <Toast />
      </UserState>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  black: {
    color: 'black'
  },
});

export default App;
