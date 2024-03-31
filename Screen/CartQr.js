import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StatusBar,
  Alert,
  Modal,
  TouchableHighlight,
  StyleSheet,
  ss,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const { height, width } = Dimensions.get("window");

export default function CartQr() {
  const [cameraRef, setCameraRef] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    if (!scanned) {
      setScanned(true);
      // Check if the scanned QR code matches the value for navigation
      if (data === "122") {
        navigation.navigate("Order"); // Navigate to the 'Order' page
        setModalVisible(false);
      } else {
        Alert.alert("Invalid QR Code", "Please scan a valid Cart QR code.");
        setScanned(false); // Reset scanned state
        setModalVisible(false);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <Text style={styles.HeadText}>Cart Unlock</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.LottieContainer}>
          <LottieView
            source={require("../assets/animation.json")} // Change 'animation.json' to your Lottie animation file
            autoPlay
            loop
            style={{ height: height - 300 }}
          />
        </View>
        <Text style={styles.Qrtext}>
          To unlock the cart, please scan the QR code.
        </Text>
        <TouchableHighlight
          onPress={() => {
            setModalVisible(true);
          }}
          underlayColor="#C2FFB0"
          style={styles.QRbtn}
        >
          <MaterialCommunityIcons
            name="qrcode-scan"
            size={44}
            color={"#6dd051"}
            style={styles.Qr}
          />
        </TouchableHighlight>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <BlurView
            experimentalBlurMethod="dimezisBlurView"
            intensity={20}
            tint="systemThinMaterialDark"
            style={styles.modalView}
          >
            <View style={styles.Cam}>
              <Camera
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
              />
            </View>
            {scanned && setScanned(false)}
            <TouchableHighlight
              underlayColor={"#928F8A"}
              style={styles.openButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
          </BlurView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  header: {
    width: width / 1,
    height: height / 10,
    justifyContent: "center",
  },
  HeadText: {
    paddingLeft: 10,
    fontSize: "25@mvs",
    fontFamily: "Inter_500Medium",
    color: "#515151",
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  LottieContainer: {
    width: width - 60,
    height: height - 400,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
  },

  Qrtext: {
    fontSize: "15@mvs",
    fontFamily: "Inter_400Regular",
    color: "#515151",
  },

  Cam: {
    width: "80%",
    height: "80%",
    borderRadius: 20,
    overflow: "hidden",
  },

  QRbtn: {
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderColor: "transparent",
    borderRadius: 10,
    fontSize: 42,
    marginTop: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    height: "60%",
    width: "80%",
    overflow: "hidden",
    borderRadius: 20,
    paddingTop: 35,
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#6dd051",
  },

  Qr: {
    alignSelf: "center",
  },

  openButton: {
    marginTop: 40,
    backgroundColor: "#6dd051",
    alignSelf: "center",
    justifyContent: "center",
    width: "20%",
    height: 30,
    borderRadius: 10,
    elevation: 2,
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
});
