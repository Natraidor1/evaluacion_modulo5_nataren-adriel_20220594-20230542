import React, { useEffect } from "react";
import Navigation from './src/navigation/Navigation';
import { AuthProvider } from './src/context/AuthContext';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  useEffect(() => {
    const preparar = async () => {
      try {
        // Evita que se oculte automáticamente
        await SplashScreen.preventAutoHideAsync();

        // Simula carga de recursos, etc.
        await new Promise(resolve => setTimeout(resolve, 3000)); // Puedes ajustar el tiempo

      } catch (e) {
        console.warn(e);
      } finally {
        // Oculta el splash screen
        await SplashScreen.hideAsync();
      }
    };

    preparar();
  }, []);

  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
