import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@/screens/Home';
import ManageScreen from '@/screens/Manage';

export type StackParamList = {
  home: undefined;
  manage: {id?: string};
};

const Stack = createNativeStackNavigator<StackParamList>();

function App(): JSX.Element {
  return (
    <SafeAreaView className="h-full bg-black">
      <StatusBar barStyle="light-content" />
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator
          screenOptions={{headerTitleStyle: {fontWeight: 'bold'}}}>
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="manage"
            component={ManageScreen}
            options={{presentation: 'modal'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
