import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@/screens/Home';

export type StackParamList = {
  home: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

function App(): JSX.Element {
  return (
    <SafeAreaView className="h-full bg-black">
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Stack.Screen name="home" component={HomeScreen} />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
