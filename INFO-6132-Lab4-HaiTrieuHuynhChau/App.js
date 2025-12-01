import { StyleSheet, Text, View } from 'react-native';
import RootNavigator from "./navigation/RootNavigator";
import { FavouriteProvider } from "./context/FavouriteContext";

export default function App() {
  return (
    <FavouriteProvider>
      <RootNavigator />
    </FavouriteProvider>
  );
}


