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
import ResultHandler from './components/ResultHandler'

export default function App() {
  const [movieName, setMovieName] = useState();
  const [movieID, setMovieID] = useState();
  const [movieData, setMovieData] = useState([
    { id: [], photos: [], titles: [], searchedMovie: [] },
  ]);
  const [results, setResults] = useState({
    rating: "",
    title: "",
    image: './assets/imdb.jpg',
  });

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
    console.log(movieID);
    return fetch("http://192.168.0.11:5000/id/" + movieID)
      .then((res) => res.json())
      .then((json) => {console.log(json.result.photo)
      setResults({
        rating:json.result.movieRating,
        title:json.result.movieTitle,
        image:json.result.photo
      })
      })
      .catch((err) => console.log("Error:" + err));
  };

  

  return (
    <View style={styles.container}>
      <Text style={{fontSize:16}}>Enter name of movie you are interested in</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setMovieName(text)}
      />
      <Button title="Search" onPress={() => movieSearchHandler(movieName)} />

      <View style={{marginVertical:10, flex: 1, alignItems: "center" }}>
        <FlatList
          data={movieData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <View>
                
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
          <ResultHandler style={styles.result} title={results.title} rating={results.rating} image={results.image} />
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
    marginTop: 100,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    width: "80%",
    marginVertical:10
  },
  result:{
    alignItems:'center',
    justifyContent:'center',
    flex:2
  }
});
