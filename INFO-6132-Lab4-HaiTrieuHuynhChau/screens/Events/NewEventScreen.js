import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { db, auth } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function NewEventScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleCreate = async () => {
    if (!title || !date || !location || !description || !image) {
      return Alert.alert("Error", "All fields are required");
    }

    try {
      await addDoc(collection(db, "events"), {
        title,
        date,
        location,
        description,
        image,
        createdBy: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success", "Event created!");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Title</Text>
      <TextInput style={styles.input} onChangeText={setTitle} />

      <Text>Date (YYYY-MM-DD)</Text>
      <TextInput style={styles.input} onChangeText={setDate} />

      <Text>Location</Text>
      <TextInput style={styles.input} onChangeText={setLocation} />

      <Text>Description</Text>
      <TextInput style={styles.input} onChangeText={setDescription} />

      <Text>Image URL</Text>
      <TextInput style={styles.input} onChangeText={setImage} />

      <Button title="Create Event" onPress={handleCreate} />
    </View>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
  },
};
