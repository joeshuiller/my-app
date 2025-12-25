import getHeaderTitle from '@/components/title';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { store } from '@/store/store';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider } from 'react-redux';


export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack initialRouteName='index'>
            <Stack.Screen 
              name="index" 
              options={{ 
                headerShown: false 
              }}

              />
              <Stack.Screen 
              name="(auth)/login" 
              options={{ 
                headerShown: false 
              }}

              />
              <Stack.Screen 
              name="(auth)/register" 
              options={{ 
               title: 'Registro'
              }}

              />
              <Stack.Screen 
                name="(home)"
                options={({ route }) => ({
                  headerTitle: getHeaderTitle(route),
                })} />
            </Stack>
            <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
