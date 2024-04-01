import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { ref, onValue } from "firebase/database";
import { db } from "../config";

const { height, width } = Dimensions.get("window");

const OrderHistoryView = ({ route }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const { orderId } = route.params;

  // Fetch order items data from Firebase when the component mounts
  useEffect(() => {
    const orderRef = ref(db, `Order`);
    onValue(orderRef, (snapshot) => {
      const firebaseData = snapshot.val();
      if (firebaseData) {
        // Filter the order items array based on the orderId
        const filteredOrderItems = Object.values(firebaseData)
          .filter((item) => item.orderId === orderId)
          .flatMap((order) => order.items); // Flattening array of arrays
        setOrderItems(filteredOrderItems);

        // Calculate total price and total quantity
        const totalP = filteredOrderItems.reduce(
          (acc, curr) => acc + curr.Price * curr.count,
          0
        );
        setTotalPrice(totalP);

        const totalQ = filteredOrderItems.reduce(
          (acc, curr) => acc + curr.count,
          0
        );
        setTotalQuantity(totalQ);
      }
    });
  }, [orderId]);

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
          {orderItems.map((item, index) => (
            <View key={index} style={styles.Box}>
              <View style={styles.ImageBox}>
                <Image
                  style={[styles.image, StyleSheet.absoluteFillObject]}
                  source={{ uri: item.Image }}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.BoxNameText}>{item.Name}</Text>

                <Text style={styles.BoxPriceText}>M.R.P: Rs.{item.Price}</Text>
                <Text style={styles.BoxQuantityText}>
                  Quantity: {item.count}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          flex: 0.2,
          justifyContent: "center",
          borderColor: "#6dd051",
          borderTopWidth: 1,
        }}
      >
        <Text style={styles.TotalText}>Order Id: {orderId}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.TotalText1}>Total Quantity:</Text>
          <Text style={styles.TotalText1}>{totalQuantity}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.TotalText2}>Total Price:</Text>
          <Text style={styles.TotalText2}>Rs.{totalPrice}</Text>
        </View>
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
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },

  BoxNameText: {
    paddingLeft: 20,
    fontSize: "20@mvs",
    fontFamily: "Inter_400Regular",
    color: "#515151",
  },

  BoxPriceText: {
    paddingLeft: 20,
    fontSize: "13@mvs",
    fontFamily: "Inter_400Regular",
    color: "#858585",
  },

  BoxQuantityText: {
    paddingTop: 3,
    paddingLeft: 20,
    fontSize: "17@mvs",
    fontFamily: "Inter_400Regular",
    color: "#858585",
  },

  TotalText: {
    paddingTop: 10,
    paddingTop: 3,
    paddingLeft: 20,
    fontSize: "12@mvs",
    fontFamily: "Inter_400Regular",
    color: "#858585",
  },

  TotalText1: {
    paddingTop: 10,
    paddingTop: 3,
    paddingHorizontal: 20,
    fontSize: "20@mvs",
    fontFamily: "Inter_400Regular",
    color: "#858585",
  },

  TotalText2: {
    paddingTop: 10,
    paddingTop: 3,
    paddingHorizontal: 20,
    fontSize: "25@mvs",
    fontFamily: "Inter_400Regular",
    color: "#858585",
  },
});

export default OrderHistoryView;
