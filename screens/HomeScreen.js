import React from "react";
import { View, StyleSheet, Button } from "react-native";
import {auth} from '../firebaseConfig'
import { signOut } from "firebase/auth";
export const HomeScreen = ({navigation}) => {
  const handleLogout = () => {
    // auth()
    //   .
      signOut(auth)
      .then(
        () => navigation.natigate('Login')
      )
      .catch((error) => console.log("Error logging out: ", error));
  };
  return (
    <View style={styles.container}>
      <View style={styles.btn}>

      <Button title="Sign Out" onPress={handleLogout} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    backgroundColor:'white',
    justifyContent:'center'
  },
btn:{
  width:'50%'
}
});
