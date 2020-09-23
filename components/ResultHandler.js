import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ResultHandler = (props) => {
  return (
    <View style={styles.view}>
        <Text style={styles.text} >RESULT:</Text>
      <View>
        <Image style={styles.photo} source={{ uri: props.image }} />
      </View>
      <View>
        <Text style={styles.text}>Title: {props.title}</Text>
        <Text>Rating: {props.rating}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    justifyContent:'center',
    flex: 2,
    // flexDirection: "reverse",
  },
  photo: {
    width: 180,
    height: 200,
  },
  text: {
    fontSize: 24,
    textAlign:'center'
  },
});

export default ResultHandler;
