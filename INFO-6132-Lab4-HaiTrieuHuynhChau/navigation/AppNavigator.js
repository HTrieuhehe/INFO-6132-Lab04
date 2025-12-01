import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventListScreen from "../screens/Events/EventListScreen";
import EventDetailScreen from "../screens/Events/EventDetailScreen";
import NewEventScreen from "../screens/Events/NewEventScreen";
import FavouriteScreen from "../screens/Events/FavouriteScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="EventList" 
        component={EventListScreen}
        options={{ title: "Events" }}
      />

      <Stack.Screen 
        name="EventDetail" 
        component={EventDetailScreen}
        options={{ title: "Event Detail" }}
      />

      <Stack.Screen 
        name="NewEvent" 
        component={NewEventScreen}
        options={{ title: "Create Event" }}
      />

      <Stack.Screen 
        name="Favourite" 
        component={FavouriteScreen}
        options={{ title: "Favourite Events" }}
      />
    </Stack.Navigator>
  );
}
