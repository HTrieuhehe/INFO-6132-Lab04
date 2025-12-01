import { useLayoutEffect, useState, useEffect } from "react";
import { View, Text, FlatList, Button, TouchableOpacity, Image } from "react-native";
import { auth, db } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";

export default function EventListScreen({ navigation }) {
  const [events, setEvents] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Sign Out" onPress={() => signOut(auth)} />
    });
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "events"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEvents(data);
    });
    return unsub;
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("EventDetail", { event: item })}
            style={{ flexDirection: "row", marginBottom: 12 }}
          >
            <Image 
              source={{ uri: item.image }}
              style={{ width: 80, height: 80, borderRadius: 10, marginRight: 10 }}
            />
            <View>
              <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
              <Text>{item.date}</Text>
              <Text>{item.location}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
