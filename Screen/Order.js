import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
const { height, width } = Dimensions.get("window");
import { ScaledSheet } from "react-native-size-matters";
import { MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Camera } from "expo-camera";

export default function Order() {
  const [cameraRef, setCameraRef] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [count, setCount] = useState(1); // Initial count

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
        setModalVisible(false);
      } else {
        Alert.alert("Invalid QR Code", "Please scan a valid QR code.");
        setScanned(false); // Reset scanned state
      }
    }
  };

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
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
        <Text style={styles.HeadText}>My cart</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.Box}>
              <View style={styles.ImageBox}></View>
              <Text style={styles.BoxText}>Chocolate biscuit</Text>
              <View style={styles.CountBox}>
                <TouchableHighlight
                  onPress={increaseCount}
                  underlayColor="transparent"
                >
                  <Entypo name="plus" size={24} color="#6dd051" />
                </TouchableHighlight>
                <Text style={styles.CountNumberText}>{count}</Text>
                <TouchableHighlight
                  onPress={decreaseCount}
                  underlayColor="transparent"
                >
                  <Entypo name="minus" size={24} color="#6dd051" />
                </TouchableHighlight>
              </View>
            </View>
            <View style={styles.Box}></View>
            <View style={styles.Box}></View>
          </ScrollView>
        </View>
        <View style={{ flex: 0.3 }}>
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

          <TouchableHighlight
            underlayColor={"#928F8A"}
            style={styles.PayButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.PayButtonText}>Pay Now</Text>
          </TouchableHighlight>
        </View>
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
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  ImageBox: {
    borderRadius: 10,
    width: width / 5,
    height: height / 10.9,
    backgroundColor: "#515151",
  },

  BoxText: {
    fontSize: "20@mvs",
    fontFamily: "Inter_400Regular",
    color: "#515151",
  },

  CountBox: {
    height: "27@mvs0.1",
    width: "90@mvs0.3",
    borderRadius: 2,
    flexDirection: "row",
    shadowColor: "#1c3613",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  CountNumberText: {
    fontSize: "20@mvs",
    fontFamily: "Inter_400Regular",
    color: "#515151",
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

  PayButton: {
    marginTop: 20,
    backgroundColor: "#6dd051",
    alignSelf: "center",
    justifyContent: "center",
    width: width / 2,
    height: height / 20,
    borderRadius: 10,
    elevation: 2,
  },
  PayButtonText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: "20@mvs",
    color: "#fff",
    textAlign: "center",
    justifyContent: "center",
  },
});
