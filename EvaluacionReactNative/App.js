import React, {useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigation/Navigation';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    const preparar = async () => {
      // Simula carga de recursos, API, etc.
      await new Promise(resolve => setTimeout(resolve, 4000));
      await SplashScreen.hideAsync();
    };

    preparar();
  }, []);
  return (
    <AuthProvider>
          <Navigation/>
    </AuthProvider>
  );
}