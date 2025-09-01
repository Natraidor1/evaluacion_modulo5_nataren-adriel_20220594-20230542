// Importación de bibliotecas y componentes necesarios
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { database } from '../config/firebase'; // Importa la configuración de la base de datos de Firebase
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'; // Importa funciones de Firestore para consultas en tiempo real
import CardUser from '../components/CardUser'; // Importa el componente de tarjeta de producto

// Definición del componente principal Home
const Home = ({ navigation }) => {
    // Definición del estado local para almacenar los usuarios
    const [usuarios, setUsuarios] = useState([]);

    // useEffect se ejecuta cuando el componente se monta
    useEffect(() => {
        // Define una consulta a la colección 'usuarios' en Firestore, ordenada por el campo 'creado' en orden descendente
        const q = query(collection(database, 'usuarios'));
        
        // Escucha cambios en la consulta de Firestore en tiempo real
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                // Empuja cada documento con su ID a la lista de docs
                docs.push({ id: doc.id, ...doc.data() });
            });
            // Actualiza el estado de usuarios con los datos recibidos
            setUsuarios(docs);
        });

        // Limpieza de la suscripción al desmontar el componente
        return () => unsubscribe();
    }, []);

    // Función para navegar a la pantalla 'Add'
    const goToAdd = () => { 
        navigation.navigate('Add');
    }

    // Función que renderiza cada item de la lista
    const renderItem = ({ item }) => (
        <CardUser
            id={item.id}
            nombre={item.nombre}
            correo={item.correo}
            edad={item.edad}
            especialidad={item.especialidad}
            contrasena={item.contrasena}
        />
    );

    // Renderiza la interfaz del componente Home
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Usuarios registrados</Text>

            {/* Muestra la lista de usuarios si hay elementos, de lo contrario muestra un mensaje */}
            {
                usuarios.length !== 0 ?
                <FlatList
                    data={usuarios}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                />
                : 
                <Text style={styles.Subtitle}>Cargando usuarios</Text>
            }

            {/* Botón para navegar a la pantalla de agregar usuarios */}
            <TouchableOpacity
                style={styles.Button}
                onPress={goToAdd}>
                <Text style={styles.ButtonText}>Agregar usuario</Text>
            </TouchableOpacity>
        </View>
    );
};


// Exporta el componente Home como predeterminado
export default Home;

// Estilos para el componente Home
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    Subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color:'#ff9800'
    },
    Button: {
        backgroundColor: '#0288d1',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        marginHorizontal: 50,
        paddingVertical: 20,
    },
    ButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    list: {
        flexGrow: 1,
    },
});