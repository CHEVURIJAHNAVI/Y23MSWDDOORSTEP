import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ImagewithText = () => {
  return (
    <View style={styles.container}>
      <Image 
       source={require("./bg.png")} 
        style={styles.image} 
      />
      <Text style={styles.text}>This is a sample text below the image.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "black",
  },
});

export default ImagewithText;
