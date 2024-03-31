import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class OrderHistoryView extends Component {
  render() {
    const { route } = this.props;
    const { orderId } = route.params;

    return (
      <View style={styles.container}>
        <Text style={styles.orderId}>Order ID: {orderId}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  orderId: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
