import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export default function getHeaderTitle(route: any) {
  // Si no hay ruta enfocada, asume la pantalla inicial (ej. 'Home')
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
console.log("Route Name:", routeName);
  switch (routeName) {
    case 'home':
      return 'Lista de Tareas';
    case 'details':
      return 'Crear Tarea';
    case 'perfil':
      return 'Perfil';
    default:
      return 'Lista de Tareas';
  }
}
