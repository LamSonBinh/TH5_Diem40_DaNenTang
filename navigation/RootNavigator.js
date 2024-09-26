import React, { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
//import auth from "@react-native-firebase/auth";
import { AuthStack } from "./AuthStack";
import { AppStack } from "./AppStack";
import { AuthenticatedUserContext } from "../providers";
import { LoadingIndicator } from "../components";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
export const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuthStateChanged = 
    //auth().
    onAuthStateChanged(auth, (authenticatedUser) => {
      if (authenticatedUser) {
        setUser(authenticatedUser); // Gán người dùng đã xác thực
      } else {
        setUser(null); // Nếu không có người dùng, đặt lại user thành null
      }
      setIsLoading(false); // Đặt trạng thái loading thành false sau khi xử lý xong
    });
    
    // unsubscribe auth listener on unmount
    return unsubscribeAuthStateChanged;
  }, [user]);
  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
