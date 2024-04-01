import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import { ref, onValue } from "firebase/database";
import { db } from "../config";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

export default function History() {
  const [OrderHistoryData, setOrderHistoryData] = useState([]);
  const navigation = useNavigation();

  // Fetch penalty data from Firebase when the component mounts
  useEffect(() => {
    const OrderHistoryRef = ref(db, "Order");
    onValue(OrderHistoryRef, (snapshot) => {
      const firebaseData = snapshot.val();
      if (firebaseData) {
        // Convert the object values into an array
        const OrderHistoryArray = Object.values(firebaseData);

        // Sort the OrderHistoryArray based on the timestamp property in descending order
        OrderHistoryArray.sort((a, b) => b.timestamp - a.timestamp);

        // Reverse the sorted array to ensure the newest data appears at the top
        OrderHistoryArray.reverse();

        // Set the sorted and reversed array to the state
        setOrderHistoryData(OrderHistoryArray);
      }
    });
  }, []);

  const navigateToOrderDetails = (orderId) => {
    navigation.navigate("OrderHistory", { orderId });
  };

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
          {/* price list box*/}
          {OrderHistoryData.map((order, index) => (
            <TouchableOpacity
              style={styles.Box}
              key={index}
              onPress={() => navigateToOrderDetails(order.orderId)}
            >
              <View style={styles.ImageBox}>
                <FontAwesome6 name="opencart" size={50} color="#515151" />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.BoxNameText}>Order Details</Text>
                <Text style={styles.BoxQuantityText}>
                  Order Id: {order.orderId}
                </Text>
                <Text style={styles.BoxQuantityText}>Date: {order.Date}</Text>
              </View>
            </TouchableOpacity>
          ))}
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
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
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
