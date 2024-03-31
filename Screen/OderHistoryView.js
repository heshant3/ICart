import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  ScrollView,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { ref, onValue } from "firebase/database";
import { db } from "../config";

const { height, width } = Dimensions.get("window");

const OrderHistoryView = ({ route }) => {
  const [OrderHistoryData, setOrderHistoryData] = useState([]);
  const { orderId } = route.params;

  // Example state usage
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  // Fetch penalty data from Firebase when the component mounts
  useEffect(() => {
    const OrderHistoryRef = ref(db, "Order");
    onValue(OrderHistoryRef, (snapshot) => {
      const firebaseData = snapshot.val();
      if (firebaseData) {
        const OrderHistoryArray = Object.values(firebaseData);
        setOrderHistoryData(OrderHistoryArray);
      }
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View
        style={{
          width: width / 1,
          height: height / 10,
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
          {/* Price list box */}
          <View style={styles.Box}>
            <View style={styles.ImageBox}></View>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.BoxNameText}>Name</Text>
              <Text style={styles.BoxQuantityText}>Quantity: {quantity}</Text>
              <Text style={styles.BoxQuantityText}>Price Mrs: {price}</Text>
            </View>
          </View>
          <View style={styles.Box}></View>
          <View style={styles.Box}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

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

export default OrderHistoryView;
