import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
} from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

export default function User() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View
        style={{
          width: width / 1,
          height: height / 10,
          //   backgroundColor: "red",
          justifyContent: "center",
        }}
      >
        <Text style={styles.HeadText}>User Profile</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: "blue" }}></View>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  HeadText: {
    paddingLeft: 10,
    fontSize: "25@mvs",
    fontFamily: "Inter_500Medium",
    color: "#515151",
    margin: 10,
  },
});
