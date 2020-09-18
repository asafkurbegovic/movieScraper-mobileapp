import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  ListView,
  SectionList,
  Image,
} from "react-native";
//import ButtonHandler from "./components/ButtonHandler";

export default function App() {
  const [movieName, setMovieName] = useState();
  const [movieInfor, setMovieInfo] = useState([{id:'000',
    photos:'src1'},
    {id:'001',
    photos:'src2'},
    {id:'002',
    photos:'src3'}]);
  const [movieData, setMovieData] = useState([{id:[],
  photos:[],
  titles:[],
  searchedMovie:[]}]);

  const movieSearchHandler = (name) => {
    return fetch("http://192.168.0.11:5000/" + name)
      .then((data) => data.json())
      .then((json) => {
        //console.log('-------------------1')
        //console.log(json.searchResult[0].ids);
        //console.log('-------------------2')
        setMovieData([{id:json.searchResult[0].ids,
        photos:json.searchResult[0].photos,
       // titles:json.searchResult[0].titles,
        searchedMovie:json.searchedMovie}]);
        //console.log('-------------------3')
      })
      .catch((err) => console.log(err));
  };

  // const searchResult=(movieData) => {
  // setMovieInfo(movieData);
  // }

 // const [movieIds, setMoviIds] = useState([])
  //setMoviIds(movieData.id)
  


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setMovieName(text)}
      />
      <Button
        title="Search"
        onPress={() => movieSearchHandler(movieName)}
        //   searchData={props.onSearchResult(movieData)}
      />

      <View style={{ flex: 1, alignItems: "center" }}>
        {console.log(movieData.titles)}
        <FlatList 
          data={movieData}
          renderItem={({item}) => {
            
            return (<View>
            <Text>{item.id}</Text>
            
            
            <FlatList 
            data={item.photos}
            renderItem={({item})=><Image source={{uri:item.photo}} style={{width:80, height:80, padding:10, marginVertical:10}}/>}
            />
            
            </View>
            );
          }}
          
        />
        <StatusBar style="auto" />
      </View>
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
/*<ButtonHandler
        movieName={movieName}
        onSearchResult={searchResult}
        
      />*/
