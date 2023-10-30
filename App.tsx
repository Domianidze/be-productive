import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

function App(): JSX.Element {
  return (
    <SafeAreaView className="h-full bg-black">
      <StatusBar barStyle="light-content" />
    </SafeAreaView>
  );
}

export default App;
