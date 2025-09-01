import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigation/Navigation';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
          <Navigation/>
    </AuthProvider>
  );
}