import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { FontAwesome5 } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";

export default function User() {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Perform logout actions here, such as clearing user data from AsyncStorage or logging out from your authentication provider

    // Navigate back to the Login screen
    navigation.navigate("Login");
  };
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

      {/* User data */}
      <View style={{ flex: 1 }}>
        <View style={styles.TextBox}>
          <View style={styles.Circle}>
            <FontAwesome5 name="user" size={50} color="#515151" />
          </View>
          <Text style={styles.NameHeadText}>Fulll Name</Text>
          <Text style={styles.NameText}>Dunidu Dasun kalubowila</Text>
        </View>

        <View style={styles.TextBox}>
          <Text style={styles.NameHeadText}>Email</Text>
          <Text style={styles.NameText}>Dunidudasunkalubowila@gmail.com</Text>
        </View>

        <View style={styles.TextBox}>
          <Text style={styles.NameHeadText}>Address</Text>
          <Text style={styles.NameText}>91/3, Samupakara Mw, Piliyandala</Text>
        </View>

        <View style={styles.TextBox}>
          <Text style={styles.NameHeadText}>Mobile</Text>
          <Text style={styles.NameText}>0722724052</Text>
        </View>

        <View style={styles.TextBox}>
          <Text style={styles.NameHeadText}>Gender</Text>
          <Text style={styles.NameText}>Male</Text>
        </View>

        <View style={styles.SubmitbtnView}>
          <TouchableOpacity style={styles.Submitbtn} onPress={handleLogout}>
            <Text style={styles.SubmitText}>Log out</Text>
          </TouchableOpacity>
        </View>
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

  Circle: {
    borderRadius: 80,
    width: width / 4,
    height: width / 4,
    backgroundColor: "#F1F1F1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },

  TextBox: {
    marginTop: 30,
    marginLeft: 20,
  },

  NameHeadText: {
    paddingLeft: 10,
    fontSize: "15@mvs",
    fontFamily: "Inter_400Regular",
    color: "#858585",
  },

  NameText: {
    paddingLeft: 10,
    fontSize: "20@mvs",
    fontFamily: "Inter_400Regular",
    color: "#515151",
  },
  SubmitbtnView: {
    flex: 1,
    alignSelf: "center",
    width: "80%",

    justifyContent: "center",
  },

  Submitbtn: {
    backgroundColor: "#6dd051",
    alignSelf: "center",
    justifyContent: "center",
    width: "60%",
    height: 50,
    borderColor: "transparent",
    borderRadius: 10,
    fontSize: 42,
    marginTop: 20,
    marginBottom: 20,
  },

  SubmitText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
