import LoadingScreen from '@/features/auth/LoadingScreen';
import { useAppSelector } from '@/store/hook/action';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
    useEffect(() => {
        async function prepare() {
          // Cargar recursos, tokens de seguridad, etc.
          await new Promise(resolve => setTimeout(resolve, 10000));
          return <LoadingScreen />;
        }
        prepare();
      }, []);
    const userData = useAppSelector((state: any) => state.auth.token);
    console.log()
    // Si hay sesión, mandarlo al Home, si no, al Login
    if (!userData) {
        return <Redirect href="/(auth)/login" />;
    }

    return <Redirect href="/(tabs)/" />;
}