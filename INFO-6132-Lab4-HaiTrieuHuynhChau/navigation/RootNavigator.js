import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useEffect, useState } from "react";

export default function RootNavigator(){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return unsub;
    }, []);
    
    if(loading) return null;

    return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}