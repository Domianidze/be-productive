import React from 'react';
import {SafeAreaView, StatusBar, Platform} from 'react-native';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import notifee from '@notifee/react-native';
import {createTodosTable} from '@/db';
import HomeScreen from '@/screens/Home';
import ManageScreen from '@/screens/Manage';

export type StackParamList = {
  home: undefined;
  manage: {id?: string};
};

const Stack = createNativeStackNavigator<StackParamList>();

function App(): JSX.Element {
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }

    const createTables = async () => {
      try {
        await createTodosTable();
      } catch (error: any) {
        console.error(error);
      }
    };

    const setupNotifications = async () => {
      await notifee.requestPermission();

      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
    };

    createTables();
    setupNotifications();
  }, []);

  return (
    <SafeAreaView className="h-full bg-black">
      <StatusBar barStyle="light-content" backgroundColor="black" />
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
