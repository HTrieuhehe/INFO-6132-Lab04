import { View, Text, Image, Button, Alert } from "react-native";
import { db } from "../../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { useFavourites } from "../../context/FavouriteContext";


export default function EventDetailScreen({ route, navigation }) {
  const { event } = route.params;
  const { favourites, addFavourite } = useFavourites();
  const isFavourite = favourites.some((e) => e.id === event.id); //check event is added or not

  const handleDelete = () => {
    Alert.alert("Confirm", "Remove this event?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "events", event.id));
            Alert.alert("Deleted!");
            navigation.goBack();
          } catch (err) {
            Alert.alert("Error", err.message);
          }
        }
      }
    ]);
  };

  return (
    <View style={{ padding: 20 }}>
      <Image 
        source={{ uri: event.image }}
        style={{ width: "100%", height: 200, borderRadius: 10, marginBottom: 20 }}
      />

      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{event.title}</Text>
      <Text style={{ marginTop: 5 }}>{event.date}</Text>
      <Text>{event.location}</Text>
      <Text style={{ marginTop: 10 }}>{event.description}</Text>

      <View style={{ marginTop: 20 }}>
        {
            isFavourite ? (
                <Button title="Added ✓" disabled={true} />
            ) : (
                <Button
                title="Add to Favourite"
                onPress={() => {
                    addFavourite(event);
                    Alert.alert("Added", "Event added to favourites!");
                }}
                />
            )
        }

        <Button 
          title="Delete Event"
          color="red"
          onPress={handleDelete}
        />
      </View>
    </View>
  );
}
