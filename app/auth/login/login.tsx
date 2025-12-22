
import { SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from 'react-native';
interface IFormInput {
  email: string
  password: string
}

export default function LoginScreen() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmitData: SubmitHandler<IFormInput> = (data) => {
    alert(JSON.stringify(data))
  }
  return (
    <View style={styles.container}>
      <form onSubmit={handleSubmit( onSubmitData )} style={styles.form}>
            <input {...register("email")} placeholder="Correo" />
            <input {...register("password")} placeholder="Contraseña" />
            <input type="submit" />
        </form>
    </View>
    
  );
}

const styles = StyleSheet.create({
  form:{
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#fff'
  },
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
});
