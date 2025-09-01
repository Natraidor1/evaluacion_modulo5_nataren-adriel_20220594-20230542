import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { auth, database } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
 
// Componente Add para agregar un nuevo usuarios
const Add = ({ navigation }) => {
    // Estado inicial del usuarios

    const nav = useNavigation();

    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        edad: '',
        especialidad: '',
        contrasena: '',
      });

    const [loading, setLoading] = useState(false);
    
    const updateField = (field, value) => {
        setFormData(prev => ({
          ...prev,
          [field]: value
        }));
      };
 
      const validateForm = () => {
        const { nombre, correo, edad, especialidad, contrasena } = formData;
        
        if (!nombre || !correo|| !edad|| !especialidad|| !contrasena) {
          Alert.alert('Error', 'Por favor, completa todos los campos');
          return false;
        }
    
        if (contrasena.length < 6) {
          Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
          return false;
        }
    
        if (isNaN(edad) || parseInt(edad) < 1 || parseInt(edad) > 120) {
          Alert.alert('Error', 'Por favor, ingresa una edad válida');
          return false;
        }
    
        return true;
      };

      const handleRegister = async () => {
        if (!validateForm()) return;
    
        setLoading(true);
        try {
          // Crear usuario en Firebase Auth
          const userCredential = await createUserWithEmailAndPassword(
            auth, 
            formData.correo, 
            formData.contrasena
          );
    
          // Guardar datos adicionales en Firestore
          await setDoc(doc(database, 'usuarios', userCredential.user.uid), {
            nombre: formData.nombre,
            correo: formData.correo,
            edad: parseInt(formData.edad),
            especialidad: formData.especialidad,
            createdAt: new Date().toISOString(),
          });
    
          Alert.alert('Éxito', 'Usuario registrado correctamente');
    
          nav.navigate('Login');
        } catch (error) {
          let message = 'Error al registrar usuario';
    
          console.log('Error al registrar usuario:', error);
          
          switch (error.code) {
            case 'auth/email-already-in-use':
              message = 'Este correo electrónico ya está registrado';
              break;
            case 'auth/invalid-email':
              message = 'Correo electrónico inválido';
              break;
            case 'auth/weak-password':
              message = 'La contraseña es muy débil';
              break;
          }
          
          Alert.alert('Error', message);
        } finally {
          setLoading(false);
        }
      };
      


    return (
<View style={styles.container}>
<View style={styles.inputContainer}>
  <Text style={styles.label}>Nombre:</Text>
  <TextInput
    style={styles.input}
    value={formData.nombre}
    onChangeText={(value)=>updateField('nombre', value)}
  />
</View>

<View style={styles.inputContainer}>
  <Text style={styles.label}>Correo electrónico:</Text>
  <TextInput
    style={styles.input}
    value={formData.correo}
    placeholder='ejemplo@gmail.com'
    onChangeText={(value)=>updateField('correo', value)}
    keyboardType="email-address"
    autoCapitalize="none"
  />
</View>

<View style={styles.inputContainer}>
  <Text style={styles.label}>Especialidad:</Text>
  <TextInput
    style={styles.input}
    value={formData.especialidad}
    onChangeText={(value)=>updateField('especialidad', value)}
  />
</View>

<View style={styles.inputContainer}>
  <Text style={styles.label}>Edad:</Text>
  <TextInput
    style={styles.input}
    value={formData.edad}
    onChangeText={(value)=>updateField('edad', value)}
    keyboardType="numeric"
  />
</View>

<View style={styles.inputContainer}>
  <Text style={styles.label}>Contraseña:</Text>
  <TextInput
    style={styles.input}
    placeholder='Contraseña minima 6 carcateres'
    value={formData.contrasena}
    onChangeText={ (value)=>updateField('contrasena', value)}
    secureTextEntry
  />
</View>

<TouchableOpacity style={styles.button} onPress={handleRegister}>
<Text style={styles.buttonText}>Crear usuario</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
<Text style={styles.buttonText}>iniciar sesión</Text>
</TouchableOpacity>

</View>
    );
};
 
export default Add;
 
// Estilos del componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        width: '100%'
    },
    imagePicker: {
        backgroundColor: '#0288d1',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    imagePickerText: {
        color: 'white',
        fontWeight: 'bold',
    },
    imagePreview: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#0288d1',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    inputContainer: {
        width: '100%',
        padding: 16,
        backgroundColor: '#f8f9fa',
        marginBottom: 16,
    },
});