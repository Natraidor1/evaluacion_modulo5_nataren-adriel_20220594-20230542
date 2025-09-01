// Importación de bibliotecas y componentes necesarios
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { auth, database } from '../config/firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import CardUser from '../components/CardUser';

// Definición del componente principal Home
const Home = () => {
  const [usuario, setUsuario] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    edad: '',
    especialidad: '',
  });

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userRef = doc(database, 'usuarios', currentUser.uid);

      const unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          setUsuario(data);
          setFormData({
            nombre: data.nombre || '',
            correo: data.correo || '',
            edad: data.edad ? data.edad.toString() : '',
            especialidad: data.especialidad || '',
          });
        } else {
          console.log("No se encontró información del usuario");
        }
      });

      return () => unsubscribe();
    }
  }, []);

  const handleUpdate = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const userRef = doc(database, 'usuarios', currentUser.uid);
      await updateDoc(userRef, {
        nombre: formData.nombre,
        correo: formData.correo,
        edad: parseInt(formData.edad),
        especialidad: formData.especialidad,
      });

      Alert.alert('Éxito', 'Perfil actualizado correctamente');
      setEditMode(false);
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      Alert.alert('Error', 'No se pudo actualizar el perfil');
    }
  };

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando Perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      {/* Campos editables */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={[styles.input, !editMode && styles.disabledInput]}
          editable={editMode}
          value={formData.nombre}
          onChangeText={(text) => setFormData({ ...formData, nombre: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo:</Text>
        <TextInput
          style={[styles.input, !editMode && styles.disabledInput]}
          editable={editMode}
          value={formData.correo}
          onChangeText={(text) => setFormData({ ...formData, correo: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Edad:</Text>
        <TextInput
          style={[styles.input, !editMode && styles.disabledInput]}
          editable={editMode}
          keyboardType="numeric"
          value={formData.edad}
          onChangeText={(text) => setFormData({ ...formData, edad: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Especialidad:</Text>
        <TextInput
          style={[styles.input, !editMode && styles.disabledInput]}
          editable={editMode}
          value={formData.especialidad}
          onChangeText={(text) => setFormData({ ...formData, especialidad: text })}
        />
      </View>

      {/* Botones */}
      {editMode ? (
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Guardar cambios</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => setEditMode(true)}>
          <Text style={styles.buttonText}>Editar perfil</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Exporta el componente Home como predeterminado
export default Home;

// Estilos para el componente Home
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  inputContainer: { marginBottom: 15 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  disabledInput: {
    backgroundColor: '#e9ecef',
    color: '#6c757d',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});