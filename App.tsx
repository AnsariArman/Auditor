import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import AuditFormScreen from './src/screens/AuditFormScreen';
import AuditSummaryScreen from './src/screens/AuditSummaryScreen';
import { ContextProvider } from './src/RoleProvider/useContextProvider';
import AuditHistoryScreen from './src/screens/AuditHistoryScreen';
import PolicyViewerScreen from './src/screens/PolicyViewerScreen';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// navigation between use
const Stack = createNativeStackNavigator();
//  all screen define
export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
    <ContextProvider> 
      <NavigationContainer >
            <StatusBar backgroundColor="#32656A" barStyle="dark-content" />

        <Stack.Navigator    screenOptions={{headerShown: false}} initialRouteName='LoginScreen'>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="AuditFormScreen" component={AuditFormScreen} />
          <Stack.Screen name="AuditSummaryScreen" component={AuditSummaryScreen} />
          <Stack.Screen name="AuditHistoryScreen" component={AuditHistoryScreen} />
          <Stack.Screen name="PolicyViewerScreen" component={PolicyViewerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
    </SafeAreaView>
  );
}
