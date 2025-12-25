
import { useRegisterTaskUsersMutation } from '@/services/apiService';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as z from 'zod';
const taskSchema = z.object({
  title: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string().min(3, "El apellido debe tener al menos 3 caracteres"),
  dateExpiration: z.string().date("Fecha inválida"),
});
type TaskFormData = z.infer<typeof taskSchema>;

export default function DetailsScreen() {
    const [registerTaskUsers] = useRegisterTaskUsersMutation();
    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<TaskFormData>({
      resolver: zodResolver(taskSchema),
      defaultValues: { title: '', description: '', dateExpiration: '' }
    });
  
    const onSubmit = async (data: TaskFormData) => {
       await registerTaskUsers(data)
                .unwrap()
                .then((response:any) => {
                    Alert.alert("Éxito", "Usuario registrado correctamente");
                    router.replace('/(auth)/login#login');
                })
                .catch((err:any) => {
                  console.log("Datos validados:", err);
                  Alert.alert("Error", err.data?.message || "Error en el inicio de sesión");
            });
    };
  return (
      <View style={styles.container}>
        <ScrollView>
            <Text style={styles.title}>Crear Tarea</Text>
      
            {/* Campo: Usuario */}
            <Text style={styles.label}>Nombre de usuario</Text>
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.title && styles.inputError]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Ej: juan_perez"
                />
              )}
            />
            {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}

            {/* Campo: Descripción */}
            <Text style={styles.label}>Descripción</Text>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.description && styles.inputError]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="correo@ejemplo.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />
            {errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}

            {/* Campo: Fecha de Expiración */}
            <Text style={styles.label}>Fecha de Expiración</Text>
            <Controller
              control={control}
              name="dateExpiration"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.dateExpiration && styles.inputError]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="07-07-1988"
                />
              )}
            />
            {errors.dateExpiration && <Text style={styles.errorText}>{errors.dateExpiration.message}</Text>}
      
            {/* Botón de envío */}
            <TouchableOpacity 
              style={[styles.button, isSubmitting && styles.buttonDisabled]} 
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>
                {isSubmitting ? "Cargando..." : "Registrarse"}
              </Text>
            </TouchableOpacity>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: { padding: 20, flex: 1, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 5, color: '#333' },
  input: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 2,
    fontSize: 16 
  },
  inputError: { borderColor: '#ff4444' },
  errorText: { color: '#ff4444', fontSize: 12, marginBottom: 15 },
  button: { 
    backgroundColor: '#007AFF', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 10 
  },
  buttonDisabled: { backgroundColor: '#ccc' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
