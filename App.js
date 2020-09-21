import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [movieName, setMovieName] = useState();
  const [movieID, setMovieID] = useState();
  const [movieData, setMovieData] = useState([
    { id: [], photos: [], titles: [], searchedMovie: [] },
  ]);

  const movieSearchHandler = (name) => {
    return fetch("http://192.168.0.11:5000/" + name)
      .then((data) => data.json())
      .then((json) => {
        setMovieData([
          {
            id: json.searchResult[0].ids,
            photos: json.searchResult[0].photos,
            searchedMovie: json.searchedMovie,
          },
        ]);
      })
      .catch((err) => console.log(err));
  };

  const movieIDHandler = (setid) => {
    setMovieID(movieData[0].id[setid]);
    fetch("https://www.imdb.com/title/" + movieID).then(data=> data.json()).then(json=>{
      //TODO grab infos from python API and store it in elements
    })
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setMovieName(text)}
      />
      <Button title="Search" onPress={() => movieSearchHandler(movieName)} />

      <View style={{ flex: 1, alignItems: "center" }}>
        <FlatList
          data={movieData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <View>
                <Text>{item.id}</Text>
                <FlatList
                  horizontal
                  data={item.photos}
                  keyExtractor={(item) => item.photo.toString()}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => movieIDHandler(index)}>
                      <Image
                        source={{ uri: item.photo }}
                        style={{
                          width: 80,
                          height: 80,
                          padding: 10,
                          margin: 10,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                />
              </View>
            );
          }}
        />
        <StatusBar style="auto" />
      </View>

      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    width: "80%",
  },
});
