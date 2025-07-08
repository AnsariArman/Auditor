import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import AuditFormScreen from './src/screens/AuditFormScreen';
import AuditSummaryScreen from './src/screens/AuditSummaryScreen';
import AuditHistoryScreen from './src/screens/AuditHistoryScreen';
import PolicyViewerScreen from './src/screens/PolicyViewerScreen';
import { ContextProvider } from './src/RoleProvider/useContextProvider';
// navigation between use
const Stack = createNativeStackNavigator();
//  all screen define
export default function App() {
  return (
    <ContextProvider> 
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="AuditForm" component={AuditFormScreen} />
          <Stack.Screen name="Summary" component={AuditSummaryScreen} />
          <Stack.Screen name="History" component={AuditHistoryScreen} />
          <Stack.Screen name="Policy" component={PolicyViewerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}
