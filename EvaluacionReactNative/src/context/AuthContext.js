import React,{createContext, useState, useCallback, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
import auth from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext(null);

export {AuthContext};

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const loadToken = async () => {
          const token = await AsyncStorage.getItem("token");
          if (token) {
            setAuthToken(token);
          }
        };
        loadToken();
      }, []);

      const clearSession = async () => {
        await AsyncStorage.removeItem("token");
        setUser(null);
        setAuthToken(null);
      };

     /* const logout = useCallback(async () => {
        try {
          await fetch(`${API_URL}/logout`, {
            method: "POST",
            credentials: "include",
          });
        } catch (error) {
          console.error("Error during logout:", error);
        } finally {
          await clearSession();
          ToastAndroid.show("Sesión cerrada correctamente", ToastAndroid.SHORT);
        }
      }, [API_URL]);*/


      /*const login = async (email, password) => {
        try {
          const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include",
          });
    
          const data = await response.json();
    
          if (response.ok) {
            await AsyncStorage.setItem("token", data.token);
            setAuthToken(data.token);
            console.log(data)
            setUser(data.userName);
            ToastAndroid.show("Inicio de sesión exitoso", ToastAndroid.SHORT);
            return true; // El componente que llama decide redirigir
          } else {
            ToastAndroid.show(data.message || "Error al iniciar sesión", ToastAndroid.SHORT);
            return false;
          }
        } catch (error) {
          console.error("Error during login:", error);
          ToastAndroid.show("Error de conexión con el servidor", ToastAndroid.SHORT);
          return false;
        }
    };*/


   /* const register = async ({email, password, displayName}) => {
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);

            await userCredential.user.updateProfile({ displayName });

            ToastAndroid.show("Registro exitoso", ToastAndroid.SHORT);
            setUser(displayName);
            return true;
            
        } catch (error) {
          console.error("Error durante el registro:", error);
          ToastAndroid.show("Error de conexión al registrar.", ToastAndroid.SHORT);
          return false;
        }
      };*/


      return(
        <AuthContext.Provider value={{user, authToken, loading,}}>
            {children}
        </AuthContext.Provider>
      )


}