import { useLayoutEffect, useState, useEffect } from "react";
import { View, Text, FlatList, Button, TouchableOpacity, Image, StyleSheet } from "react-native";
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

  useLayoutEffect(() => {
  navigation.setOptions({
    headerRight: () => (
      <Button title="Sign Out" onPress={() => signOut(auth)} />
    ),
    headerLeft: () => (
      <Button title="New Event" onPress={() => navigation.navigate("NewEvent")} />
    ),
    });
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
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("Favourite")}
      >
        <Text style={styles.fabText}>❤</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#ff3366",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",

    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  fabText: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginTop: -2, 
  },
});