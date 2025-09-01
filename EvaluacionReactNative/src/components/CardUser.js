import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { database } from '../config/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

// Función para eliminar un documento de Firestore
const handleDelete = async (id) => {
    try {
        // Se elimina el documento con el id proporcionado de la colección 'productos'
        await deleteDoc(doc(database, 'users', id));
        console.log('Se eliminó el documento con id: ', id);
    } catch (e) {
        console.error('Error removing document: ', e);
    }
};

// Función para actualizar el estado de 'vendido' de un documento en Firestore
const handleUpdate = async (id, vendido) => {
    try {
        // Se actualiza el campo 'vendido' invirtiendo su valor actual
        await updateDoc(doc(database, 'users', id), {
            vendido: !vendido
        });
        console.log('Se actualizó el documento con id: ', id);
    } catch (e) {
        console.error('Error updating document: ', e);
    }
};

// Componente funcional que representa una tarjeta de producto
const CardProductos = ({ id, nombre, correo, edad, especialidad, contrasena }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.nombre}>{nombre}</Text>
            <Text style={styles.text}>{correo}</Text>
            <Text style={styles.text}>{edad}</Text>
            <Text style={styles.text}>{especialidad}</Text>
            <Text style={styles.text}>{contrasena}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(id)}>
                    <Text style={styles.deleteButtonText}>Eliminar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.updateButton}
                    onPress={() => handleUpdate(id)}>
                    <Text style={styles.updateButtonText}>
                        Actualizar
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Estilos del componente
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    vendido: {
        color: 'red',
        fontWeight: 'bold',
    },
    disponible: {
        color: 'green',
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    deleteButton: {
        backgroundColor: '#ff4d4d',
        padding: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    updateButton: {
        padding: 10,
        borderRadius: 5,
    },
    updateButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    venderButton: {
        backgroundColor: '#4caf50',
    },
    regresarButton: {
        backgroundColor: '#ff9800',
    },
});

export default CardProductos;