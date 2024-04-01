import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

export default function LoginPage({}) {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Perform login validation here
    if (username === "Admin" && password === "123") {
      // If username and password are correct, navigate to the home screen
      navigation.navigate("Home");
    } else {
      // If username or password is incorrect, you can display an error message or take appropriate action
      alert("Invalid username or password");
    }
  };

  return (
    <SafeAreaView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.top}>
        <Image source={require("../assets/bk.png")} style={styles.image} />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.text}>Login Screen</Text>
        <View style={styles.Input}>
          <TextInput
            placeholder="Username"
            placeholderTextColor="#8F8F8F"
            style={styles.username}
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#8F8F8F"
            secureTextEntry
            style={styles.password}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.text1}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  top: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bottom: {
    alignItems: "center",
    flex: 1.6,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  text: {
    marginTop: 20,
    color: "#515151",
    fontSize: "29@msr",
    textAlign: "center",
    fontFamily: "Inter_600SemiBold",
    marginBottom: 60,
  },

  Input: {
    width: "100%",
  },

  username: {
    marginBottom: 30,
    fontSize: 20,
    color: "#515151",
    paddingLeft: 10,
    alignSelf: "center",
    width: "90%",
    height: 70,
    borderColor: "#515151",
    borderWidth: 0.5,
    borderRadius: 15,
  },
  password: {
    marginBottom: 60,
    fontSize: 20,
    color: "#515151",
    paddingLeft: 10,
    alignSelf: "center",
    width: "90%",
    height: 70,
    borderColor: "#515151",
    borderWidth: 0.5,
    borderRadius: 15,
  },

  btnView: {
    width: "100%",
  },

  btn: {
    backgroundColor: "#6dd051",
    width: "90%",
    height: 60,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  text1: {
    fontSize: 25,
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "Inter_600SemiBold",
  },
});
