import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigation/Navigation';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';

exp
import Navigation from './src/navigation/Navigation';
export default function App() {
  return (
    <AuthProvider>
          <Navigation/>
    </AuthProvider>
  );
}
