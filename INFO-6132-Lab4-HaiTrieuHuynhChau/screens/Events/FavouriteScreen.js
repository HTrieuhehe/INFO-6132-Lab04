import { useState } from "react";
import { View, Text, Button, FlatList, TouchableOpacity, Image, Alert } from "react-native";

export default function FavouriteScreen({ route }) {
  const [favourites, setFavourites] = useState([]);

  // Khi EventDetail gửi event sang
  const newFav = route.params?.event;

  if (newFav && !favourites.some((e) => e.id === newFav.id)) {
    setFavourites([...favourites, newFav]);
  }

  const removeItem = (id) => {
    setFavourites(favourites.filter((item) => item.id !== id));
  };

  const clearAll = () => {
    Alert.alert("Confirm", "Clear all favourites?", [
      { text: "Cancel" },
      {
        text: "Clear",
        onPress: () => setFavourites([])
      }
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button title="Clear All" color="red" onPress={clearAll} />

      <FlatList
        data={favourites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Image 
              source={{ uri: item.image }}
              style={{ width: 80, height: 80, borderRadius: 10, marginRight: 10 }}
            />

            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
              <Text>{item.date}</Text>

              <Button title="Remove" onPress={() => removeItem(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}
