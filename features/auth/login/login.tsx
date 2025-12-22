
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from "react-hook-form";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as z from 'zod';
const loginSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});
// Extraer el tipo del esquema
type RegisterFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
   const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data: RegisterFormData) => {
    // Simulación de llamada a API (Spring Boot u otro)
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Datos validados:", data);
    Alert.alert("Éxito", "Usuario registrado correctamente");
  };

  return (
    <View style={styles.container}>
      {/* Campo: Email */}
      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="correo@ejemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      {/* Campo: Password */}
      <Text style={styles.label}>Contraseña</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="******"
            secureTextEntry
          />
        )}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      {/* Botón de envío */}
      <TouchableOpacity 
        style={[styles.button, isSubmitting && styles.buttonDisabled]} 
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? "Cargando..." : "Entrar"}
        </Text>
      </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  form:{
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  container: { padding: 20, flex: 1, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 5, color: '#333' },
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
