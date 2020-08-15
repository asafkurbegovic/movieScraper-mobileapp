import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

const [movieData, setMovieData] = useState()

const movieSearchHandler = (name) => {
   return (fetch("http://192.168.0.11:5000/"+name)
   .then((data) => data.json())
.then((json) => console.log(json)).catch(err=>console.log(err)))
};

export default function App() {
  const [movieName, setMovieName] = useState();
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setMovieName(text)}
      />
      <Text>{movieName}</Text>
      <Button title="Search" onPress={()=>movieSearchHandler(movieName)} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    width: "80%",
  },
});
