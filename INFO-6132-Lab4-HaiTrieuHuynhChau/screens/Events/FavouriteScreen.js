import { View, Text, Button, FlatList, Image, TouchableOpacity, Alert } from "react-native";
import { useFavourites } from "../../context/FavouriteContext";

export default function FavouriteScreen({ navigation }) {
  const { favourites, removeFavourite, clearAll } = useFavourites();

  const handleClearAll = () => {
    Alert.alert("Confirm", "Clear all favourites?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: () => clearAll(),
      },
    ]);
  };

  const handleRemove = (id) => {
    Alert.alert("Remove Favourite", "Do you want to remove this event?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        onPress: () => removeFavourite(id),
      },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Clear All" color="red" onPress={handleClearAll} />

      {favourites.length === 0 && (
        <Text style={{ marginTop: 20 }}>No favourite events yet.</Text>
      )}

      <FlatList
        data={favourites}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ flexDirection: "row", marginBottom: 20 }}
            onPress={() => navigation.navigate("EventDetail", { event: item })}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 80, height: 80, borderRadius: 10, marginRight: 12 }}
            />

            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.title}</Text>
              <Text>{item.date}</Text>
              <Text>{item.location}</Text>

              <View style={{ marginTop: 5 }}>
                <Button
                  title="Remove"
                  color="red"
                  onPress={() => handleRemove(item.id)}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
