import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { database } from '../config/firebase';
//import { database, storage } from '../config/firebase';
//import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
 
// Componente Add para agregar un nuevo usuarios
const Add = ({ navigation }) => {
    // Estado inicial del usuarios
    const [usuarios, setUsuarios] = useState({
        nombre: '',
        correo: '',
        edad: 0,
        especialidad: '',
        contrasena: ''
    });
 
    // Función para navegar a la pantalla de inicio
    const goToHome = () => {
    navigation.goBack();
    };
 
    // Función para agregar el usuarios a Firestore
    const agregarUsuario = async () => {
        try {
            let imageUrl = "Storage ya no es gratuito";
 
          /*  if (usuarios.imagen) {
                console.log('Subiendo imagen a Firebase Storage...');
                const imageRef = ref(storage, `images/${Date.now()}-${usuarios.nombre}`);
 
                const response = await fetch(usuarios.imagen);
                const blob = await response.blob();
 
                console.log('Antes del uploadBytes');
                const snapshot = await uploadBytes(imageRef, blob);
                console.log('Snapshot después del uploadBytes:', snapshot);
 
                imageUrl = await getDownloadURL(snapshot.ref);
                console.log("URL de la imagen:", imageUrl);
            }
*/
            //console.log('Datos del usuarios:', {...usuarios, imagen: imageUrl});
            //console.log('Datos del usuarios:', {...usuarios});
            await addDoc(collection(database, 'usuarios'), {...usuarios});
            console.log('Se guardó la colección');
 
            Alert.alert('usuarios agregado', 'El usuarios se agregó correctamente', [
                { text: 'Ok', onPress: goToHome },
            ]);
 
        } catch (error) {
            console.error('Error al agregar el usuarios', error);
            Alert.alert('Error', 'Ocurrió un error al agregar el usuarios. Por favor, intenta nuevamente.');
        }
    };
 
    return (
<View style={styles.container}>
<Text style={styles.title}>Agregar usuario</Text>
<View style={styles.inputContainer}>
<Text style={styles.label}>Nombre:</Text>
<TextInput
                    style={styles.input}
                    onChangeText={text => setUsuarios({ ...usuarios, nombre: text })}
                    value={usuarios.nombre}
                />
</View>

<View style={styles.inputContainer}>
<Text style={styles.label}>Correo electronico:</Text>
<TextInput
                    style={styles.input}
                    onChangeText={text => setUsuarios({ ...usuarios, correo: text })}
                    value={usuarios.correo}
                />
</View>



<View style={styles.inputContainer}>
<Text style={styles.label}>edad:</Text>
<TextInput
                    style={styles.input}
                    onChangeText={text => setUsuarios({ ...usuarios, edad: parseFloat(text) })}
                    value={usuarios.edad}
                    keyboardType='numeric'
                />
</View>

<View style={styles.inputContainer}>
<Text style={styles.label}>Contraseña:</Text>
<TextInput
                    style={styles.input}
                    onChangeText={text => setUsuarios({ ...usuarios, contrasena: text })}
                    value={usuarios.contrasena}
                />
</View>
 
            <TouchableOpacity style={styles.button} onPress={agregarUsuario}>
<Text style={styles.buttonText}>Guardar</Text>
</TouchableOpacity>
 
            <TouchableOpacity style={styles.button} onPress={goToHome}>
<Text style={styles.buttonText}>Volver a home</Text>
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