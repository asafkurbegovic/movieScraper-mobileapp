import React, { useState } from "react";
import { Button, View, Text } from "react-native";

const ButtonHandler = (props) => {
  const [movieData, setMovieData] = useState();

  const movieSearchHandler = (name) => {
    return fetch("http://192.168.0.11:5000/" + name)
      .then((data) => data.json())
      .then((json) => {
         // console.log(json.searchResult)
        setMovieData(json.searchResult)
        })
      .catch((err) => console.log(err));
  };

  return (
    <View>
        <Text>{props.name}</Text>
      <Button
        title="Search"
        onPress={() => movieSearchHandler(props.movieName)}
     //   searchData={props.onSearchResult(movieData)}
      /><View>
          <Text>{movieData}</Text>
      </View>
    </View>
  );
};

export default ButtonHandler;
