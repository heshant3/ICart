import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
const { height, width } = Dimensions.get("window");

export default function History() {
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
        <Text style={styles.HeadText}>Order History</Text>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* price list  box*/}
          <View style={styles.Box}>
            <View style={styles.ImageBox}></View>
            <View style={{ flexDirection: "colum" }}>
              <Text style={styles.BoxNameText}>Chocolate biscuit</Text>
              <Text style={styles.BoxQuantityText}>Quantity: 10</Text>
              <Text style={styles.BoxQuantityText}>Price Mrs: 100</Text>
            </View>
          </View>
          <View style={styles.Box}></View>
          <View style={styles.Box}></View>
        </ScrollView>
      </View>
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

  scroll: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  Box: {
    width: width,
    height: height / 7,
    overflow: "hidden",
    // backgroundColor: "#fff",
    borderColor: "#C9C9C9",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 20,
  },

  ImageBox: {
    borderRadius: 10,
    width: width / 5,
    height: height / 10.9,
    backgroundColor: "#515151",
  },

  BoxNameText: {
    paddingLeft: 20,
    fontSize: "20@mvs",
    fontFamily: "Inter_400Regular",
    color: "#515151",
  },
  BoxQuantityText: {
    paddingLeft: 20,
    fontSize: "15@mvs",
    fontFamily: "Inter_400Regular",
    color: "#858585",
  },
});
